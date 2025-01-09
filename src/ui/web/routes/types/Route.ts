export interface Route {
	name: string;
	path: string;
	page?: () => JSX.Element;
	hidden?: boolean;
	subroutes?: Route[];
	icon?: JSX.Element;
	activeIcon?: JSX.Element;
}