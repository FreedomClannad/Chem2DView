import type { Ketcher } from "ketcher-core";
import type { MolfileFormat } from "ketcher-core/dist/domain/serializers";

export type KetcherEditHandle = {
	ketcher: Ketcher | undefined;
	setMoleculeRender: (mol: string) => void;
	setMolecule: (structure: string) => void;
	getMolecule: () => Promise<string | undefined>;
	getSmiles: () => Promise<string | undefined>;
	getSdf: (molfileFormat?: MolfileFormat) => Promise<string | undefined>;
	clear: () => void;
};
