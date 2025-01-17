import { useContextSelector } from "use-context-selector";
import { DeviceCTX } from ".";

export function useFetchDevices() {
	return useContextSelector(DeviceCTX, (ctx) => ctx.fetch);
}

export function useFindDeviceByID() {
	return useContextSelector(DeviceCTX, (ctx) => ctx.findByID);
}

export function useDevices() {
	return useContextSelector(DeviceCTX, (ctx) => ctx.devices);
}

export function useCreateDevices() {
	return useContextSelector(DeviceCTX, (ctx) => ctx.create);
}

export function useEraseDevice() {
	return useContextSelector(DeviceCTX, (ctx) => ctx.delete);
}

export function useUpdateDevice() {
	return useContextSelector(DeviceCTX, (ctx) => ctx.update);
}

export function useLinkWifi(){
	return useContextSelector(DeviceCTX, (ctx)=> ctx.linkWifi);
}

export function useLinkFirmware(){
	return useContextSelector(DeviceCTX, (ctx)=> ctx.linkFirmware);
}

export function useInitializeOta(){
	return useContextSelector(DeviceCTX, (ctx)=> ctx.initializeOta);
}

export function useLinkApiKey(){
	return useContextSelector(DeviceCTX, (ctx)=> ctx.linkApiKey);
}

export function useRemoveFireware(){
	return useContextSelector(DeviceCTX, (ctx)=> ctx.removeFirmware);
}

export function useForcedUpdate(){
	return useContextSelector(DeviceCTX, (ctx)=> ctx.forcedUpdate);
}