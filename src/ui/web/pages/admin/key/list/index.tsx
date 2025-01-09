import { Button, Table } from "antd";
import styles from "./styles.module.scss";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { useCallback, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Key from "@models/Key";
import {
	useCreateKey,
	useFetchKeys,
	useKeys,
	useEraseKey
} from "@web/contexts/key/hooks";
import { useEraseConfirmModal } from "@web/components/EraseConfirmModal/hooks";
import EraseConfirmModal from "@web/components/EraseConfirmModal";
import { useNavigate } from "react-router-dom";
import View from "@web/components/base/View";

const tableColumns = [
	{
		title: "Nome",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Key",
		dataIndex: "key",
		key: "key",
	},
	{
		title: "Ações",
		dataIndex: "actions",
		key: "actions",
		render: (_: string, data: Key) => {
			return <></>;
		},
	},
];
function ListKeys() {
	const fetchKeys = useFetchKeys();
	const data = useKeys();
	const eraseKey = useEraseKey();
	const eraseConfirmModalRef = useEraseConfirmModal();


	const navigate = useNavigate();


	useEffect(() => {
		if (!data && !!fetchKeys) {
			fetchKeys();
		}
	}, [data]);

	const actionButtons = useCallback((_: string, data: Key) => {
		return (
			<div
				style={{
					display: "flex",
					gap: ".4rem",
				}}
			>
				<Button
					type="primary"
					onClick={() => navigate(`/admin/editar-key/${data.id}`)}
				>
					<AiOutlineEdit size={20} />
				</Button>
				<Button
					danger
					type="primary"
					onClick={() => eraseConfirmModalRef.current.open(data.id)}
				>
					<RiDeleteBin6Line size={20} />
				</Button>
			</div>
		);
	}, []);

	tableColumns.find((item) => item.key === "actions")!.render = actionButtons;
	return (
		<View
			rightButton={
				<Button
					size="large"
					className={styles.addButton}
					onClick={() =>{ navigate('/admin/criar-key')}}
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
				title="Deletar dispositivo"
				handleOk={eraseKey}
				ref={eraseConfirmModalRef}
			/>
		</View>
	);
}

export default ListKeys;