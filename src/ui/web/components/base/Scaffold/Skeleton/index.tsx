import { Outlet } from "react-router-dom";
import styles from "./styles.module.scss";
import { Layout } from "antd";
import SideMenu from "@web/components/base/SideMenu";
import Header from "@web/components/base/Header";
import { useShowHeader, useShowSideMenu } from "@web/contexts/appconfig/hooks";

function Skeleton() {
	const { Content } = Layout;
	const showHeader = useShowHeader();
	const showSideMenu = useShowSideMenu();

	return (
		<Layout>
			{showSideMenu && <SideMenu />}
			<Layout className={styles.container}>
				{showHeader && <Header />}
				<Content>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
}

export default Skeleton;