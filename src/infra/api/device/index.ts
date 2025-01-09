import DeviceAdapter from "@interfaces/adapters/DeviceAdapter";
import Pagination from "@models/pagination";
import Device from "@models/Device";
import BaseAPI from "..";

class DeviceAPI extends BaseAPI implements DeviceAdapter {
	async fetch(): Promise<Pagination<Device>> {
		const response = await this.client.get("/device/get/");
		return Pagination.fromJSON<Device>(response.data, Device.fromJSON);
	}

	async create(device: Device): Promise<boolean> {
		await this.client.post("/device/create/", device.toJSON());
		return true;
	}

	async delete(deviceID: string): Promise<boolean> {
		await this.client.delete(`/device/delete/${deviceID}/`);
		return true;
	}

	async update(device: Device): Promise<boolean> {
		await this.client.patch(`/device/update/${device.uuid}`, device.toJSON());
		return true;
	}

	async findByID(deviceID: string): Promise<Device> {
		const response = await this.client.get(`/device/get/${deviceID}/`);
		return Device.fromJSON(response.data);
	}

	async linkFirmware(deviceID: string, firmwareID: string): Promise<boolean> {
		const data = {
			device_id: deviceID,
			firmware_id: firmwareID,
		}
		await this.client.post(`/device/create/add-firmware/`, data);
		return true;
	}

	async linkWifi(deviceID: string, wifiID: string): Promise<boolean> {
		const data = {
			device_id: deviceID,
			wifi_id: wifiID,
		}
		await this.client.post(`/device/create/add-wifi/`, data);
		return true;
	}

	async initializeOta(deviceID: string): Promise<boolean> {
		await this.client.post(`/device/create/initialize-ota/${deviceID}/`);
		return true;
	}

}

export default DeviceAPI;