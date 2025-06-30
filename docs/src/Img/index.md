---
title: Img 图片
order: -1
---
# Chem2DIMG 用于展示化学结构的图片
## 如何使用
### 普通使用
```tsx
import {Chem2DIMG} from 'chem2dview';
import "chem2dview/dist/styles.css"
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

export default () => <Chem2DIMG mol={mol} previewButton={{ placement: "bottomRight" }}></Chem2DIMG>
```

## API

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

### 类型
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
