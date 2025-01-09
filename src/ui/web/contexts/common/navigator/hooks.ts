import { useContextSelector } from "use-context-selector";
import { NavigatorCTX } from ".";

export function useCurrentRoute() {
	return useContextSelector(NavigatorCTX, (ctx) => ctx.currentRoute);
}

export function useCurrentRouteGroups() {
	return useContextSelector(NavigatorCTX, (ctx) => ctx.groups);
}

export function useCurrentRouteProps() {
	return useContextSelector(NavigatorCTX, (ctx) => ctx.currentRouteProps);
}

export function useBranchIdentifier() {
	return useContextSelector(NavigatorCTX, (ctx) => ctx.branchIdentifier);
}

export function useChangeBranchIdentifier() {
	return useContextSelector(
		NavigatorCTX,
		(ctx) => ctx.changeBranchIdentifier
	);
}