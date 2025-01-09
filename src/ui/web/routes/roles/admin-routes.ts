
import { NavigationBranch } from "../types";
import Home from "@web/pages/Home";

import ListGroups from "@web/pages/admin/group/list";
import CreateOrEditGroupPage from "@web/pages/admin/group/create-or-edit";

import ListWifis from "@web/pages/admin/wifi/list";
import CreateOrEditWifiPage from "@web/pages/admin/wifi/create-or-edit";

import ListDevices from "@web/pages/admin/device/list";

import ListFirmwares from "@web/pages/admin/firmware/list";
import CreateOrEditFirmwarePage from "@web/pages/admin/firmware/create-or-edit";

import GroupDetailPage from "@web/pages/admin/group/link-all-resource";

import ListKeys from "@web/pages/admin/key/list";
import CreateOrEditKeyPage from "@web/pages/admin/key/create-or-edit";

import DeviceDetailPage from "@web/pages/admin/device/link-all-resource";

import { AiOutlineUnorderedList, AiTwotoneAlert } from "react-icons/ai";
import { BsDeviceSsd } from "react-icons/bs";
import { IoMdHome } from "react-icons/io";
import { MdOutlineWifiFind } from "react-icons/md";
import { GrCloudSoftware } from "react-icons/gr";
import { AiOutlineGroup } from "react-icons/ai";
import { FaKey } from "react-icons/fa";



export const routes: NavigationBranch = {
	redirectPath: "/admin/inicio",
	groups: [
		{
			name: "",
			routes: [
				{
					name: "Inicio ",
					path: "/admin/inicio",
					icon: IoMdHome({ size: 22 }),
					page: Home,
				},
				{
					name: "Listar todos os grupos",
					path: "/admin/listar-grupos",
					icon: AiOutlineGroup({ size: 22 }),
					page: ListGroups,
				},
				{
					name: "Criar grupo",
					path: "/admin/criar-grupo",
					page: CreateOrEditGroupPage,
					hidden: true,
				},
				{
					name: "Editar grupo",
					path: "/admin/editar-grupo/:groupId",
					icon: AiTwotoneAlert({ size: 22 }),
                    page: CreateOrEditGroupPage,
					hidden: true,
				},
				{
					name: "Listar todos os dispositivos",
					path: "/admin/listar-dispositivos",
					icon: BsDeviceSsd({ size: 22 }),
					page: ListDevices,
				},
				{
					name: "Listar todos os firmwares",
					path: "/admin/listar-firmware",
					icon: GrCloudSoftware({ size: 22}),
					page: ListFirmwares,
				},
				{
					name: "Criar Firmware",
					path: "/admin/criar-firmware",
					icon: AiOutlineUnorderedList({ size: 22 }),
					page: CreateOrEditFirmwarePage,
					hidden: true,
				},
				{
					name: "Editar firmware",
					path: "/admin/editar-firmware/:firmwareId",
					hidden: true,
					page: CreateOrEditFirmwarePage,
				},
				{
					name: "Listar todos os wifis ",
					path: "/admin/listar-wifis",
					icon: MdOutlineWifiFind({ size: 22 }),
					page: ListWifis,
				},
				{
					name: "Criar wifi",
					path: "/admin/criar-wifi",
					icon: AiOutlineUnorderedList({ size: 22 }),
                    page: CreateOrEditWifiPage,
					hidden: true,
				},
				{
					name: "Editar wifi",
					path: "/admin/editar-wifi/:wifiId",
					page: CreateOrEditWifiPage,
					hidden: true,
				},
				{
					name:"Vincular recursos",
					path:"/admin/vincular-recursos/:groupId",
					page: GroupDetailPage,
					hidden:true,
				},
				{
					name:"Listar Keys",
					path: "/admin/listar-keys",
					page: ListKeys,
					icon: FaKey({ size: 22 }),
				},
				{
					name:"Criar api key",
					path: "/admin/criar-key",
					page: CreateOrEditKeyPage ,
					hidden: true,
				},
				{
					name:"Editar api key",
					path: "/admin/editar-key/:keyId",
					page: CreateOrEditKeyPage ,
					hidden: true,
				},
				{
					name: "Vincular recursos dispostivo",
					path:"/admin/vincular-recursos/:deviceId/dispositivo",
					page: DeviceDetailPage
				}
			],
		},
	],
};