import { useCurrentRouteGroups } from "@web/contexts/common/navigator/hooks";
import {
	useIsOpen,
	useToggleNavigation,
} from "@web/contexts/common/sidemenu/hooks";
import { Route } from "@web/routes/types";
import { Button, Drawer, Menu, MenuProps } from "antd";
import { useMemo } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

function SideMenu() {
	const currentRouteGroup = useCurrentRouteGroups();
	const isOpen = useIsOpen();
	const toogleNavigation = useToggleNavigation();
	const navigate = useNavigate();

	type MenuItem = Required<MenuProps>["items"][number];

	function getItem(
		name: string,
		path: React.Key,
		icon?: React.ReactNode,
		subroutes?: Route[],
		type?: "group"
	): MenuItem {
		return {
			key: path,
			icon,
			children: subroutes,
			label: name,
			type,
		} as MenuItem;
	}

	const items = useMemo(() => {
		const menuItems: MenuItem[] = [];

		currentRouteGroup.forEach((routeGroup) => {
			const routes = routeGroup.routes;
			routes.forEach((route) => {
				if (!route.hidden) {
					menuItems.push(
						getItem(
							route.name,
							route.path,
							route.icon,
							route.subroutes
						)
					);
				}
			});
		});

		return menuItems;
	}, [currentRouteGroup]);

	return (
		<Drawer
			styles={{
				header: {
					display: "none",
				},
			}}
			width={275}
			placement="left"
			onClose={toogleNavigation}
			open={isOpen}
		>
			<div className={styles.closeDrawer}>
				<Button
					type="primary"
					icon={<AiOutlineClose size={22} />}
					onClick={toogleNavigation}
				/>
			</div>
			<Menu
				defaultSelectedKeys={[String(items[0]?.key)]}
				mode="inline"
				items={items}
				className={styles.navMenu}
				onSelect={({ key }) => {
					navigate(key);
					toogleNavigation();
				}}
			/>
		</Drawer>
	);
}

export default SideMenu;
