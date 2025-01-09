import { useContextSelector } from "use-context-selector";
import { AppConfigContext } from ".";

export function useShowHeader() {
	return useContextSelector(AppConfigContext, (ctx) => ctx.showHeader);
}

export function useChangeShowHeader() {
	return useContextSelector(AppConfigContext, (ctx) => ctx.changeShowHeader);
}

export function useShowSideMenu() {
	return useContextSelector(AppConfigContext, (ctx) => ctx.showSideMenu);
}

export function useChangeShowSideMenu() {
	return useContextSelector(
		AppConfigContext,
		(ctx) => ctx.changeShowSideMenu
	);
}