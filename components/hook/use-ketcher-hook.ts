import { useRef } from "react";
import type { KetcherEditHandle } from "@/handle/KetcherHandle";

const useKetcherEditHook = () => {
	const KetcherRef = useRef<KetcherEditHandle>(null);
	return {
		KetcherRef
	};
};
export { useKetcherEditHook };
