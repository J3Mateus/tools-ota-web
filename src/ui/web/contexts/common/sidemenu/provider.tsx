import { PropsWithChildren, useCallback, useState } from "react";
import { SideMenuCTX } from ".";

function SideMenuProvider({ children }: PropsWithChildren) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleNavigation = useCallback(
		() => setIsOpen((state) => !state),
		[]
	);

	return (
		<SideMenuCTX.Provider
			value={{
				toggleNavigation,
				setIsOpen,
				isOpen,
			}}
		>
			{children}
		</SideMenuCTX.Provider>
	);
}

export default SideMenuProvider;