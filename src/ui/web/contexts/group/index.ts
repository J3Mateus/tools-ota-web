import Group from "@models/Group";
import Pagination from "@models/pagination";
import { createContext } from "use-context-selector";

interface Props {
	fetch(queryParams?: Record<string, unknown>): Promise<void>;
	groups?: Pagination<Group>;
	findByID(groupID: string): Promise<Group | undefined>;
	create(group: Group): Promise<boolean>;
	delete(groupID: string): Promise<boolean>;
	update(group: Group): Promise<boolean>;
	linkDevice(groupID: string, deviceID: string): Promise<boolean>;
	linkWifi(groupID: string, wifiID: string): Promise<boolean>;
	linkFirmware(groupID: string, firewallID: string): Promise<boolean>;
	linkApiKey(groupID: string, apiKeyID: string): Promise<boolean>;
	initializeOta(groupID: string): Promise<boolean>;
	removeDeviceForGroup(groupID: string, deviceID: string): Promise<boolean>;
}

export const GroupCTX = createContext({} as Props);