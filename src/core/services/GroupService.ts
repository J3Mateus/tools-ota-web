import GroupAdapter from "@interfaces/adapters/GroupAdapter";
import GroupUseCase from "@interfaces/usecases/GroupUseCase";
import Group from "@models/Group";
import Pagination from "@models/pagination";

class GroupService implements GroupUseCase {
	constructor(protected readonly adapter: GroupAdapter) {}

	async fetch(): Promise<Pagination<Group>> {
		return this.adapter.fetch();
	}

	async findByID(groupID: string): Promise<Group> {
		return await this.adapter.findByID(groupID);
	}

	async create(group: Group): Promise<boolean> {
		return await this.adapter.create(group);
	}

	async delete(groupID: string): Promise<boolean> {
		return await this.adapter.delete(groupID);
	}

	async update(group: Group): Promise<boolean> {
		return await this.adapter.update(group);
	}

	async linkDevice(groupID: string, deviceID: string): Promise<boolean> {
		return await this.adapter.linkDevice(groupID, deviceID);
	}

	async linkFirmware(groupID: string, firmwareID: string): Promise<boolean> {
		return await this.adapter.linkFirmware(groupID, firmwareID);
	}

	async linkWifi(groupID: string, wifiID: string): Promise<boolean> {
		return await this.adapter.linkWifi(groupID, wifiID);
	}

	async initializeOta(groupID: string): Promise<boolean> {
		return await this.adapter.initializeOta(groupID);
	}

	async removeDeviceForGroup(groupID: string, deviceID: string): Promise<boolean> {
		return await this.adapter.removeDeviceForGroup(groupID, deviceID);
	}

	async linkApiKey(groupID: string, apiKeyID: string): Promise<boolean> {
		return await this.adapter.linkApiKey(groupID, apiKeyID);
	}
}

export default GroupService;