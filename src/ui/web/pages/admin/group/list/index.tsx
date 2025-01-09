import { Button, Table } from "antd";
import styles from "./styles.module.scss";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { useCallback, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Group from "@models/Group";
import {
	useEraseGroup,
	useFetchGroups,
	useGroups,
	useInitializeOta
} from "@web/contexts/group/hooks";
import { useEraseConfirmModal } from "@web/components/EraseConfirmModal/hooks";
import EraseConfirmModal from "@web/components/EraseConfirmModal";
import { useNavigate } from "react-router-dom";
import View from "@web/components/base/View";
import { CiLink } from "react-icons/ci";
import { FiUploadCloud } from "react-icons/fi";

const tableColumns = [
	{
		title: "Nome",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Firmware Name",
		dataIndex: ["firmware", "name"],
		key: "firmwareName",
	},
	{
		title: "Firmware Version",
		dataIndex: ["firmware", "version"],
		key: "firmwareVersion",
	},
	{
		title: "Firmware Code using",
		dataIndex: ["firmware", "use_code"],
		key: "useCode",
		render: (use_code: boolean) => (use_code ? "Yes" : "No"), // Format boolean as Yes/No
	},
	{
		title: "Ações",
		dataIndex: "actions",
		key: "actions",
		render: (_: string, data: Group) => {
			return <></>;
		},
	},
];

function ListGroups() {
	const fetchGroups = useFetchGroups();
	const data = useGroups();
	const eraseGroup = useEraseGroup();
	const eraseConfirmModalRef = useEraseConfirmModal();
	const initializeOta = useInitializeOta();

	const navigate = useNavigate();
	console.log(data)
	const actionButtons = useCallback((_: string, data: Group) => {
		console.log(data)
		return (
			<div
				style={{
					display: "flex",
					gap: ".4rem",
				}}
			>
				<Button
					type="primary"
					onClick={() => navigate(`/admin/editar-grupo/${data.uuid}`)}
				>
					<AiOutlineEdit size={20} />
				</Button>


				<Button
					type="primary"
					onClick={() => navigate(`/admin/vincular-recursos/${data.uuid}`)}
				>
					<CiLink size={20} />
				</Button>
	
				<Button
					type="primary"
					disabled={data.firmware?.useCode === false}
					onClick={() => initializeOta(data.uuid)}
				>
					<FiUploadCloud size={20} />
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
		if (!data && !!fetchGroups) {
			fetchGroups();
		}
	}, []);

	return (
		<View
			rightButton={
				<Button
					size="large"
					className={styles.addButton}
					onClick={() => navigate("/admin/criar-grupo")}
				>
					<AiOutlinePlus size={20} />
					Adicionar
				</Button>
			}
		>
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
				title="Deletar Grupo"
				handleOk={eraseGroup}
				ref={eraseConfirmModalRef}
			/>
		</View>
	);
}

export default ListGroups;