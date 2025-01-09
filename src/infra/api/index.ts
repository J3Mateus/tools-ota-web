import { AxiosInstance } from "axios";
import { BackendClient } from "./clients";

abstract class BaseAPI {
	constructor(private _client: AxiosInstance = BackendClient) {}

	get client() {
		return this._client;
	}
}

export default BaseAPI;