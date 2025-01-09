import Device from "@models/Device";
import Pagination from "@models/pagination";

abstract class DeviceUseCase {
	abstract fetch(
		queryParams?: Record<string, unknown>
	): Promise<Pagination<Device>>;
	abstract findByID(deviceID: string): Promise<Device>;
	abstract create(device: Device): Promise<boolean>;
	abstract delete(deviceID: string): Promise<boolean>;
	abstract update(device: Device): Promise<boolean>;
	abstract linkFirmware(groupID: string, firmwareID: string): Promise<boolean>;
	abstract linkWifi(groupID: string, wifiID: string): Promise<boolean>;
	abstract initializeOta(deviceID: string): Promise<boolean>;
}

export default DeviceUseCase;