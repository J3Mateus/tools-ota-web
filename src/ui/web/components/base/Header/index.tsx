import { useToggleNavigation } from "@web/contexts/common/sidemenu/hooks";
import { Avatar, Button, Dropdown, Layout, MenuProps } from "antd";
import { AiOutlineMenuUnfold, AiOutlineUser } from "react-icons/ai";
import styles from "./styles.module.scss";
import { useLogout } from "@web/contexts/auth/hooks";

function Header() {
	const toogleNavigation = useToggleNavigation();
	const logout = useLogout();
	const { Header } = Layout;

	const items: MenuProps["items"] = [
		{
			label: "Sair",
			key: "0",
			onClick: logout,
		},
	];

	return (
		<Header className={styles.container}>
			<Button type="primary" onClick={toogleNavigation}>
				<AiOutlineMenuUnfold size={20} />
			</Button>
			<h1 style={{ textAlign: "start" }}>Tools OTA</h1>
			<div className={styles.profileContainer}>
				<Dropdown menu={{ items }} trigger={["click"]}>
					<Avatar size={40} icon={<AiOutlineUser size={20} />} />
				</Dropdown>
			</div>
		</Header>
	);
}

export default Header;