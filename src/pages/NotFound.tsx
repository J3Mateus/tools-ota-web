import React from 'react';
import { Typography, Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div style={{ textAlign: 'center', padding: '50px' }}>
    <Typography.Title level={2}>404 - Página Não Encontrada</Typography.Title>
    <p>Desculpe, a página que você está tentando acessar não existe.</p>
    <Button type="primary">
      <Link to="/">Voltar para a Página Inicial</Link>
    </Button>
  </div>
);

export default NotFound;
