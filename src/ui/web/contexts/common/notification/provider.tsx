import { PropsWithChildren } from "react";
import { NotificationCTX } from ".";
import { notification } from "antd";

function NotificationProvider({ children }: PropsWithChildren) {
	const [api, contextHolder] = notification.useNotification({
		placement: "topRight",
	});

	return (
		<NotificationCTX.Provider value={{ notification: api }}>
			{contextHolder}
			{children}
		</NotificationCTX.Provider>
	);
}

export default NotificationProvider;