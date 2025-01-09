import { Modal, Typography } from "antd";
import {
	ForwardedRef,
	forwardRef,
	useCallback,
	useImperativeHandle,
	useState,
} from "react";

interface Props {
	title: string;
	handleOk: (ID: string) => Promise<boolean>;
}

export interface EraseConfirmModalHandlers {
	open: (id: string) => void;
}

function EraseConfirmModal(
	{ title, handleOk }: Props,
	ref: ForwardedRef<EraseConfirmModalHandlers>
) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [ID, setID] = useState<string>();
	const { Text } = Typography;

	useImperativeHandle(ref, () => ({
		open,
	}));

	const open = useCallback((id?: string) => {
		if (id) setID(id);
		setIsModalOpen(true);
	}, []);

	const onClose = useCallback(() => {
		setIsModalOpen(false);
	}, []);

	const onOk = useCallback(async () => {
		const isOK = await handleOk(ID!);
		if (isOK) return onClose();
	}, [ID]);

	return (
		<Modal
			title={title}
			open={isModalOpen}
			onOk={onOk}
			onCancel={onClose}
			cancelText="Cancelar"
			okText="Deletar"
		>
			<Text>Tem certeza que deseja deletar esse registro?</Text>
		</Modal>
	);
}

export default forwardRef(EraseConfirmModal);