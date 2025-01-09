import WifiAdapter from "@interfaces/adapters/WifiAdapter";
import Pagination from "@models/pagination";
import Wifi from "@models/Wifi";
import BaseAPI from "..";

class WifiAPI extends BaseAPI implements WifiAdapter {
	async fetch(): Promise<Pagination<Wifi>> {
		const response = await this.client.get("/wifi/get/");
		return Pagination.fromJSON<Wifi>(response.data, Wifi.fromJSON);
	}

	async create(wifi: Wifi): Promise<boolean> {
		await this.client.post("/wifi/create/", wifi.toJSON());
		return true;
	}

	async delete(wifiID: string): Promise<boolean> {
		await this.client.delete(`/wifi/delete/${wifiID}/`);
		return true;
	}

	async update(wifi: Wifi): Promise<boolean> {
		await this.client.patch(`/wifi/update/${wifi.uuid}`, wifi.toJSON());
		return true;
	}

	async findByID(wifiID: string): Promise<Wifi> {
		const response = await this.client.get(`/wifi/get/${wifiID}`);
		return Wifi.fromJSON(response.data);
	}
}

export default WifiAPI;