import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { createGroup } from '../core/service/group';

const CreateGroup: React.FC = () => {
  const [form] = Form.useForm();


  const onFinish = async (values: { name: string }) => {
    console.log('Received values:', values);
    await createGroup(values);
    message.success('Grupo criado com sucesso!');
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <h1>Criar Grupo</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Nome do Grupo"
          name="name"
          rules={[{ required: true, message: 'Por favor, insira o nome do grupo!' }]}
        >
          <Input placeholder="Digite o nome do grupo" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Criar Grupo
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateGroup;
