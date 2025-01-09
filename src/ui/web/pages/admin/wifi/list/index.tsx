import { Button, Table } from "antd";
import styles from "./styles.module.scss";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { useCallback, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Wifi from "@models/Wifi";
import {
	useEraseWifi,
	useFetchWifis,
	useWifis,
} from "@web/contexts/wifi/hooks";
import { useEraseConfirmModal } from "@web/components/EraseConfirmModal/hooks";
import EraseConfirmModal from "@web/components/EraseConfirmModal";
import { useNavigate } from "react-router-dom";
import View from "@web/components/base/View";

const tableColumns = [
	{
		title: "Nome da Rede",
		dataIndex: "SSDI",
		key: "SSDI",
	},
	{
		title: "Ações",
		dataIndex: "actions",
		key: "actions",
		render: (_: string, data: Wifi) => {
			return <></>;
		},
	},
];

function ListWifis() {
	const fetchWifis = useFetchWifis();
	const data = useWifis();
	const eraseWifi = useEraseWifi();
	const eraseConfirmModalRef = useEraseConfirmModal();

	const navigate = useNavigate();

	const actionButtons = useCallback((_: string, data: Wifi) => {
		return (
			<div
				style={{
					display: "flex",
					gap: ".4rem",
				}}
			>
				<Button
					type="primary"
					onClick={() => navigate(`/admin/editar-wifi/${data.uuid}`)}
				>
					<AiOutlineEdit size={20} />
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
		if (!data && !!fetchWifis) {
			fetchWifis();
		}
	}, []);

	return (
		<View
			rightButton={
				<Button
					size="large"
					className={styles.addButton}
					onClick={() => navigate("/admin/criar-wifi")}
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
				title="Deletar Wifi"
				handleOk={eraseWifi}
				ref={eraseConfirmModalRef}
			/>
		</View>
	);
}

export default ListWifis;