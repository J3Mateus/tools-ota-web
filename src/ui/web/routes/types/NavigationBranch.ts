import { RouteGroup } from "./RouteGroup";

export interface NavigationBranch {
	redirectPath: string;
	groups: RouteGroup[];
}