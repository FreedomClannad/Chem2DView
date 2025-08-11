import { forwardRef } from "react";
// @ts-ignore
import { StandaloneStructServiceProvider } from "ketcher-standalone";
const newStructServiceProvider = new StandaloneStructServiceProvider();
import "ketcher-react/dist/index.css";
import type { KetcherEditHandle } from "@/handle/KetcherHandle.ts";
import { KetcherEdit } from "@";

import type { KetcherEditProps } from "@/ketcher-edit";

const KetcherStandaloneEdit = forwardRef<KetcherEditHandle, KetcherEditProps>((props, ref) => {
	const { structServiceProvider = newStructServiceProvider } = props;

	return <KetcherEdit ref={ref} structServiceProvider={structServiceProvider} />;
});

export { KetcherStandaloneEdit };
