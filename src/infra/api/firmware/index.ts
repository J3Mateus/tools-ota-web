import FirmwareAdapter from "@interfaces/adapters/FirmwareAdapter";
import Pagination from "@models/pagination";
import Firmware from "@models/Firmware";
import BaseAPI from "..";

class FirmwareAPI extends BaseAPI implements FirmwareAdapter {
	async fetch(): Promise<Pagination<Firmware>> {
		const response = await this.client.get("/firmware/get/");
		return Pagination.fromJSON<Firmware>(response.data, Firmware.fromJSON);
	}

	async create(firmware: Firmware): Promise<boolean> {
		await this.client.post("/firmware/create/", firmware.toJSON());
		return true;
	}

	async delete(firmwareID: string): Promise<boolean> {
		await this.client.delete(`/firmware/delete/${firmwareID}/`);
		return true;
	}

	async update(firmware: Firmware): Promise<boolean> {
		await this.client.patch(`/firmware/update/${firmware.uuid}/`, firmware.toJSON());
		return true;
	}

	async findByID(firmwareID: string): Promise<Firmware> {
		const response = await this.client.get(`/firmware/get/${firmwareID}/`);
		return Firmware.fromJSON(response.data);
	}

	async uploadFirmware(firmwareID: string, file: File): Promise<boolean> {
		const formData = new FormData();
		formData.append("file", file);

		await this.client.post(`/firmware/create/file/${firmwareID}`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return true;
	}
}

export default FirmwareAPI;