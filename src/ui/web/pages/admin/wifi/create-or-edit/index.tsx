import Wifi from "@models/Wifi";
import { Button, Col, Form, Input, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import {
	useCallback,
	useEffect,
	useMemo,
} from "react";

import { useNavigate, useParams } from "react-router-dom";
import {
	useCreateWifi,
	useFindWifiByID,
	useUpdateWifi,
} from "@web/contexts/wifi/hooks";
import View from "@web/components/base/View";


function CreateOrEditWifiPage() {

	const updateWifi = useUpdateWifi();
	const createWifi = useCreateWifi();
	const findWifiByID = useFindWifiByID();

	const navigate = useNavigate();
	const [formRef] = useForm();
	const { wifiId } = useParams();

	useEffect(() => {
		if (wifiId && !!findWifiByID) {
			findWifiByID(wifiId).then((result) => {
				formRef.setFieldValue("SSDI", result?.SSDI);
				formRef.setFieldValue("password",result?.password);
			});
		}
	}, [wifiId]);

	const handleOk = useMemo(() => {
		if (wifiId) return updateWifi;
		return createWifi;
	}, [wifiId]);

	const handleConfirm = useCallback(
		async (values: Record<string, unknown>) => {
			const isOk = await handleOk(
				Wifi.fromForm({
					...values,
					uuid: wifiId,
				})
			);
			if (isOk) navigate("/admin/listar-wifis");
		},
		[wifiId]
	);


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
							label="Nome do SSDI"
							name="SSDI"
							required
							rules={[
								{
									required: true,
									message: "Digite um nome válido",
								},
							]}
						>
							<Input type="text" name="ssid_name" />
						</Form.Item>
					</Col>

					<Col span={16}>
						<Form.Item
							label="Senha"
							name="password"
							required
							rules={[
								{
									required: true,
									message: "Digite uma senha valida",
								},
							]}
						>
							<Input type="text" name="password" />
						</Form.Item>
					</Col>
				</Row>

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
							{wifiId ? "Editar" : "Criar"}
						</Button>
					</Form.Item>
				</Row>
			</Form>
		</View>
	);
}

export default CreateOrEditWifiPage;