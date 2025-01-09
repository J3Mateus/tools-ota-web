import Group from "@models/Group";
import Pagination from "@models/pagination";

abstract class GroupAdapter {
	abstract fetch(
		queryParams?: Record<string, unknown>
	): Promise<Pagination<Group>>;
	abstract findByID(groupID: string): Promise<Group>;
	abstract create(group: Group): Promise<boolean>;
	abstract delete(groupID: string): Promise<boolean>;
	abstract update(group: Group): Promise<boolean>;
	abstract linkDevice(groupID: string, deviceID: string): Promise<boolean>;
	abstract linkFirmware(groupID: string, firmwareID: string): Promise<boolean>;
	abstract linkWifi(groupID: string, wifiID: string): Promise<boolean>;
	abstract initializeOta(groupID: string): Promise<boolean>;
	abstract removeDeviceForGroup(groupID: string, deviceID: string): Promise<boolean>;
}

export default GroupAdapter;