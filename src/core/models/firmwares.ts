import { Firmware } from "./firmware";

export  interface Firmwares {
    limit: number;
    offset: number;
    count: number;
    next: any;
    previous: any;
    results: Firmware[];
  }
  