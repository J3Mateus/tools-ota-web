import Group from "@models/Group";
import { Button, Col, Form, Input, Row, Select, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import {
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";

import { useNavigate, useParams } from "react-router-dom";
import {
	useCreateGroup,
	useFindGroupByID,
	useUpdateGroup,
	useLinkDevice
} from "@web/contexts/group/hooks";
import { useFetchDevices,
		 useDevices
} from "@web/contexts/device/hooks";
import View from "@web/components/base/View";
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
];



function CreateOrEditGroupPage() {

	const updateGroup = useUpdateGroup();
	const createGroup = useCreateGroup();
	const findGroupByID = useFindGroupByID();
	const fetchDevices = useFetchDevices();
	const linkDevice = useLinkDevice();
	const devices = useDevices();

	const navigate = useNavigate();
	const [formRef] = useForm();
	const { groupId } = useParams();
	const [devicesForGroup, setDevicesForGroup] = useState<Device[]>([]);
	
	useEffect(()=>{
		fetchDevices();
	},[])

	useEffect(() => {
		if (groupId && !!findGroupByID) {
			findGroupByID(groupId).then((result) => {
				formRef.setFieldValue("name", result?.name);
				setDevicesForGroup(result?.device || []);
			});
		}
	}, [groupId]);

	const handleOk = useMemo(() => {
		if (groupId) return updateGroup;
		return createGroup;
	}, [groupId]);

	const handleConfirm = useCallback(
		async (values: Record<string, unknown>) => {
			
			if(values.device){
				linkDevice(groupId!, String(values.device));
				return;
			}

			const isOk = await handleOk(
				Group.fromForm({
					...values,
					uuid: groupId,
				})
			);
			if (isOk) navigate("/admin/listar-grupos");
		},
		[groupId]
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
							label="Nome do grupo"
							name="name"
							required
							rules={[
								{
									required: true,
									message: "Digite um nome válido",
								},
							]}
						>
							<Input type="text" name="group_name" />
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
							{groupId ? "Editar" : "Criar"}
						</Button>
					</Form.Item>
				</Row>
			</Form>
		</View>
	);
}

export default CreateOrEditGroupPage;