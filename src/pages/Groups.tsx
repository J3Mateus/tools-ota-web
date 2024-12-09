import React, { useEffect, useState } from 'react';
import { Table, Button, Typography, Space } from 'antd';
import { Device, Firmware, Group, Groups as GroupsWithPagination } from '../core/models/index';
import { getAllGroup } from '../core/service/group';
import { useNavigate } from 'react-router-dom';
const { Text } = Typography;


const Groups: React.FC = () => {
  const [groupData, setGroupData] = useState<GroupsWithPagination | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
      (async ()=>{
        setLoading(true)
        const groups = await getAllGroup();
        if(groups){
          setGroupData(groups)
        }
        setLoading(false)
      })()
  }, []);

  const columns = [
    {
      title: 'Nome do Grupo',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Ativo',
      dataIndex: 'active',
      key: 'active',
      render: (active: boolean) => (
        <Text type={active ? 'success' : 'danger'}>
          {active ? 'Sim' : 'Não'}
        </Text>
      ),
    },
    {
      title: 'Firmware',
      dataIndex: 'firmware',
      key: 'firmware',
      render: (firmware: Firmware | undefined) => firmware?.name || 'N/A',
    },
    {
      title: 'Dispositivos',
      dataIndex: 'device',
      key: 'device',
      render: (devices: Device[]) => devices.length,
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_: any, record: Group) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/group/${record.uuid}`)}
          >
            Vincular Firmware
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Typography.Title level={2}>Grupos</Typography.Title>
      <Table
        columns={columns}
        dataSource={groupData?.results.map((group) => ({
          key: group.uuid,
          ...group,
        }))}
        loading={loading}
        bordered
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default Groups;
