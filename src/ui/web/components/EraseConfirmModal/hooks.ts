import { useRef } from "react";
import { EraseConfirmModalHandlers } from ".";

export function useEraseConfirmModal() {
	return useRef({} as EraseConfirmModalHandlers);
}