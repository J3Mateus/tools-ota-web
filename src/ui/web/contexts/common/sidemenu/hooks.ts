import { useContextSelector } from "use-context-selector";
import { SideMenuCTX } from ".";

export function useToggleNavigation() {
	return useContextSelector(SideMenuCTX, (ctx) => ctx.toggleNavigation);
}

export function useSetIsOpen() {
	return useContextSelector(SideMenuCTX, (ctx) => ctx.setIsOpen);
}

export function useIsOpen() {
	return useContextSelector(SideMenuCTX, (ctx) => ctx.isOpen);
}