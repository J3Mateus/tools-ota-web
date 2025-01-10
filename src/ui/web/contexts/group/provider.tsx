import { PropsWithChildren, useCallback, useState } from "react";
import { GroupCTX } from ".";
import GroupUseCase from "@interfaces/usecases/GroupUseCase";
import Pagination from "@models/pagination";
import Group from "@models/Group";
import { usePanic } from "../auth/hooks";

interface Props {
	usecase: GroupUseCase;
}

function GroupProvider({ usecase, children }: PropsWithChildren<Props>) {
	const [groups, setGroups] = useState<Pagination<Group>>();
	const panic = usePanic();

	const fetch = useCallback(async (queryParams?: Record<string, unknown>) => {
		setGroups(undefined);
		return usecase
			.fetch(queryParams)
			.then(setGroups)
			.catch((err) => {
				panic(err);
			});
	}, []);

	const findByID = useCallback((groupID: string) => {
		return usecase
			.findByID(groupID)
			.then((response) => response)
			.catch((err) => {
				panic(err);
				return undefined;
			});
	}, []);

	const create = useCallback(async (group: Group) => {
		let isCreated = false;
		try {
			isCreated = await usecase.create(group);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isCreated;
	}, []);

	const erase = useCallback(async (groupID: string) => {
		let isDeleted = false;
		try {
			isDeleted = await usecase.delete(groupID);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isDeleted;
	}, []);

	const update = useCallback(async (group: Group) => {
		let isUpdated = false;
		try {
			isUpdated = await usecase.update(group);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isUpdated;
	}, []);

	const linkDevice = useCallback(async (groupID: string, deviceID: string) => {
		let isLinked = false;
		try {
			isLinked = await usecase.linkDevice(groupID, deviceID);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isLinked;
	},[]);

	const linkWifi = useCallback(async (groupID: string, wifiID: string) => {
		let isLinked = false;
		try {
			isLinked = await usecase.linkWifi(groupID, wifiID);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isLinked;
	},[]);

	const linkFirmware = useCallback(async (groupID: string, firmwareID: string) => {
		let isLinked = false;
		try {
			isLinked = await usecase.linkFirmware(groupID, firmwareID);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isLinked;
	},[]);

	const initializeOta = useCallback(async (groupID: string) => {
		let isInitialized = false;
		try {
			isInitialized = await usecase.initializeOta(groupID);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isInitialized;
	},[]);

	const removeDeviceForGroup = useCallback(async (groupID: string, deviceID: string) => {
		let isRemoved = false;
		try {
			isRemoved = await usecase.removeDeviceForGroup(groupID, deviceID);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isRemoved;
	},[]);

	const linkApiKey = useCallback( async (groupID: string, apiKeyID: string)=>{
		let isLinked = false;
		try {
			isLinked = await usecase.linkApiKey(groupID, apiKeyID);
		} catch (err) {
			panic(err);
		}
		return isLinked;
	},[])

	return (
		<GroupCTX.Provider
			value={{
				fetch,
				groups,
				findByID,
				create,
				delete: erase,
				update,
				linkDevice,
				linkWifi,
				linkFirmware,
				initializeOta,
				removeDeviceForGroup,
				linkApiKey
			}}
		>
			{children}
		</GroupCTX.Provider>
	);
}

export default GroupProvider;