import Firmware from '@models/Firmware';
import Monaco from '@monaco-editor/react';
import View from '@web/components/base/View';
import { useCreateFirmware, useFindFirmwareByID, useUpdateFirmware, useUploadFirmware } from '@web/contexts/firmware/hooks';
import { Button, Col, Form, Input, Row, message, Upload, Checkbox  } from "antd";
import { useForm } from 'antd/es/form/Form';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UploadOutlined } from "@ant-design/icons";

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

  function CreateOrEditFirmwarePage() {
    const [uploading, setUploading] = useState(false);
  
    const uploadFirmware = useUploadFirmware();
    const updateFirmware = useUpdateFirmware();
    const createFirmware = useCreateFirmware();
    const findFirmwareByID = useFindFirmwareByID();
  
    const navigate = useNavigate();
    const [formRef] = useForm();
    const { firmwareId } = useParams();
  
    useEffect(() => {
      if (firmwareId && !!findFirmwareByID) {
        findFirmwareByID(firmwareId).then((result) => {
          formRef.setFieldsValue({
            name: result?.name,
            version: result?.version,
            code: result?.code,
            use_code: result?.useCode || false, // Inicializa o useCode
          });
        });
      }
    }, [firmwareId]);
  
    const handleOk = useMemo(() => {
      if (firmwareId) return updateFirmware;
      return createFirmware;
    }, [firmwareId]);
  
    const handleConfirm = useCallback(
      async (values: Record<string, unknown>) => {
        const isOk = await handleOk(
          Firmware.fromForm({
            ...values,
            uuid: firmwareId,
          })
        );
        if (isOk) navigate("/admin/listar-firmware");
      },
      [firmwareId]
    );
  
    const handleUpload = async (file: File) => {
      if (!firmwareId) return;
      setUploading(true);
      try {
        const isUploaded = await uploadFirmware(firmwareId, file);
        if (isUploaded) {
          message.success("Arquivo enviado com sucesso!");
        }
      } catch (error) {
        message.error("Erro ao enviar o arquivo.");
      } finally {
        setUploading(false);
      }
    };
  
    const validateVersion = (_: any, value: string) => {
      const versionPattern = /^\d+\.\d+\.\d+$/;
      return versionPattern.test(value)
        ? Promise.resolve()
        : Promise.reject(new Error("A versão deve estar no formato 0.0.0"));
    };
  
    return (
      <View showBackButton>
        <Form
          form={formRef}
          onFinish={handleConfirm}
          layout="vertical"
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                label="Nome do firmware"
                name="name"
                required
                rules={[
                  {
                    required: true,
                    message: "Digite um nome válido",
                  },
                ]}
              >
                <Input type="text" name="firmware_name" />
              </Form.Item>
            </Col>
  
            <Col span={16}>
              <Form.Item
                label="Versão"
                name="version"
                required
                rules={[
                  { required: true, message: "Por favor, insira a versão!" },
                  { validator: validateVersion },
                ]}
              >
                <Input type="text" name="firmware_version" />
              </Form.Item>
            </Col>
          </Row>
  
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                name="use_code"
                valuePropName="checked"
              >
                <Checkbox>Usar Código Fonte (C++)</Checkbox>
              </Form.Item>
            </Col>
          </Row>
  
          <Form.Item shouldUpdate>
            {() => {
              const useCode = formRef.getFieldValue("use_code");
              return useCode ? (
                <Row gutter={16}>
                  <Form.Item
                    label="Código Fonte (C++)"
                    name="code"
                    rules={[
                      { required: true, message: "Por favor, insira o código!" },
                    ]}
                    style={{ width: "100%" }}
                  >
                    <Monaco
                      height="400px"
                      defaultLanguage="cpp"
                      theme="vs-dark"
                      onMount={handleEditorDidMount}
                    />
                  </Form.Item>
                </Row>
              ) : (
                firmwareId && (
                  <Row gutter={16}>
                    <Col span={24}>
                      <Upload
                        customRequest={({ file }) => {
                          handleUpload(file as File);
                        }}
                        showUploadList={false}
                        disabled={uploading}
                      >
                        <Button
                          icon={<UploadOutlined />}
                          loading={uploading}
                          disabled={uploading}
                        >
                          Enviar Arquivo de Firmware
                        </Button>
                      </Upload>
                    </Col>
                  </Row>
                )
              );
            }}
          </Form.Item>
  
          <Row gutter={16} align={"bottom"} justify={"end"}>
            <Form.Item>
              <Button
                style={{
                  marginTop: "1rem",
                }}
                type="primary"
                htmlType="submit"
                size="large"
              >
                {firmwareId ? "Editar" : "Criar"}
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </View>
    );
  }
  
  export default CreateOrEditFirmwarePage;