import GroupAdapter from "@interfaces/adapters/GroupAdapter";
import Pagination from "@models/pagination";
import Group from "@models/Group";
import BaseAPI from "..";

class GroupAPI extends BaseAPI implements GroupAdapter {

	async fetch(): Promise<Pagination<Group>> {
		const response = await this.client.get("/group/get/");
		return Pagination.fromJSON<Group>(response.data, Group.fromJSON);
	}

	async create(group: Group): Promise<boolean> {
		await this.client.post("/group/create/", group.toJSON());
		return true;
	}

	async delete(groupID: string): Promise<boolean> {
		await this.client.delete(`/group/delete/${groupID}/`);
		return true;
	}

	async update(group: Group): Promise<boolean> {
		await this.client.patch(`/group/update/${group.uuid}/`, group.toJSON());
		return true;
	}

	async findByID(groupID: string): Promise<Group> {
		const response = await this.client.get(`/group/get/${groupID}/`);
		return Group.fromJSON(response.data);
	}

	async linkDevice(groupID: string, deviceID: string): Promise<boolean> {
		const data = {
			group_id: groupID,
			device_id: deviceID,
		}
		await this.client.post(`/group/create/add-device/`, data);
		return true;
	}

	async linkFirmware(groupID: string, firmwareID: string): Promise<boolean> {
		const data = {
			group_id: groupID,
			firmware_id: firmwareID,
		}
		await this.client.post(`/group/create/add-firmware/`, data);
		return true;
	}

	async linkWifi(groupID: string, wifiID: string): Promise<boolean> {
		const data = {
			group_id: groupID,
			wifi_id: wifiID,
		}
		await this.client.post(`/group/create/add-wifi/`, data);
		return true;
	}

	async initializeOta(groupID: string): Promise<boolean> {
		await this.client.post(`/group/create/initialize-ota/${groupID}/`);
		return true;
	}

	async removeDeviceForGroup(groupID: string, deviceID: string): Promise<boolean> {

		await this.client.delete(`/group/delete/remove-device/${groupID}/${deviceID}/`);
		return true;
	}

	async linkApiKey(groupID: string, apiKeyID: string): Promise<boolean> {
		await this.client.post(`/group/create/link-api-key/${groupID}/${apiKeyID}/`);
		return true;
	}

}

export default GroupAPI;