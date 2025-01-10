import DeviceAdapter from "@interfaces/adapters/DeviceAdapter";
import DeviceUseCase from "@interfaces/usecases/DeviceUseCase";
import Device from "@models/Device";
import Pagination from "@models/pagination";

class DeviceService implements DeviceUseCase {
	constructor(protected readonly adapter: DeviceAdapter) {}

	async fetch(): Promise<Pagination<Device>> {
		return this.adapter.fetch();
	}

	async findByID(deviceID: string): Promise<Device> {
		return await this.adapter.findByID(deviceID);
	}

	async create(device: Device): Promise<boolean> {
		return await this.adapter.create(device);
	}

	async delete(deviceID: string): Promise<boolean> {
		return await this.adapter.delete(deviceID);
	}

	async update(device: Device): Promise<boolean> {
		return await this.adapter.update(device);
	}

	async initializeOta(deviceID: string): Promise<boolean> {
		return await this.adapter.initializeOta(deviceID);
	}

	async linkFirmware(deviceID: string, firmwareID: string): Promise<boolean> {
		return await this.adapter.linkFirmware(deviceID, firmwareID);
	}

	async linkWifi(deviceID: string, wifiID: string): Promise<boolean> {
		return await this.adapter.linkWifi(deviceID, wifiID);
	}

	async linkApiKey(deviceID: string, apiKeyID: string): Promise<boolean> {
		return await this.adapter.linkApiKey(deviceID, apiKeyID);
	}

}

export default DeviceService;