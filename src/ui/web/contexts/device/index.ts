import Device from "@models/Device";
import Pagination from "@models/pagination";
import { createContext } from "use-context-selector";

interface Props {
	fetch(queryParams?: Record<string, unknown>): Promise<void>;
	devices?: Pagination<Device>;
	findByID(deviceID: string): Promise<Device | undefined>;
	create(device: Device): Promise<boolean>;
	delete(deviceID: string): Promise<boolean>;
	update(device: Device): Promise<boolean>;
	linkWifi(deviceID: string, wifiID: string): Promise<boolean>;
	linkFirmware(deviceID: string, firewallID: string): Promise<boolean>;
	initializeOta(deviceID: string): Promise<boolean>;
}

export const DeviceCTX = createContext({} as Props);