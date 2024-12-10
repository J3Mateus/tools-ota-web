import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Home from './pages/Home';
import Groups from './pages/Groups';
import NotFound from './pages/NotFound';
import EditorPage from './pages/EditorPage';
import FirmwareList from './pages/FirmwareList';
import DeviceGroupLink from './pages/DeviceGroupLink';
import GroupDetailsPage from './pages/GroupDetailsPage';
import WifiForm from './pages/WifiCreate';
import CodeUpdate from './pages/UpdateFirmware';
import CreateGroup from './pages/CreateGroup';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <Link to="/">Página Inicial</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/groups">Grupos</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/firmware/list">Firmwares</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/device/link/groups">Vincular dispositivo ao grupo</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/wifi/create">Criar wifi</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/group/create">Criar grupo</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/editor/:group_id?" element={<EditorPage  />} />
          <Route path="/firmware/list" element={<FirmwareList />} />
          <Route path="/firmware/:firmware_id" element={<CodeUpdate />} />
          <Route path="/wifi/create" element={<WifiForm />} />
          <Route path="/group/create" element={<CreateGroup/>} />
          <Route path="/device/link/groups" element={<DeviceGroupLink/>} />
          <Route path='/group/:id' element={<GroupDetailsPage/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        © {new Date().getFullYear()} Minha Aplicação
      </Footer>
    </Layout>
  );
};

export default App;
