import { useContextSelector } from "use-context-selector";
import { KeyCTX } from ".";

export function useFetchKeys() {
    return useContextSelector(KeyCTX, (ctx) => ctx.fetch);
}

export function useKeys() {
    return useContextSelector(KeyCTX, (ctx) => ctx.keys);
}

export function useCreateKey() {
    return useContextSelector(KeyCTX, (ctx) => ctx.create);
}

export function useFindKeyByID() {
    return useContextSelector(KeyCTX, (ctx) => ctx.findByID);
}

export function useUpdateKey() {
    return useContextSelector(KeyCTX, (ctx) => ctx.update);
}

export function useEraseKey() {
    return useContextSelector(KeyCTX, (ctx) => ctx.delete);
}
