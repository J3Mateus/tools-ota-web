import { Device } from "./device";

export  interface Devices {
    limit: number;
    offset: number;
    count: number;
    next: any;
    previous: any;
    results: Device[];
  }
  