import { createContext } from "use-context-selector";
import { Route, RouteGroup } from "@web/routes/types";

interface NavigatorCTXProps {
	currentRoute: string;
	groups: RouteGroup[];
	currentRouteProps: Route | undefined;
	branchIdentifier: unknown;
	changeBranchIdentifier: (value: string | number) => void;
}

export const NavigatorCTX = createContext({} as NavigatorCTXProps);