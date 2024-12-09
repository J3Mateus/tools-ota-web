import { Group } from "./group";

export  interface Groups {
    limit: number;
    offset: number;
    count: number;
    next: any;
    previous: any;
    results: Group[];
  }
  