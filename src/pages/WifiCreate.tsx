import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { Rule } from 'antd/lib/form';
import { createWifi } from '../core/service/wifi';


const WifiForm: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: { SSDI: string; password: string }) => {
    console.log('Form Submitted:', values);
    await createWifi(values)
    message.success('Rede Wi-Fi criada com sucesso!');

  };

  const ssidRules: Rule[] = [{ required: true, message: 'Por favor, insira o SSID da rede!' }];
  const passwordRules: Rule[] = [
    { required: true, message: 'Por favor, insira a senha!' },
    { min: 8, message: 'A senha deve ter pelo menos 8 caracteres.' },
  ];

  return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <h2>Configuração de Rede Wi-Fi</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="SSID da Rede"
          name="SSDI"
          rules={ssidRules}
        >
          <Input placeholder="Digite o nome da rede" />
        </Form.Item>

        <Form.Item
          label="Senha da Rede"
          name="password"
          rules={passwordRules}
        >
          <Input placeholder="Digite a senha da rede" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Criar Rede Wi-Fi
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default WifiForm;
