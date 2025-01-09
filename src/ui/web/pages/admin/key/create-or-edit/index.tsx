import Key from "@models/Key";
import { Button, Col, Form, Input, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import {
	useCallback,
	useEffect,
	useMemo,
} from "react";

import { useNavigate, useParams } from "react-router-dom";
import {
	useCreateKey,
	useFindKeyByID,
	useUpdateKey,
} from "@web/contexts/key/hooks";
import View from "@web/components/base/View";


function CreateOrEditKeyPage() {

	const updateKey =  useUpdateKey();
	const createKey = useCreateKey();
	const findKeyByID =	useFindKeyByID();


	const navigate = useNavigate();
	const [formRef] = useForm();
	const { keyId } = useParams();

	useEffect(() => {
		if (keyId && !!findKeyByID) {
			findKeyByID(keyId).then((result) => {
				formRef.setFieldValue("name", result?.name);
			});
		}
	}, [keyId]);

	const handleOk = useMemo(() => {
		if (keyId) return updateKey;
		return createKey;
	}, [keyId]);

	const handleConfirm = useCallback(
		async (values: Record<string, unknown>) => {

			const isOk = await handleOk(
				Key.fromForm({
					...values,
					id: keyId,
				})
			);
			if (isOk) navigate("/admin/listar-keys");
		},
		[keyId]
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
							label="Nome da key"
							name="name"
							required
							rules={[
								{
									required: true,
									message: "Digite um nome válido",
								},
							]}
						>
							<Input type="text" name="key_name" />
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
							{keyId ? "Editar" : "Criar"}
						</Button>
					</Form.Item>
				</Row>
			</Form>
		</View>
	);
}

export default CreateOrEditKeyPage;