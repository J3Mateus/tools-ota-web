import { useContextSelector } from "use-context-selector";
import { WifiCTX } from ".";

export function useFetchWifis() {
	return useContextSelector(WifiCTX, (ctx) => ctx.fetch);
}

export function useFindWifiByID() {
	return useContextSelector(WifiCTX, (ctx) => ctx.findByID);
}

export function useWifis() {
	return useContextSelector(WifiCTX, (ctx) => ctx.wifis);
}

export function useCreateWifi() {
	return useContextSelector(WifiCTX, (ctx) => ctx.create);
}

export function useEraseWifi() {
	return useContextSelector(WifiCTX, (ctx) => ctx.delete);
}

export function useUpdateWifi() {
	return useContextSelector(WifiCTX, (ctx) => ctx.update);
}