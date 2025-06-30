---
title: Ketcher 编辑器
order: 0
---
# KetcherEdit:化学编辑器
## 如何使用
### 普通使用
```tsx
import { KetcherEdit, useKetcherEditHook } from "chem2dview";
import "ketcher-react/dist/index.css";
export default () => {
  const { KetcherRef } = useKetcherEditHook();
  
  return (<div>
  <div style={{ width: "1000px", height: "600px" }}>
    <KetcherEdit
      ref={KetcherRef}
      staticResourcesUrl={"./"}
    />
  </div>
</div>)
}
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

