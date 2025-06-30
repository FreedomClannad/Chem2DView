import { useRef } from "react";
import type { KetcherEditHandle } from "./ketcher-edit";

const useKetcherEditHook = () => {
	const KetcherRef = useRef<KetcherEditHandle>(null);
	return {
		KetcherRef
	};
};
export { useKetcherEditHook };
