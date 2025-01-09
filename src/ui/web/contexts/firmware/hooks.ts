import { useContextSelector } from "use-context-selector";
import { FirmwareCTX } from ".";

export function useFetchFirmwares() {
	return useContextSelector(FirmwareCTX, (ctx) => ctx.fetch);
}

export function useFindFirmwareByID() {
	return useContextSelector(FirmwareCTX, (ctx) => ctx.findByID);
}

export function useFirmwares() {
	return useContextSelector(FirmwareCTX, (ctx) => ctx.firmwares);
}

export function useCreateFirmware() {
	return useContextSelector(FirmwareCTX, (ctx) => ctx.create);
}

export function useEraseFirmware() {
	return useContextSelector(FirmwareCTX, (ctx) => ctx.delete);
}

export function useUpdateFirmware() {
	return useContextSelector(FirmwareCTX, (ctx) => ctx.update);
}

export function useUploadFirmware() {
	return useContextSelector(FirmwareCTX, (ctx) => ctx.uploadFirmware);
}