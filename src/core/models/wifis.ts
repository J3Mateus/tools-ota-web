import { Wifi } from "./wifi";

export  interface Wifis {
    limit: number;
    offset: number;
    count: number;
    next: any;
    previous: any;
    results: Wifi[];
  }
  