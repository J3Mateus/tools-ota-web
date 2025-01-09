import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { AppConfigContext, AppConfigContextProps } from ".";

function AppConfigProvider({
	children,
	showHeader: initialShowHeader,
	showSideMenu: initialShowSideMenu,
}: PropsWithChildren<AppConfigContextProps>) {
	const [showHeader, setShowHeader] = useState<boolean>(
		initialShowHeader ?? false
	);
	const [showSideMenu, setShowSideMenu] = useState<boolean>(
		initialShowSideMenu ?? false
	);

	useEffect(() => {
		if (initialShowHeader !== showHeader) {
			setShowHeader(initialShowHeader ?? false);
		}
	}, [initialShowHeader]);

	useEffect(() => {
		if (initialShowSideMenu !== showSideMenu) {
			setShowSideMenu(initialShowSideMenu ?? false);
		}
	}, [initialShowSideMenu]);

	const changeShowHeader = useCallback(
		(value: boolean) => setShowHeader(value),
		[]
	);
	const changeShowSideMenu = useCallback(
		(value: boolean) => setShowSideMenu(value),
		[]
	);

	return (
		<AppConfigContext.Provider
			value={{
				showHeader,
				changeShowHeader,
				showSideMenu,
				changeShowSideMenu,
			}}
		>
			{children}
		</AppConfigContext.Provider>
	);
}

export default AppConfigProvider;