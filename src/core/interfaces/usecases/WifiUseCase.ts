import Wifi from "@models/Wifi";
import Pagination from "@models/pagination";

abstract class WifiUseCase {
	abstract fetch(
		queryParams?: Record<string, unknown>
	): Promise<Pagination<Wifi>>;
	abstract findByID(wifiID: string): Promise<Wifi>;
	abstract create(wifi: Wifi): Promise<boolean>;
	abstract delete(wifiID: string): Promise<boolean>;
	abstract update(wifi: Wifi): Promise<boolean>;
}

export default WifiUseCase;