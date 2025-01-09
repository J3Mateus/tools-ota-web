import { NotificationInstance } from "antd/es/notification/interface";
import { createContext } from "use-context-selector";

interface Props {
	notification: NotificationInstance;
}

export const NotificationCTX = createContext({} as Props);