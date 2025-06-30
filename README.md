# Chem2DView
## 项目简介：
本项目是基于ketcher的封装，用于在网页上展示化学结构。[ketcher](https://github.com/epam/ketcher)
## 目录架构
- components：存放组件
- docs：存放文档
- src：存放开发时源码
## 使用方式
```bash
npm i chem2dview
yarn add chem2dview
```
## Example
```bash
cd docs
yarn install
yarn dev
```
## 组件列表
### Chem2DIMG: 用于展示化学结构的图片

```tsx

import { Chem2DIMG } from "chem2dview";

function App() {
	const mol = `Benzene
   Ketcher  8152413542D 1   1.00000     0.00000     0

 12 13  0  0  0  0  0  0  0  0999 V2000
    7.3848   -1.7751    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    9.1152   -1.7746    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    8.2516   -1.2750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    9.1152   -2.7755    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    7.3848   -2.7800    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    8.2538   -3.2750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    9.9812   -3.2755    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   11.7115   -3.2739    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   10.8476   -2.7748    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   11.7121   -4.2748    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    9.9819   -4.2805    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   10.8512   -4.7749    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
  3  1  2  0     0  0
  1  5  1  0     0  0
  5  6  2  0     0  0
  6  4  1  0     0  0
  4  2  2  0     0  0
  2  3  1  0     0  0
  4  7  1  0     0  0
  9  7  2  0     0  0
  7 11  1  0     0  0
 11 12  2  0     0  0
 12 10  1  0     0  0
 10  8  2  0     0  0
  8  9  1  0     0  0
M  END`;
	return (
		<div>
			<Chem2DIMG mol={mol} previewButton={{ placement: "bottomRight" }}></Chem2DIMG>
		</div>
	);
}

export default App;

```



#### API

| 名称           | 类型                        | 默认值 | 描述                                                         |
| -------------- | --------------------------- | ------ | ------------------------------------------------------------ |
| id             | string                      | -      | 内部需求id寻找相应的节点，如外部需要根据需求给定相应的id值   |
| mol            | string                      | -      | mol格式字符串                                                |
| rootClassName  | string                      | -      | 最外层的的样式控制                                           |
| boxClassName   | String                      | -      | 照片容器的样式控制                                           |
| width          | number                      | 400    | 生成分子svg宽度                                              |
| height         | number                      | 400    | 生成分子svg高度                                              |
| options        | any                         | -      | 自定义svg生成内容，暂且未整理，后续整理                      |
| highlight      | HighlightMol                | -      | 分子高亮内容                                                 |
| error          | React.ReactNode             | -      | 自定义错误内容                                               |
| preview        | boolean \| ImagePreviewType | true   | 自定义预览内容，具体参考https://www.npmjs.com/package/rc-image里面的PreviewType |
| previewButton  | PreviewButtonType           | -      | 自定义图片上开关按钮内容                                     |
| loadingOptions | LoadingType                 | -      | 自定义加载过程内容                                           |

#### 类型
##### HighlightMol

| 参数  | 说明             | 类型     | 默认值 | 版本 |
| ----- | ---------------- | -------- | ------ | ---- |
| atoms | 显示高亮原子序号 | number[] | -      |      |
| bonds | 显示高亮线框序号 | number[] | -      |      |
| color | 显示颜色         | string   | -      |      |

##### PreviewButtonType

| 参数      | 说明           | 类型                                | 默认值 | 版本 |
| --------- | -------------- | ----------------------------------- | ------ | ---- |
| icon      | 显示预览Icon   | React.ReactNode                     | -      |      |
| className | 显示预览class  | string                              | -      |      |
| placement | 显示预览的位置 | ImagePlacement\| PlacementPosition | - |       |

##### ImagePlacement

```typescript
type ImagePlacement = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
```

##### PlacementPosition

```typescript
type PlacementPosition = {
	top?: number;
	bottom?: number;
	left?: number;
	right?: number;
};
```

##### LoadingType

| 参数      | 说明           | 类型            | 默认值 | 版本 |
| --------- | -------------- | --------------- | ------ | ---- |
| icon      | loading的Icon  | React.ReactNode | -      |      |
| className | loading的class | string          | -      |      |

### KetcherEdit:化学编辑器

说明：此封装为分离版本，需要ketcher的indigo-service配合，相关的docker脚本命令在docker/下，按照当前版本

```tsx
import { KetcherEdit } from "chem2dview";
import "ketcher-react/dist/index.css";
function App() {
	return (
		<div>
			<div style={{ width: "1000px", height: "600px" }}>
				<KetcherEdit
					staticResourcesUrl={"./"}
					buttons={{
						fullscreen: {
							hidden: true
						},
						settings: {
							hidden: true
						}
					}}
				/>
			</div>
		</div>
	);
}

export default App;

```



#### API

| 参数                  | 说明                         | 类型                  | 默认值 | 版本 |
| --------------------- | ---------------------------- | --------------------- | ------ | ---- |
| staticResourcesUrl    | 请求地址                     | string                | "./"   |      |
| structServiceProvider | indego-service接口对象       | StructServiceProvider | "/v2"  |      |
| buttons               | 控制画板上按钮               | ButtonsConfig         | -      |      |
| onChangeSmiles        | 画板分子改变返回对应的smiles | (smiles) => void      | -      |      |
| onLoad                | 分子插件加载完成后回调       | () => void            | -      |      |

#### 类型

##### ButtonsConfig

```typescript
ButtonsConfig = {
    [buttonName in ButtonName]?: ButtonConfig;
}

interface ButtonConfig {
    hidden?: boolean;
}

type ButtonName = 
'layout' | 
'clean' | 
'arom' | 
'dearom' | 
'cip' | 
'check' | 
'analyse' | 
'recognize' | 
'miew' | 
'settings' | 
'help' | 
'about' | 
'fullscreen' | 
'sgroup' | 
'reaction-plus' | 
'arrows' | 
'reaction-arrow-open-angle' | 
'reaction-arrow-filled-triangle' | 
'reaction-arrow-filled-bow' | 
'reaction-arrow-dashed-open-angle' | 
'reaction-arrow-failed' | 
'reaction-arrow-both-ends-filled-triangle' | 
'reaction-arrow-equilibrium-filled-half-bow' | 
'reaction-arrow-equilibrium-filled-triangle' | 
'reaction-arrow-equilibrium-open-angle' | 
'reaction-arrow-unbalanced-equilibrium-filled-half-bow' | 
'reaction-arrow-unbalanced-equilibrium-open-half-angle' | 
'reaction-arrow-unbalanced-equilibrium-large-filled-half-bow' | 
'reaction-arrow-unbalanced-equilibrium-filled-half-triangle' | 
'reaction-arrow-elliptical-arc-arrow-filled-bow' | 
'reaction-arrow-elliptical-arc-arrow-filled-triangle' | 
'reaction-arrow-elliptical-arc-arrow-open-angle' | 
'reaction-arrow-elliptical-arc-arrow-open-half-angle' | 
'reaction-mapping-tools' | 
'reaction-automap' | 
'reaction-map' | 
'reaction-unmap' | 
'rgroup' | 
'rgroup-label' | 
'rgroup-fragment' | 
'rgroup-attpoints' | 
'shape' | 
'shape-ellipse' | 
'shape-rectangle' | 
'shape-line' | 
'text' | 
'enhanced-stereo';
```

##### ref

可以使useKetcherEditHook进行获取KetcherRef

| 属性名              | 类型                                                         | 描述                                           |
| ------------------- | ------------------------------------------------------------ | ---------------------------------------------- |
| `ketcher`           | `Ketcher | undefined`                                        | Ketcher 实例对象（可用于底层操作或调试）       |
| `setMoleculeRender` | `(mol: string) => void`                                      | 设置并渲染分子结构，不修改原始数据，仅用于展示 |
| `setMolecule`       | `(structure: string) => void`                                | 设置分子结构，会同步到编辑器内部状态           |
| `getMolecule`       | `() => Promise<string | undefined>`                          | 获取当前编辑器中的分子结构（molfile 格式）     |
| `getSmiles`         | `() => Promise<string | undefined>`                          | 获取当前分子的 SMILES 表达式                   |
| `getSdf`            | `(molfileFormat?: MolfileFormat) => Promise<string | undefined>` | 获取当前分子的 SDF 表达（支持多种格式）        |
| `clear`             | `() => void`                                                 | 清空当前编辑器内容                             |

```tsx
import { KetcherEdit, useKetcherEditHook } from "chem2dview";
import "ketcher-react/dist/index.css";
function App() {
	const { KetcherRef } = useKetcherEditHook();
	return (
		<div>
			<div style={{ width: "1000px", height: "600px" }}>
				<KetcherEdit
					ref={KetcherRef}
					staticResourcesUrl={"./"}
					buttons={{
						fullscreen: {
							hidden: true
						},
						settings: {
							hidden: true
						}
					}}
				/>
			</div>
		</div>
	);
}

export default App;

```

