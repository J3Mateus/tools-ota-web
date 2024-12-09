import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Select, Table, Typography, message, Row, Col, Skeleton } from 'antd';
import { Devices, Firmwares, Group, Wifis } from '../core/models';
import { getAllFirmware } from '../core/service/firmware';
import { addDeviceToGroup, getAllDevice } from '../core/service/device';
import { addFirmwareToGroup, addWifiToGroup, getByID, initializeGroupOta } from '../core/service/group';
import { getAllWifi } from '../core/service/wifi';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { Option } = Select;

const GroupDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [group, setGroup] = useState<Group | null>(null);
  const [availableFirmwares, setAvailableFirmwares] = useState<Firmwares>();
  const [devices, setAvailableDevices] = useState<Devices>();
  const [availableWifis, setAvailableWifis] = useState<Wifis>();
  const [selectedWifi, setSelectedWifi] = useState<string | null>(null);
  const [selectedFirmware, setSelectedFirmware] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchGroupDetails = async () => {
    try {
      setLoading(true);
      const data = await getByID(id);
      setGroup(data);
    } catch (error) {
      message.error('Erro ao carregar os detalhes do grupo.');
    } finally {
      setLoading(false);
    }
  };

  const initializeOta = async () => {
    try {
      await initializeGroupOta(id!);
      message.success('Atualização iniciada com sucesso!');
    } catch (error) {
      message.error('Erro ao iniciar a atualização.');
    }
  };

  const fetchFirmwares = async () => {
    try {
      const firmwares = await getAllFirmware();
      setAvailableFirmwares(firmwares);
    } catch (error) {
      message.error('Erro ao carregar os firmwares disponíveis.');
    }
  };

  const fetchDevices = async () => {
    try {
      const devices = await getAllDevice();
      setAvailableDevices(devices);
    } catch (error) {
      message.error('Erro ao carregar os dispositivos disponíveis.');
    }
  };

  const fetchWifis = async () => {
    try {
      const wifis = await getAllWifi();
      setAvailableWifis(wifis);
    } catch (error) {
      message.error('Erro ao carregar os wifis disponíveis.');
    }
  };

  const confirmLinkToGroup = async () => {
    if (!selectedDevice) {
      message.warning('Selecione um dispositivo para vincular.');
      return;
    }
    try {
      await addDeviceToGroup(selectedDevice, id!);
      fetchGroupDetails(); // Atualiza os detalhes do grupo
    } catch (error) {
      message.error('Erro ao vincular dispositivo.');
    }
  };

  const handleAddFirmware = async () => {
    if (!selectedFirmware || !group) {
      message.warning('Selecione um firmware para vincular.');
      return;
    }
    try {
      await addFirmwareToGroup(selectedFirmware, group.uuid);
      message.success('Firmware vinculado com sucesso!');
      fetchGroupDetails(); // Atualiza os detalhes do grupo
    } catch (error) {
      message.error('Erro ao vincular firmware.');
    }
  };

  const handleAddWifi = async () => {
    if (!selectedWifi || !group) {
      message.warning('Selecione um wifi para vincular.');
      return;
    }
    try {
      await addWifiToGroup(selectedWifi, group.uuid);
      message.success('Wifi vinculado com sucesso!');
      fetchGroupDetails(); // Atualiza os detalhes do grupo
    } catch (error) {
      message.error('Erro ao vincular wifi.');
    }
  };

  useEffect(() => {
    fetchGroupDetails();
    fetchFirmwares();
    fetchDevices();
    fetchWifis();
  }, [id]);

  return (
    <div style={{ padding: 20 }}>
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={16} xl={12}>
          <Card loading={loading} bordered>
            <Title level={3} style={{ textAlign: 'center' }}>
              Detalhes do Grupo
            </Title>
            {group ? (
              <>
                {/* Informações do Grupo */}
                <div style={{ marginBottom: 20 }}>
                  <Text>
                    <strong>Nome:</strong> {group.name}
                  </Text>
                  <br />
                  <Text>
                    <strong>Ativo:</strong> {group.active ? 'Sim' : 'Não'}
                  </Text>
                  <br />
                  <Text>
                    <strong>Firmware Atual:</strong> {group.firmware ? group.firmware.name : 'Nenhum'}
                  </Text>
                  <br />
                  <Text>
                    <strong>Wifi:</strong> {group.wifi ? group.wifi.SSDI : 'Nenhum'}
                  </Text>
                </div>

                {/* Ações principais */}
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Button type="primary" block onClick={() => navigate(`/editor/${group.uuid}`)}>
                      Adicionar Código
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button type="default" block onClick={initializeOta}>
                      Inicializar Atualização
                    </Button>
                  </Col>
                </Row>

                {/* Vincular Firmware */}
                <Card style={{ marginTop: 30 }} bordered>
                  <Title level={4}>Vincular Firmware</Title>
                  <Select
                    style={{ width: '100%', marginBottom: 20 }}
                    placeholder="Selecione um firmware"
                    onChange={(value) => setSelectedFirmware(value)}
                    defaultValue={group.firmware?.uuid}
                  >
                    {availableFirmwares?.results.map((firmware) => (
                      <Option key={firmware.uuid} value={firmware.uuid}>
                        {firmware.name} - {firmware.version}
                      </Option>
                    ))}
                  </Select>
                  <Button type="primary" block onClick={handleAddFirmware}>
                    Vincular Firmware
                  </Button>
                </Card>

                {/* Vincular Wifi */}
                <Card style={{ marginTop: 30 }} bordered>
                  <Title level={4}>Vincular Wifi</Title>
                  <Select
                    style={{ width: '100%', marginBottom: 20 }}
                    placeholder="Selecione um wifi"
                    onChange={(value) => setSelectedWifi(value)}
                    defaultValue={group.wifi?.uuid}
                  >
                    {availableWifis?.results.map((wifi) => (
                      <Option key={wifi.uuid} value={wifi.uuid}>
                        {wifi.SSDI}
                      </Option>
                    ))}
                  </Select>
                  <Button type="primary" block onClick={handleAddWifi}>
                    Vincular Wifi
                  </Button>
                </Card>

                {/* Vincular Dispositivo */}
                <Card style={{ marginTop: 30 }} bordered>
                  <Title level={4}>Vincular Dispositivo</Title>
                  <Select
                    style={{ width: '100%', marginBottom: 20 }}
                    placeholder="Selecione um dispositivo"
                    onChange={(value) => setSelectedDevice(value)}
                  >
                    {devices?.results.map((device) => (
                      <Option key={device.uuid} value={device.uuid}>
                        {device.code}
                      </Option>
                    ))}
                  </Select>
                  <Button type="primary" block onClick={confirmLinkToGroup}>
                    Vincular Dispositivo
                  </Button>
                </Card>

                {/* Dispositivos Vinculados */}
                <Card style={{ marginTop: 30 }} bordered>
                  <Title level={4}>Dispositivos Vinculados</Title>
                  <Table
                    dataSource={group.device}
                    columns={[
                      { title: 'Código', dataIndex: 'code', key: 'code' },
                      { title: 'UUID', dataIndex: 'uuid', key: 'uuid' },
                    ]}
                    rowKey="uuid"
                    pagination={{ pageSize: 5 }}
                    style={{ marginTop: 10 }}
                  />
                </Card>
              </>
            ) : (
              <Skeleton active />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default GroupDetailsPage;
