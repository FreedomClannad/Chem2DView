import { MolSerializer } from "ketcher-core";
import type { LogSettings } from "ketcher-core";
import { useEffect, useRef, memo, useState, useMemo } from "react";
import type { ReactNode, CSSProperties, MouseEvent } from "react";
import type { HighlightMol } from "@/utils";
import { v4 as uuid4 } from "uuid";
import { Spinner } from "@/loading";
import "./styles.css";
import { ZoomInOutlined } from "@ant-design/icons";
import Image from "rc-image";
import "rc-image/assets/index.css";
import { SvgTransformUrl, RenderStruct } from "@/utils";
import { defaultIcons } from "./common";
import cn from "classnames";
import type { ImagePreviewType } from "rc-image/lib/Image";

export type ImagePlacement = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

export type PlacementPosition = {
	top?: number;
	bottom?: number;
	left?: number;
	right?: number;
};

export type PreviewButtonType = {
	icon?: ReactNode;
	className?: string;
	style?: CSSProperties;
	placement?: ImagePlacement | PlacementPosition;
};

export type LoadingType = {
	icon?: ReactNode;
	className?: string;
	style?: CSSProperties;
};

// 编写JSDoc
/**
 * @description 生成SVG图片
 * @typedef {Object} MolSVGProps
 * @param {string} [mol] - molecule string
 * @param {CSSProperties} [style] - style
 * @param {string} [rootClass] - root class
 * @param {string} [boxClass] - box class
 * @param {string} [id] - id
 * @param {number} [width] - width
 * @param {number} [height] - height
 * */
export type MolIMGProps = {
	mol: string;
	style?: CSSProperties;
	rootClassName?: string;
	boxClassName?: string;
	id?: string;
	width?: number;
	height?: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	options?: any;
	highlight?: HighlightMol;
	error?: ReactNode;
	preview?: boolean | ImagePreviewType;
	previewButton?: PreviewButtonType;
	loadingOptions?: LoadingType;
};

const Error = () => {
	return <div className="error-container">Error</div>;
};

// 编写JSDoc
/**
 * @component
 * @description 生成SVG图片
 * @param {MolSVGProps} props - Props
 * @returns {ReactNode} SVG图片
 * */
const Chem2DIMG = memo((props: MolIMGProps) => {
	const {
		id = uuid4(),
		mol,
		style,
		rootClassName = "",
		boxClassName = "",
		width = 400,
		height = 400,
		options,
		highlight,
		error = <Error />,
		preview = true,
		previewButton = {
			placement: "topRight"
		},
		loadingOptions
	} = props;
	const moleculeRef = useRef<HTMLDivElement>(null);

	const [errorState, setErrorState] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [previewSrc, setPreviewSrc] = useState<string>("");
	const [previewVisible, setPreviewVisible] = useState<boolean>(false);

	const { minScale, maxScale } = typeof preview === "object" ? preview : { minScale: 1, maxScale: 50 };

	const previewBut: PreviewButtonType = useMemo(() => {
		return {
			previewIcon: <ZoomInOutlined />,
			style: { fontSize: "1rem" },
			...previewButton
		};
	}, [previewButton]);

	const loadingOpt = useMemo(() => {
		return {
			icon: <Spinner />,
			...loadingOptions
		};
	}, [loadingOptions]);

	const placementPosition = useMemo(() => {
		if (previewButton.placement === "topLeft") return { top: 10, left: 10 };
		else if (previewButton.placement === "topRight") return { top: 10, right: 10 };
		else if (previewButton.placement === "bottomLeft") return { bottom: 10, left: 10 };
		else if (previewButton.placement === "bottomRight") return { bottom: 10, right: 10 };
		else if (typeof previewButton.placement === "object") return previewButton.placement;
		else return { top: 10, right: 10 };
	}, [previewButton]);

	useEffect(() => {
		// 新版加了日志, 源码是调用window上属性，为了防止和Kethcer的Editer的Window冲突，所以这里针对window的ketcher进行判断
		if (!("ketcher" in window && window.ketcher !== undefined)) {
			const logging: LogSettings = { enabled: false, showTrace: false, level: 0 };
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(window as any).ketcher = { logging };
		}
	}, []);

	useEffect(() => {
		setErrorState(false);
		renderSVG();
	}, [mol, width, height]);

	const handleOpenPreview = (e: MouseEvent) => {
		if (moleculeRef && moleculeRef.current) {
			const clientArea = moleculeRef.current;
			const url = SvgTransformUrl(clientArea);
			if (url) {
				setPreviewSrc(url);
				setPreviewVisible(true);
			}
		}
		e.stopPropagation();
	};

	const renderSVG = () => {
		if (moleculeRef && moleculeRef.current && mol) {
			const clientArea = moleculeRef.current;
			const svgElementList = clientArea.querySelectorAll("svg");
			const svgList = Array.from(svgElementList);
			svgList.map(el => {
				if (el.parentElement === clientArea) {
					clientArea.removeChild(el);
				}
			});
			setLoading(true);
			try {
				const molSerializer = new MolSerializer();
				const struct = molSerializer.deserialize(mol);
				struct.name = id;
				RenderStruct.render({
					el: clientArea,
					struct,
					options: {
						scale: 75,
						autoScale: true,
						autoScaleMargin: 30,
						width: width || clientArea.clientWidth - 10,
						height: height || clientArea.clientHeight - 10,
						showValenceWarnings: false,
						showValence: false,
						...options
					},
					highlight
				});
			} catch (e) {
				setErrorState(true);
				console.error("Rendering Molecule SVG Error:", e);
			} finally {
				setLoading(false);
			}
		}
	};
	return (
		<div style={{ width, height, ...style }} className={cn("chem2d-img-container", rootClassName)}>
			{errorState ? (
				<>{error}</>
			) : (
				<div className={cn("chem2d-img-box", boxClassName)} ref={moleculeRef}>
					{loading && (
						<div className={cn("chem2d-img-loading", loadingOpt.className)} style={loadingOpt.style}>
							{loadingOpt.icon}
						</div>
					)}
					{preview && mol && (
						<button
							className={cn("chem2d-img-preview-button", previewBut.className)}
							style={{ ...placementPosition, ...previewBut.style }}
							onClick={handleOpenPreview}
						>
							{previewBut.icon}
						</button>
					)}
				</div>
			)}
			{preview && mol && (
				<div onClick={(e: MouseEvent) => e.stopPropagation()} className="chem2d-img-preview-wrapper">
					<Image
						preview={{
							icons: defaultIcons,
							src: previewSrc,
							visible: previewVisible,
							minScale,
							maxScale,
							onVisibleChange: visible => {
								setPreviewVisible(visible);
							}
						}}
					></Image>
				</div>
			)}
		</div>
	);
});

Chem2DIMG.displayName = "Chem2DIMG";

export { Chem2DIMG };
