import { useContextSelector } from "use-context-selector";
import { NotificationCTX } from ".";

export function useNotification() {
	return useContextSelector(NotificationCTX, (ctx) => ctx.notification);
}