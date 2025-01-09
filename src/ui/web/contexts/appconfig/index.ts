import { createContext } from "use-context-selector";

interface AppConfigContextActionProps {
	changeShowHeader(value: boolean): void;
	changeShowSideMenu(value: boolean): void;
}

export interface AppConfigContextProps {
	showHeader?: boolean;
	showSideMenu?: boolean;
}

export const AppConfigContext = createContext(
	{} as AppConfigContextActionProps & AppConfigContextProps
);