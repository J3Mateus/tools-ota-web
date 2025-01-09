import Firmware from "@models/Firmware";
import Pagination from "@models/pagination";

abstract class FirmwareUseCase {
	abstract fetch(
		queryParams?: Record<string, unknown>
	): Promise<Pagination<Firmware>>;
	abstract findByID(firmwareID: string): Promise<Firmware>;
	abstract create(firmware: Firmware): Promise<boolean>;
	abstract delete(firmwareID: string): Promise<boolean>;
	abstract update(firmware: Firmware): Promise<boolean>;
	abstract uploadFirmware(firmwareID: string, file: File): Promise<boolean>;
}

export default FirmwareUseCase;