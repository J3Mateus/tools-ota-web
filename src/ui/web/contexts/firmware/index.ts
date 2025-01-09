import Firmware from "@models/Firmware";
import Pagination from "@models/pagination";
import { createContext } from "use-context-selector";

interface Props {
	fetch(queryParams?: Record<string, unknown>): Promise<void>;
	firmwares?: Pagination<Firmware>;
	findByID(firmwareID: string): Promise<Firmware | undefined>;
	create(firmware: Firmware): Promise<boolean>;
	delete(firmwareID: string): Promise<boolean>;
	update(firmware: Firmware): Promise<boolean>;
	uploadFirmware(firmwareID: string, file: File): Promise<boolean>;
}

export const FirmwareCTX = createContext({} as Props);