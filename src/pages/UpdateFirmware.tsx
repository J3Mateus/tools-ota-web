// src/pages/EditorPage.tsx
import React, { useEffect, useState } from 'react';
import Monaco from '@monaco-editor/react';
import { Input, Layout, Button, Form, message } from 'antd';
import { useParams } from 'react-router-dom';
import { getFirmwareByID, updateFirmware } from '../core/service/firmware';
import { Firmware } from '../core/models';

const { Content } = Layout;

const CodeUpdate: React.FC = () => {
  const { firmware_id } = useParams();
  const [code, setCode] = useState<string>('');
  const [name, setName] = useState<string>(''); // Adicionando estado para o nome
  const [version, setVersion] = useState<string>(''); // Adicionando estado para a versão
  const [firmware, setFirmware] = useState<Firmware | null>(null); // Usando `null` como valor inicial

  useEffect(() => {
    (async () => {
      if (firmware_id) {
        const data = await getFirmwareByID(firmware_id);
        setFirmware(data); // Atualiza o firmware com os dados da API
        setCode(data.code);
        setName(data.name);
        setVersion(data.version);
      }
    })();
  }, [firmware_id]);

  // Função para lidar com a mudança no código do Monaco
  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  // Função para submeter o formulário
  const handleSubmit = async (values: { name: string, version: string }) => {
    const data : Firmware = {
      uuid:firmware_id!,
      code: code,
      name: values.name,
      version: values.version, // Adicionando versão ao envio
    };

    const updatedFirmware = await updateFirmware(data);
    console.log(updatedFirmware);
    try {
      message.success('Firmware enviado com sucesso!');
    } catch (error) {
      message.error('Erro ao enviar firmware!');
    }
  };

  // Função de validação para a versão
  const validateVersion = (_: any, value: string) => {
    const versionPattern = /^\d+\.\d+\.\d+$/;
    if (!versionPattern.test(value)) {
      return Promise.reject(new Error('A versão deve estar no formato 0.0.0'));
    }
    return Promise.resolve();
  };

  // Renderizando o formulário apenas quando os dados forem carregados
  if (!firmware) {
    return <div>Carregando firmware...</div>; // Mensagem de carregamento até que o firmware seja carregado
  }

  return (
    <Layout>
      <Content style={{ padding: '24px', height: '100vh' }}>
        <Form
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={{ name, version, code }} // Preenchendo com os estados separados
        >
          <Form.Item
            label="Nome"
            name="name"
            rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
          >
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome"
            />
          </Form.Item>

          <Form.Item
            label="Versão"
            name="version"
            rules={[
              { required: true, message: 'Por favor, insira a versão!' },
              { validator: validateVersion },
            ]}
          >
            <Input
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="Digite a versão (0.0.0)"
            />
          </Form.Item>

          <Form.Item
            label="Código"
            name="code"
            rules={[
              { required: true, message: 'O código não pode estar vazio!' },
              {
                validator: (_, value) =>
                  value && value.trim().length > 0
                    ? Promise.resolve()
                    : Promise.reject(new Error('O código não pode estar vazio!')),
              },
            ]}
          >
            <Monaco
              value={code}
              onChange={handleCodeChange}
              height="400px"
              defaultLanguage="cpp"
              theme="vs-dark"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default CodeUpdate;
