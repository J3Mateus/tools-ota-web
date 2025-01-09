import Device from "@models/Device";

import { Button, Col, Form, Row, Select, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    useFetchFirmwares,
    useFirmwares 
} from "@web/contexts/firmware/hooks";

import { 
    useFetchWifis,
    useWifis 
} from "@web/contexts/wifi/hooks";

import { useFindDeviceByID, useLinkFirmware, useLinkWifi } from "@web/contexts/device/hooks";
import View from "@web/components/base/View";


function DeviceDetailPage() {
    const { deviceId } = useParams<{ deviceId: string }>();
    const [formRef] = useForm();
    const findDeviceByID = useFindDeviceByID();

    const fetchFirmwares = useFetchFirmwares();
    const firmwares = useFirmwares();

    const featchWifis = useFetchWifis();
    const wifis = useWifis();


    const linkDeviceToWiFi = useLinkWifi();
    const linkDeviceToFirmware = useLinkFirmware();

    const [selectedWiFi, setSelectedWiFi] = useState<string | undefined>();
    const [selectedFirmware, setSelectedFirmware] = useState<string | undefined>();
    const [device, setDevice] = useState<Device>();

    useEffect(() => {
        fetchFirmwares();
        featchWifis();

        if (deviceId && !!findDeviceByID) {
            findDeviceByID(deviceId).then((result) => {
                setDevice(result);
            });
        }
    }, [findDeviceByID,deviceId]);

    const handleLinkWiFi = useCallback(async () => {
        if (deviceId && selectedWiFi) {
            const success = await linkDeviceToWiFi(deviceId, selectedWiFi);
            if (success) {
                if (findDeviceByID) {
                    const updatedDevice = await findDeviceByID(deviceId); // Faz nova requisição
                    setDevice(updatedDevice); // Atualiza o estado do grupo
                }
            }
        }
    }, [deviceId, selectedWiFi, findDeviceByID, linkDeviceToWiFi]);

    const handleLinkFirmware = useCallback(async () => {
        if (deviceId && selectedFirmware) {
            const success = await linkDeviceToFirmware(deviceId, selectedFirmware);
            if (success) {
                if (findDeviceByID) {
                    const updatedDevice = await findDeviceByID(deviceId); // Faz nova requisição
                    setDevice(updatedDevice); // Atualiza o estado do grupo
                }
            }
        }
    }, [deviceId, selectedFirmware, findDeviceByID, linkDeviceToFirmware]);



    return (
    <View showBackButton>
        <Form form={formRef} layout="vertical" autoComplete="off">

        <Row gutter={16}>
            <Col span={12}>
                <Form.Item label="WiFi Vinculado">
                    <div>{device?.wifi?.SSDI || "Nenhum WiFi vinculado"}</div>
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item label="Firmware Vinculado">
                    <div>{device?.firmware?.name || "Nenhum Firmware vinculado"}</div>
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

        </Row>

        </Form>

    </View>
    );
}

export default DeviceDetailPage;
