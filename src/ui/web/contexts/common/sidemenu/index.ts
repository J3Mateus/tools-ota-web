import { createContext } from "use-context-selector";

interface SideMenuCTXProps {
	toggleNavigation(): void;
	setIsOpen(value: boolean): void;
	isOpen: boolean;
}

export const SideMenuCTX = createContext({} as SideMenuCTXProps);