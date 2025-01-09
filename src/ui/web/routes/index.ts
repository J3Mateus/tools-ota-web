import { namedBranchs } from "./routes";
import { NavigationBranch, Route } from "./types";

export const getNavigationBranchs = () => namedBranchs;

export function getAllRoutes() {
	return Object.values(namedBranchs)
		.map((redirector) =>
			redirector.groups.map((group) => group.routes).flat()
		)
		.flat();
}

export function getRouteByPath(
	branch: NavigationBranch,
	pathname: string
): Route | undefined {
	return branch.groups
		.map((group) => group.routes)
		.flat()
		.find((route) => route.path === pathname);
}

export function getAllRoutesByBranch(branch: NavigationBranch): Route[] {
	return branch.groups.map((item) => item.routes).flat();
}

export function getAllRoutePaths(branch: NavigationBranch): string[] {
	return branch.groups
		.map((item) => item.routes)
		.flat()
		.map((item) => item.path);
}

export function formatPathnameWithArgs(
	pathname: string,
	args?: Record<string, unknown>
) {
	if (!args || !Object.keys(args) || pathname.match(/:(\w+[-]?)/) === null)
		return pathname;
	for (const [key, value] of Object.entries(args)) {
		pathname = pathname.replace(new RegExp(`/${value}/?`), `/:${key}/`);
	}
	return pathname;
}

export function formatPathnameWithParams(
	pathname: string,
	availablePaths: string[]
) {
	let formattedPath = pathname;
	const splittedPathname = pathname.split("/");
	const formattedPaths = availablePaths.map((item) =>
		item.endsWith("/") ? item.slice(0, -1) : item
	);
	for (const path of formattedPaths) {
		let formattedPathWithRegex = formattedPath.split("/");
		const splittedPath = path.split("/");
		if (splittedPathname.length !== splittedPath.length) continue;
		for (const index in splittedPath) {
			const pathPart = splittedPath[index];
			if (!pathPart) continue;
			const match = pathPart.match(/(:[a-zA-Z1-9_-]+)/g);
			if (!match) {
				if (pathPart !== formattedPathWithRegex[index]) break;
				continue;
			}
			if (!formattedPathWithRegex[index]) break;
			formattedPathWithRegex[index] = match[0];
		}
		if (formattedPathWithRegex.join("/") === formattedPath) continue;
		else formattedPath = formattedPathWithRegex.join("/");
	}
	return formattedPath;
}