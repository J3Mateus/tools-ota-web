import Group from "@models/Group";

import { Button, Col, Form, Row, Select, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import {
  useFetchDevices,
  useDevices,
} from "@web/contexts/device/hooks";

import {
    useFetchFirmwares,
    useFirmwares 
} from "@web/contexts/firmware/hooks";

import { 
    useFetchWifis,
    useWifis 
} from "@web/contexts/wifi/hooks";

import {
    useFetchKeys,
    useKeys
} from "@web/contexts/key/hooks"

import { useFindGroupByID, useLinkDevice, useLinkFirmware, useLinkWifi, useLinkApiKey, useRemoveDeviceForGroup } from "@web/contexts/group/hooks";
import View from "@web/components/base/View";
import { RiDeleteBin6Line } from "react-icons/ri";

import Device from "@models/Device";


const tableColumns = [
  {
    title: "UUID",
    dataIndex: "uuid",
    key: "uuid",
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Status",
    dataIndex: "isDeleted",
    key: "isDeleted",
    render: (isDeleted: boolean) => (isDeleted ? "Deleted" : "Active"),
  },
  {
    title: "Ações",
    dataIndex: "actions",
    key: "actions",
    render: (_: string, data: Device) => {
        return <></>;
    },
  },
];

function GroupDetailPage() {
    const { groupId } = useParams<{ groupId: string }>();
    const [formRef] = useForm();
    const findGroupByID = useFindGroupByID();

    const fetchDevices = useFetchDevices();
    const devices = useDevices();

    const fetchFirmwares = useFetchFirmwares();
    const firmwares = useFirmwares();

    const featchWifis = useFetchWifis();
    const wifis = useWifis();

    const fetchKeys = useFetchKeys();
    const apiKey = useKeys();

    const removeDeviceForGroup = useRemoveDeviceForGroup();


    const linkDeviceToWiFi = useLinkWifi();
    const linkDeviceToFirmware = useLinkFirmware();
    const linkDeviceToGroup = useLinkDevice();
    const linkDeviceToApiKey = useLinkApiKey();

    const [selectedWiFi, setSelectedWiFi] = useState<string | undefined>();
    const [selectedFirmware, setSelectedFirmware] = useState<string | undefined>();
    const [selectedDevice, setSelectedDevice] = useState<string | undefined>();
    const [selectedKey, setSelectedKey ] =  useState<string | undefined>();
    
    const [group, setGroup] = useState<Group>();

    useEffect(() => {
        fetchDevices();
        fetchFirmwares();
        featchWifis();
        fetchKeys();

        if (groupId && !!findGroupByID) {
            findGroupByID(groupId).then((result) => {
                setGroup(result);
            });
        }
    }, [fetchDevices,groupId]);

    const handleLinkWiFi = useCallback(async () => {
        if (groupId && selectedWiFi) {
            const success = await linkDeviceToWiFi(groupId, selectedWiFi);
            if (success) {
                if (findGroupByID) {
                    const updatedGroup = await findGroupByID(groupId); // Faz nova requisição
                    setGroup(updatedGroup); // Atualiza o estado do grupo
                }
            }
        }
    }, [groupId, selectedWiFi, findGroupByID, linkDeviceToWiFi]);

    const handleLinkFirmware = useCallback(async () => {
        if (groupId && selectedFirmware) {
            const success = await linkDeviceToFirmware(groupId, selectedFirmware);
            if (success) {
                if (findGroupByID) {
                    const updatedGroup = await findGroupByID(groupId); // Faz nova requisição
                    setGroup(updatedGroup); // Atualiza o estado do grupo
                }
            }
        }
    }, [groupId, selectedFirmware, findGroupByID, linkDeviceToFirmware]);

    const handleLinkDevice = useCallback(async () => {
        if (groupId && selectedDevice) {
        const success = await linkDeviceToGroup(groupId, selectedDevice);
        if (success && group) {
            const updatedDevice = devices?.results.find(
            (device) => device.uuid === selectedDevice
            );
            if (updatedDevice) {
            setGroup({
                ...group,
                device: [...(group.device || []), updatedDevice]
            } as Group);
            }
        }
        }
    }, [groupId, selectedDevice, linkDeviceToGroup, group, devices?.results]);

    const handleLinkApiKey = useCallback(async () => {
        if (groupId && selectedKey) {
        const success = await linkDeviceToApiKey(groupId, selectedKey);
        if (success) {
            if (findGroupByID) {
                const updatedGroup = await findGroupByID(groupId); // Faz nova requisição
                setGroup(updatedGroup); // Atualiza o estado do grupo
            }
        }
        }
    }, [groupId, selectedKey, linkDeviceToApiKey,findGroupByID, apiKey?.results]);

    const handleRemoveDevice = useCallback(
        async (deviceID: string) => {
            if (groupId) {
                const success = await removeDeviceForGroup(groupId, deviceID);
                if (success && group) {
                    setGroup({
                        ...group,
                        device: group.device?.filter((device) => device.uuid !== deviceID),
                    } as Group);
                }
            }
        },
        [groupId, removeDeviceForGroup, group]
    );


    const actionButtons = useCallback((_: string, data: Device) => {
		return (
			<div
				style={{
					display: "flex",
					gap: ".4rem",
				}}
			>
				
				<Button
					danger
					type="primary"
					onClick={() => handleRemoveDevice(data.uuid)}
				>
					<RiDeleteBin6Line size={20} />
				</Button>
			</div>
		);
	}, []);

	tableColumns.find((item) => item.key === "actions")!.render = actionButtons;


    return (
    <View showBackButton>
        <Form form={formRef} layout="vertical" autoComplete="off">

        <Row gutter={16}>
            <Col span={12}>
                <Form.Item label="WiFi Vinculado">
                    <div>{group?.wifi?.SSDI || "Nenhum WiFi vinculado"}</div>
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item label="Firmware Vinculado">
                    <div>{group?.firmware?.name || "Nenhum Firmware vinculado"}</div>
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item label="Key Vinculado">
                    <div>{group?.key?.name || "Nenhuma key vinculado"}</div>
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col span={8}>
            <Form.Item label="WiFi">
                <Row gutter={8}>
                <Col span={18}>
                    <Select
                    placeholder="Selecione um WiFi"
                    onChange={setSelectedWiFi}
                    options={wifis?.results.map((wifi) => ({
                        label: wifi.SSDI,
                        value: wifi.uuid,
                    }))}
                    />
                </Col>
                <Col span={6}>
                    <Button type="primary" onClick={handleLinkWiFi}>
                    Vincular
                    </Button>
                </Col>
                </Row>
            </Form.Item>
            </Col>

            <Col span={8}>
            <Form.Item label="Firmware">
                <Row gutter={8}>
                <Col span={18}>
                    <Select
                    placeholder="Selecione um Firmware"
                    onChange={setSelectedFirmware}
                    options={firmwares?.results.map((firmware) => ({
                        label: firmware.name,
                        value: firmware.uuid,
                    }))}
                    />
                </Col>
                <Col span={6}>
                    <Button type="primary" onClick={handleLinkFirmware}>
                    Vincular
                    </Button>
                </Col>
                </Row>
            </Form.Item>
            </Col>

            <Col span={8}>
            <Form.Item label="Device">
                <Row gutter={8}>
                <Col span={18}>
                    <Select
                    placeholder="Selecione um Device"
                    onChange={setSelectedDevice}
                    options={devices?.results.map((device) => ({
                        label: device.code,
                        value: device.uuid,
                    }))}
                    />
                </Col>
                <Col span={6}>
                    <Button type="primary" onClick={handleLinkDevice}>
                    Vincular
                    </Button>
                </Col>
                </Row>
            </Form.Item>
            </Col>


            <Col span={8}>
            <Form.Item label="Key">
                <Row gutter={8}>
                <Col span={18}>
                    <Select
                    placeholder="Selecione um key"
                    onChange={setSelectedKey}
                    options={apiKey?.results.map((key) => ({
                        label: key.name,
                        value: key.id,
                    }))}
                    />
                </Col>
                <Col span={6}>
                    <Button type="primary" onClick={handleLinkApiKey}>
                    Vincular
                    </Button>
                </Col>
                </Row>
            </Form.Item>
            </Col>
        </Row>

        <Row gutter={16}>
            <Col span={24}>
            <Table
                columns={tableColumns}
                dataSource={group?.device}
                pagination={false}
                bordered
                title={() => "Dispositivos Vinculados"}
            />
            </Col>
        </Row>
        </Form>

    </View>
    );
}

export default GroupDetailPage;
