import Wifi from "@models/Wifi";
import Pagination from "@models/pagination";
import { createContext } from "use-context-selector";

interface Props {
	fetch(queryParams?: Record<string, unknown>): Promise<void>;
	wifis?: Pagination<Wifi>;
	findByID(wifiID: string): Promise<Wifi | undefined>;
	create(wifi: Wifi): Promise<boolean>;
	delete(wifiID: string): Promise<boolean>;
	update(wifi: Wifi): Promise<boolean>;
}

export const WifiCTX = createContext({} as Props);