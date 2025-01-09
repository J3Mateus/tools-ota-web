import { useContextSelector } from "use-context-selector";
import { AuthCTX } from ".";

export function useAccount() {
    return useContextSelector(AuthCTX, (ctx) => ctx.account);
}

export function usePanic() {
    return useContextSelector(AuthCTX, (ctx) => ctx.panic);
}

export function useLogin() {
    return useContextSelector(AuthCTX, (ctx) => ctx.login);
}

export function useLogout() {
    return useContextSelector(AuthCTX, (ctx) => ctx.logout);
}