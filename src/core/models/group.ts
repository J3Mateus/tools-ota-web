import { Device } from "./device";
import { Firmware } from "./firmware";
import { Wifi } from "./wifi";


export  interface Group {
    uuid: string;
    name: string;
    active: boolean;
    is_deleted: boolean;
    firmware?: Firmware;
    wifi?: Wifi;
    device: Device[];
  }