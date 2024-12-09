import React, { useEffect, useState } from "react";
import { Table, Button, notification, Modal, Select, Row, Col } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Device, Group, Wifi } from "../core/models"; 
import { getAllDevice } from "../core/service/device";
import { addFirmwareToGroup, getAllGroup } from "../core/service/group";
import { getAllWifi } from "../core/service/wifi";
const { Option } = Select;

const DeviceGroupLink: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [wifis,setWifis] = useState<Wifi[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDevicesAndGroups = async () => {
    setLoading(true);
    try {
      const deviceData = await getAllDevice();
      setDevices(deviceData.results);

      const wifis = await getAllWifi();
      setWifis(wifis.results);
      
      const groupData = await getAllGroup();
      const activeGroups = groupData.results.filter(
        (group: Group) => group.active && !group.is_deleted
      );
      setGroups(activeGroups);
    } catch (error) {
      notification.error({
        message: "Erro ao carregar dados",
        description: "Não foi possível carregar dispositivos ou grupos.",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDevicesAndGroups();
  }, []);

  const handleLinkToGroup = (device: Device) => {
    setSelectedDevice(device);
    setIsModalOpen(true);
  };

  const confirmLinkToGroup = async () => {
    if (!selectedGroup) {
      notification.error({
        message: "Erro ao vincular",
        description: "Por favor, selecione um grupo.",
      });
      return;
    }

    try {
      if (selectedDevice) {
        await addFirmwareToGroup(selectedDevice?.uuid, selectedGroup);
        notification.success({
          message: "Dispositivo vinculado!",
          description: `O dispositivo ${selectedDevice?.code} foi vinculado ao grupo com sucesso.`,
        });
        setIsModalOpen(false);
        setSelectedDevice(null);
        setSelectedGroup(null);

        // Recarrega os dispositivos para refletir as mudanças
        fetchDevicesAndGroups();
      }
    } catch (error) {
      notification.error({
        message: "Erro ao vincular",
        description: "Ocorreu um erro ao tentar vincular o dispositivo.",
      });
    }
  };

  const columns: ColumnsType<Device> = [
    {
      title: "Código do Dispositivo",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "UUID",
      dataIndex: "uuid",
      key: "uuid",
    },
    {
      title: "Ações",
      key: "actions",
      render: (_, device) => (
        <Button type="primary" onClick={() => handleLinkToGroup(device)}>
          Vincular ao Grupo
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Vincular Dispositivo ao Grupo
      </h1>

      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <Table
            dataSource={devices}
            columns={columns}
            rowKey="uuid"
            loading={loading}
            pagination={{ pageSize: 10 }}
          />
        </Col>
      </Row>

      <Modal
        title="Vincular Dispositivo ao Grupo"
        visible={isModalOpen}
        onOk={confirmLinkToGroup}
        onCancel={() => setIsModalOpen(false)}
        okText="Vincular"
        cancelText="Cancelar"
      >
        <p>
          Selecione o grupo para vincular o dispositivo{" "}
          <b>{selectedDevice?.code}</b>:
        </p>
        <Select
          placeholder="Selecione um grupo"
          style={{ width: "100%" }}
          onChange={(value) => setSelectedGroup(value)}
          value={selectedGroup}
          options={groups.map((group) => ({
            value: group.uuid,
            label: group.name,
          }))}
        />
      </Modal>
    </div>
  );
};

export default DeviceGroupLink;
