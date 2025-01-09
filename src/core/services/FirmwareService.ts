import FirmwareAdapter from "@interfaces/adapters/FirmwareAdapter";
import FirmwareUseCase from "@interfaces/usecases/FirmwareUseCase";
import Firmware from "@models/Firmware";
import Pagination from "@models/pagination";

class FirmwareService implements FirmwareUseCase {
	constructor(protected readonly adapter: FirmwareAdapter) {}

	async fetch(): Promise<Pagination<Firmware>> {
		return this.adapter.fetch();
	}

	async findByID(firmwareID: string): Promise<Firmware> {
		return await this.adapter.findByID(firmwareID);
	}

	async create(firmware: Firmware): Promise<boolean> {
		return await this.adapter.create(firmware);
	}

	async delete(firmwareID: string): Promise<boolean> {
		return await this.adapter.delete(firmwareID);
	}

	async update(firmware: Firmware): Promise<boolean> {
		return await this.adapter.update(firmware);
	}

	async uploadFirmware(groupID: string, file: File): Promise<boolean> {
		return await this.adapter.uploadFirmware(groupID, file);
	}
}

export default FirmwareService;