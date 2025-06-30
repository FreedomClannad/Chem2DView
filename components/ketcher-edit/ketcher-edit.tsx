import type { ButtonsConfig } from "ketcher-react";
import type { Ketcher, LogSettings, StructServiceProvider } from "ketcher-core";
import { Editor } from "ketcher-react";
import { RemoteStructServiceProvider } from "ketcher-core";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import type { MolfileFormat } from "ketcher-core/dist/domain/serializers";
const newStructServiceProvider = new RemoteStructServiceProvider("/v2");
import "ketcher-react/dist/index.css";
export type KetcherEditHandle = {
	ketcher: Ketcher | undefined;
	setMoleculeRender: (mol: string) => void;
	setMolecule: (structure: string) => void;
	getMolecule: () => Promise<string | undefined>;
	getSmiles: () => Promise<string | undefined>;
	getSdf: (molfileFormat?: MolfileFormat) => Promise<string | undefined>;
	clear: () => void;
};
type Props = {
	staticResourcesUrl?: string;
	structServiceProvider?: StructServiceProvider;
	buttons?: ButtonsConfig;
	onChangeSmiles?: (smiles: string) => void;
	onLoad?: () => void;
};
const KetcherEdit = forwardRef<KetcherEditHandle, Props>((props, ref) => {
	const { buttons, structServiceProvider = newStructServiceProvider, staticResourcesUrl = "./", onChangeSmiles, onLoad } = props;
	const [ketcher, setKetcher] = useState<Ketcher | undefined>();
	useEffect(() => {
		if (ketcher) onLoad?.();
	}, [ketcher]);

	// 获取mol
	const getMolecule = async () => {
		return ketcher?.getMolfile().then(molData => {
			return molData;
		});
	};

	// 获取SMILES
	const getSmiles = async () => {
		return ketcher?.getSmiles().then(smiles => {
			return smiles;
		});
	};

	// 获取SDF
	const getSdf = async (molfileFormat?: MolfileFormat) => {
		return ketcher?.getSdf(molfileFormat).then(sdf => {
			return sdf;
		});
	};

	// 画板清除
	const clear = () => {
		ketcher?.editor.clear();
	};

	// 设置mol
	const setMoleculeRender = (mol: string) => {
		if (mol) ketcher?.setMolecule(mol);
		else clear();
	};

	const setMolecule = (structure: string) => {
		ketcher?.setMolecule(structure);
	};

	useEffect(() => {
		// 新版加了日志, 源码是调用window上属性，为了防止和Kethcer的Editer的Window冲突，所以这里针对window的ketcher进行判断
		if (!("ketcher" in window && window.ketcher !== undefined)) {
			const logging: LogSettings = { enabled: false, showTrace: false, level: 0 };

			(window as any).ketcher = { logging };
		}
	}, []);

	// 往外抛出相应的方法
	useImperativeHandle(ref, () => ({
		ketcher,
		setMoleculeRender,
		setMolecule,
		getMolecule,
		getSmiles,
		getSdf,
		clear
	}));

	return (
		<Editor
			buttons={buttons}
			staticResourcesUrl={staticResourcesUrl}
			structServiceProvider={structServiceProvider}
			errorHandler={message => {
				console.log(message.toString());
			}}
			onInit={ketcherObj => {
				(global as any).ketcher1 = ketcherObj;
				(window as any).ketcher1 = ketcherObj;
				setKetcher(ketcherObj);
				ketcherObj.editor.subscribe("change", () => {
					ketcherObj.getSmiles(true).then(smiles_data => {
						let smiles = null;
						// 这里是判断超原子的问题
						const index = smiles_data.indexOf("|");
						if (index !== -1) smiles = smiles_data.substring(0, index);
						else smiles = smiles_data;

						onChangeSmiles?.(smiles);
					});
				});
			}}
		/>
	);
});

export { KetcherEdit };
