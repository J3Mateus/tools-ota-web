import AuthAPI from "@api/auth";
import DeviceAPI from "@api/device";
import FirmwareAPI from "@api/firmware";
import GroupAPI from "@api/group";
import WifiAPI from "@api/wifi";
import UsersAPI from "@api/users";
import KeyAPI from "@api/key";

import AuthService from "@services/AuthService";
import CacheService from "@services/CacheService";
import DeviceService from "@services/DeviceService";
import FirmwareService from "@services/FirmwareService";
import GroupService from "@services/GroupService";
import WifiService from "@services/WifiService";
import UsersService from "@services/UsersService";
import KeyService from "@services/KeyService";

class ViteDIContainer {
	static getCacheUsecase() {
		return new CacheService();
	}

	static getAuthUseCase() {
		return new AuthService(
			new AuthAPI(),
			ViteDIContainer.getCacheUsecase()
		);
	}

	static getUsersUseCase() {
		return new UsersService(new UsersAPI());
	}

	static getDeviceUseCase() {
		return new DeviceService(new DeviceAPI());
	}

	static getGroupUseCase() {
		return new GroupService(new GroupAPI());
	}

	static getWifiUseCase() {
		return new WifiService(new WifiAPI());
	}

	static getFirmwareUseCase() {
		return new FirmwareService(new FirmwareAPI());
	}

	static getKeyUseCase() {
		return new KeyService(new KeyAPI());
	}
}

export { ViteDIContainer };