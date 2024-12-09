// src/pages/EditorPage.tsx
import React, { useState } from 'react';
import Monaco from '@monaco-editor/react';
import { Input, Layout, Button, Form, message } from 'antd';
import { useParams } from 'react-router-dom';
import { addFirmware } from '../core/service/firmware';
import { addFirmwareToGroup } from '../core/service/group';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const EditorPage: React.FC = () => {
  const { group_id } = useParams();

  const [code, setCode] = useState<string>('');
  const [name, setName] = useState<string>(''); // Adicionando estado para o nome
  const [version, setVersion] = useState<string>(''); // Adicionando estado para a versão
  const navigate = useNavigate();

  const handleEditorDidMount = (_:any, monaco:any) => {
    // Registrando o provider de sugestões para C/C++ (utilizado para Arduino)
    monaco.languages.registerCompletionItemProvider('cpp', {
      provideCompletionItems: (model: { getWordUntilPosition: (arg0: any) => any; }, position: any) => {
        const wordUntilPosition = model.getWordUntilPosition(position);
        const suggestions = [
          // Funções Básicas do Arduino
          {
            label: 'digitalWrite',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'digitalWrite($1, $2);',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Escreve um valor em um pino digital (HIGH ou LOW)',
          },
          {
            label: 'digitalRead',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'digitalRead($1);',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Lê o valor de um pino digital (HIGH ou LOW)',
          },
          {
            label: 'pinMode',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'pinMode($1, $2);',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Configura um pino como entrada (INPUT) ou saída (OUTPUT)',
          },
          {
            label: 'delay',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'delay($1);',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Atraso em milissegundos (ex: delay(1000) para 1 segundo)',
          },
          {
            label: 'millis',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'millis();',
            documentation: 'Retorna o número de milissegundos desde que o Arduino foi iniciado',
          },
          {
            label: 'analogWrite',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'analogWrite($1, $2);',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Escreve um valor PWM (0-255) em um pino com suporte a PWM',
          },
          {
            label: 'analogRead',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'analogRead($1);',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Lê um valor analógico (0-1023) de um pino analógico',
          },
          {
            label: 'Serial.begin',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'Serial.begin($1);',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Inicia a comunicação serial',
          },
          {
            label: 'Serial.print',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'Serial.print($1);',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Imprime dados na porta serial',
          },
          {
            label: 'Serial.println',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'Serial.println($1);',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Imprime dados na porta serial com nova linha no final',
          },

          // Constantes do Arduino
          {
            label: 'HIGH',
            kind: monaco.languages.CompletionItemKind.Constant,
            insertText: 'HIGH',
            documentation: 'Valor lógico alto (3.3V ou 5V dependendo da placa)',
          },
          {
            label: 'LOW',
            kind: monaco.languages.CompletionItemKind.Constant,
            insertText: 'LOW',
            documentation: 'Valor lógico baixo (0V)',
          },
          {
            label: 'INPUT',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'INPUT',
            documentation: 'Configura o pino como entrada (modo de leitura)',
          },
          {
            label: 'OUTPUT',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'OUTPUT',
            documentation: 'Configura o pino como saída (modo de escrita)',
          },

          // Bibliotecas Comuns (Wire, Servo, LiquidCrystal)
          // Wire (I2C)
          {
            label: 'Wire.begin',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'Wire.begin();',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Inicia a comunicação I2C',
          },
          {
            label: 'Wire.write',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'Wire.write($1);',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Envia dados pela linha I2C',
          },
          {
            label: 'Wire.requestFrom',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'Wire.requestFrom($1, $2);',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Solicita dados do dispositivo I2C',
          },
          {
            label: 'Wire.read',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'Wire.read();',
            documentation: 'Lê dados recebidos pela linha I2C',
          },

          // Servo Library
          {
            label: 'Servo.attach',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'servo.attach($1);',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Anexa um servo a um pino digital',
          },
          {
            label: 'Servo.write',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'servo.write($1);',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define a posição do servo (0-180)',
          },
          {
            label: 'Servo.detach',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'servo.detach();',
            documentation: 'Desanexa o servo do pino',
          },

          // LiquidCrystal Library (LCD)
          {
            label: 'LiquidCrystal.begin',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'lcd.begin($1, $2);',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Inicializa o LCD',
          },
          {
            label: 'LiquidCrystal.print',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'lcd.print($1);',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Imprime texto no LCD',
          },
          {
            label: 'LiquidCrystal.clear',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'lcd.clear();',
            documentation: 'Limpa a tela do LCD',
          },
          {
            label: 'LiquidCrystal.setCursor',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'lcd.setCursor($1, $2);',
            documentation: 'Define a posição do cursor no LCD',
          },

          // Tipos de Dados do Arduino
          {
            label: 'int',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'int $1;',
            documentation: 'Tipo de dado inteiro (ex: int x = 10;)',
          },
          {
            label: 'float',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'float $1;',
            documentation: 'Tipo de dado de ponto flutuante (ex: float pi = 3.14;)',
          },
          {
            label: 'char',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'char $1;',
            documentation: 'Tipo de dado de caractere (ex: char c = \'a\';)',
          },
          {
            label: 'bool',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'bool $1;',
            documentation: 'Tipo de dado booleano (ex: bool flag = true;)',
          },

          // Mais Funções úteis
          {
            label: 'tone',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'tone($1, $2);',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Emite um som de uma determinada frequência em um pino',
          },
          {
            label: 'noTone',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'noTone($1);',
            documentation: 'Desliga o som no pino especificado',
          },
        ];

        // Filtra as sugestões com base no que o usuário está digitando
        return {
          suggestions: suggestions.filter(item => item.label.startsWith(wordUntilPosition.word)),
        };
      },
    });
  };

  // Função para lidar com a mudança no código do Monaco
  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  // Função para submeter o formulário
  const handleSubmit = async (values: { name: string, version: string }) => {
    const data = {
      code: code,
      name: values.name,
      version: values.version, // Adicionando versão ao envio
    };

    try {
      const firmware = await addFirmware(data);
      await addFirmwareToGroup(firmware.uuid,group_id!)
      navigate(`/group/${group_id}`);

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

  return (
    <Layout>
      <Content style={{ padding: '24px', height: '100vh' }}>
        <Form
          onFinish={handleSubmit}
          initialValues={{ name: name, version: version }} // Inicializando com os valores
          layout="vertical"
        >
          <Form.Item
            label="Nome"
            name="name"
            rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
          >
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome"
            />
          </Form.Item>

          <Form.Item
            label="Versão"
            name="version"
            rules={[
              { required: true, message: 'Por favor, insira a versão!' },
              { validator: validateVersion }, // Validação customizada
            ]}
          >
            <Input
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="Digite a versão (0.0.0)"
            />
          </Form.Item>

          {/* Editor Monaco dentro do Form */}
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
              onMount={handleEditorDidMount}
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

export default EditorPage;
