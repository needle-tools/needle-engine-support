---
title: <needle-engine> 配置
---

`<needle-engine>` web 组件内置了一系列属性，可用于修改加载场景的外观和感觉，而无需直接添加或编辑 three.js 场景。
下表列出了其中最重要的属性：

| 属性 | 描述 |
| --- | --- |
| **加载** | |
| `src` | 一个或多个 glTF 或 glb 文件的路径。<br/>支持的类型包括 `string`、`string[]` 或字符串化数组（以 `,` 分隔） |
| `dracoDecoderPath` | Draco 解码器的 URL，例如 `./include/draco/` 以使用本地的 Draco 解码器 |
| `dracoDecoderType` | Draco 解码器类型。选项包括 `wasm` 或 `js`。参见 [three.js documentation](https://threejs.org/docs/#examples/en/loaders/DRACOLoader.setDecoderConfig) |
| `ktx2DecoderPath` | KTX2 解码器的 URL，例如 `./include/ktx2/` 以使用本地的 KTX2 解码器 |
| **渲染** | |
| `background-color` | 可选，用作背景颜色的 hex 颜色值。示例：`rgb(255, 200, 100)`，`#dddd00` |
| `background-image` | 可选，天空盒图像（背景图像）的 URL 或预设字符串：`studio`, `blurred-skybox`, `quicklook`, `quicklook-ar` |
| `background-blurriness` | 可选，用于 `background-image` 的模糊度值，介于 0（不模糊）和 1（最大模糊）之间。示例：`background-blurriness="0.5"` |
| `environment-image` | 可选，环境图像（环境光）的 URL 或预设字符串：`studio`, `blurred-skybox`, `quicklook`, `quicklook-ar` |
| `contactshadows` | 可选，渲染接触阴影 |
| `tone-mapping` | 可选，支持的值包括 `none`, `linear`, `neutral`, `agx` |
| `tone-mapping-exposure` | 可选数字，例如使用 `tone-mapping-exposure="1.5"` 增加曝光度，需要设置 `tone-mapping` |
| **交互** | |
| `autoplay` | 添加或设置为 `true` 以自动播放动画，例如 `<needle-engine autoplay` |
| `camera-controls` | 添加或设置为 `true` 以在场景中未找到相机控制器时自动添加 OrbitControls |
| `auto-rotate` | 添加此属性以启用自动旋转（仅与 `camera-controls` 一起使用） |
| **事件** | |
| `loadstart` | 加载开始时要调用的函数名称。注意参数是 `(ctx:Context, evt:Event)`。您可以调用 `evt.preventDefault()` 以隐藏默认加载叠加层 |
| `progress` | 加载更新时要调用的函数名称。`onProgress(ctx:Context, evt: {detail: {context:Context, name:string, index:number, count:number, totalProgress01:number}) { ... }` |
| `loadfinished` | 加载完成时要调用的函数名称 |
| **加载显示** | *更改 Needle Engine 加载显示外观的可用选项。使用 `?debugloadingrendering` 可更轻松地编辑* |
| `loading-background` | **PRO** — 默认值：`transparent`。更改加载背景颜色（例如 `#dd5500`） |
| `loading-logo-src` | **PRO** — 更改加载标志图像（例如 `https://yourdomain.com/logo.png` 或 `/logo.png`） |
| `hide-loading-overlay` | **PRO** — 不显示加载叠加层 |
| **内部** | |
| `hash` | 内部使用，附加到正在加载的文件以强制更新（例如，当浏览器缓存了 glb 文件时）。不应手动编辑。 |

**升级通知**:
- 在 Needle Engine 4.5.0 中移除的属性：`loading-style`, `loading-background-color`, `loading-text-color`, `primary-color`, `secondary-color`

# 示例

```html
<!-- 设置要加载的自定义 glb 文件的路径 -->
<needle-engine src="path/to/your.glb"></needle-engine>
```

```html
<!-- 覆盖 draco 解码器的位置 -->
<needle-engine src="path/to/your.glb" dracoDecoderPath="./include/draco/"></needle-engine>
```

设置环境图像、播放动画和自动相机控制。[在 stackblitz 上查看实时示例](https://stackblitz.com/edit/needle-engine-cycle-src?file=index.html)
```html
<needle-engine
      camera-controls
      auto-rotate
      autoplay
      skybox-image="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_sunset_puresky_1k.hdr"
      environment-image="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_sunset_puresky_1k.hdr"
      src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Embedded/DamagedHelmet.gltf"
      >
      </needle-engine>
```

当 needle-engine 上下文完成加载时接收事件：
```html
<needle-engine loadfinished="onLoadFinished"> </needle-engine>
<script>
    function onLoadFinished() {
        console.log("Needle Engine has finished loading");
    }
</script>
```

### 自定义加载样式 (PRO)

通过在 `<needle-engine>` web 组件上设置相应的属性，您可以轻松修改 Needle Engine 的外观。详细信息请参见上表。

![custom loading](/imgs/custom-loading-style.webp)
[在 github 上查看代码](https://github.com/needle-engine/vite-template/blob/loading-style/custom/index.html)


页面由 AI 自动翻译