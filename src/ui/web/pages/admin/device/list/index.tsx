import { Button, Table } from "antd";
import { useCallback, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Device from "@models/Device";
import {
	useEraseDevice,
	useFetchDevices,
	useDevices,
	useInitializeOta,
	useForcedUpdate,
	useRemoveFireware
} from "@web/contexts/device/hooks";
import { useEraseConfirmModal } from "@web/components/EraseConfirmModal/hooks";
import EraseConfirmModal from "@web/components/EraseConfirmModal";
import { useNavigate } from "react-router-dom";
import View from "@web/components/base/View";
import { FiUploadCloud } from "react-icons/fi";
import { CiLink } from "react-icons/ci";
import { FaUserSlash } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';

const tableColumns = [
	{
		title: "Código do Dispositivo",	
		dataIndex: "code",
		key: "code",
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

function ListDevices() {
	const fetchDevices = useFetchDevices();
	const data = useDevices();
	const eraseDevice = useEraseDevice();
	const eraseConfirmModalRef = useEraseConfirmModal();
	const initializeOta = useInitializeOta();

	const forcedUpdate = useForcedUpdate();
	const removeFirmware = useRemoveFireware();

	const navigate = useNavigate();

	const actionButtons = useCallback((_: string, data: Device) => {
		return (
			<div
				style={{
					display: "flex",
					gap: ".4rem",
				}}
			>

				<Button
					type="primary"
					disabled={data.firmware?.useCode === false}
					onClick={() => initializeOta(data.uuid)}
				>
					<FiUploadCloud size={20} />
				</Button>

				<Button
					type="primary"
					onClick={() => navigate(`/admin/vincular-recursos/${data.uuid}/dispositivo`)}
				>
					<CiLink size={20} />
				</Button>

				<Button
					type="primary"
					onClick={() => removeFirmware(data.uuid)}
				>
					<FaUserSlash size={20} />
				</Button>

				<Button
					type="primary"
					onClick={() => forcedUpdate(data.uuid)}
				>
					<FiRefreshCw size={20} />
				</Button>


				<Button
					danger
					type="primary"
					onClick={() => eraseConfirmModalRef.current.open(data.uuid)}
				>
					<RiDeleteBin6Line size={20} />
				</Button>
			</div>
		);
	}, []);

	tableColumns.find((item) => item.key === "actions")!.render = actionButtons;

	useEffect(() => {
		if (!data && !!fetchDevices) {
			fetchDevices();
		}
	}, []);

	return (
		<View>
			<Table
				columns={tableColumns}
				dataSource={data?.results}
				pagination={{
					pageSize: data?.limit,
					total: data?.count,
					// onChange: (page) => TODO: finalizar onChange da paginação
				}}
			/>
			<EraseConfirmModal
				title="Deletar dispositivo"
				handleOk={eraseDevice}
				ref={eraseConfirmModalRef}
			/>
		</View>
	);
}

export default ListDevices;