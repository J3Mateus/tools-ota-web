import { useContextSelector } from "use-context-selector";
import { GroupCTX } from ".";

export function useFetchGroups() {
	return useContextSelector(GroupCTX, (ctx) => ctx.fetch);
}

export function useFindGroupByID() {
	return useContextSelector(GroupCTX, (ctx) => ctx.findByID);
}

export function useGroups() {
	return useContextSelector(GroupCTX, (ctx) => ctx.groups);
}

export function useCreateGroup() {
	return useContextSelector(GroupCTX, (ctx) => ctx.create);
}

export function useEraseGroup() {
	return useContextSelector(GroupCTX, (ctx) => ctx.delete);
}

export function useUpdateGroup() {
	return useContextSelector(GroupCTX, (ctx) => ctx.update);
}

export function useLinkDevice() {
	return useContextSelector(GroupCTX, (ctx) => ctx.linkDevice);
}

export function useLinkWifi(){
	return useContextSelector(GroupCTX, (ctx)=> ctx.linkWifi);
}

export function useLinkFirmware(){
	return useContextSelector(GroupCTX, (ctx)=> ctx.linkFirmware);
}

export function useInitializeOta(){
	return useContextSelector(GroupCTX, (ctx)=> ctx.initializeOta);
}

export function useRemoveDeviceForGroup(){
	return useContextSelector(GroupCTX, (ctx)=> ctx.removeDeviceForGroup);
}