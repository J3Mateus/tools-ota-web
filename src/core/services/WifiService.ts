import WifiAdapter from "@interfaces/adapters/WifiAdapter";
import WifiUseCase from "@interfaces/usecases/WifiUseCase";
import Wifi from "@models/Wifi";
import Pagination from "@models/pagination";

class WifiService implements WifiUseCase {
	constructor(protected readonly adapter: WifiAdapter) {}

	async fetch(): Promise<Pagination<Wifi>> {
		return this.adapter.fetch();
	}

	async findByID(wifiID: string): Promise<Wifi> {
		return await this.adapter.findByID(wifiID);
	}

	async create(wifi: Wifi): Promise<boolean> {
		return await this.adapter.create(wifi);
	}

	async delete(wifiID: string): Promise<boolean> {
		return await this.adapter.delete(wifiID);
	}

	async update(wifi: Wifi): Promise<boolean> {
		return await this.adapter.update(wifi);
	}
}

export default WifiService;