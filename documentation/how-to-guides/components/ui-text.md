---
title: Add Spatial UI Text
description: Display text in 3D using Unity's Canvas system with custom fonts, extended character sets, and the FontAdditionalCharacters component.
---

# Add Spatial UI Text

Display text in your 3D scenes using Unity's Canvas-based UI system. Text is rendered as an MSDF (Multi-Channel Signed Distance Field) font atlas, which keeps text sharp at any distance and scale.

## Quick Start

1. Add a **Canvas** to your scene and set it to **World Space**
2. Add a **UI > Legacy > Text** component as a child of the Canvas
3. Enter your text and choose a font
4. Export — Needle Engine auto-generates the font atlas

:::warning Use Legacy Text, not TextMeshPro
Needle Engine supports the `UI/Legacy/Text` component. **TextMeshPro** is **not** supported. Make sure to use `Add Component > UI > Legacy > Text`.
:::

<sample src="https://engine.needle.tools/samples-uploads/worldspace-ui" />

## Using Custom Fonts

To use a custom font, assign a font asset to the Text component's **Font** field in Unity. Needle Engine will generate an MSDF font atlas for it during export.

The character set included in the generated atlas is built from:

1. **Characters in Text components** — all characters used in your scene's Text components are automatically included.
2. **Default characters** — standard ASCII (A–Z, a–z, 0–9, punctuation) and common European characters (e.g. ß, ä, é, ñ) are always included.

This means that in most cases, the font atlas will contain everything you need without any extra setup.

## Extending the Character Set

If you set text dynamically at runtime (e.g. user names, chat messages, or localized content), those characters may not be in any Text component in your scene. To make sure they are included in the font atlas:

1. Add a **`FontAdditionalCharacters`** component anywhere in your scene
2. In the **Additional Characters** text field, enter all extra characters you need
3. These characters will be added to every font atlas during export

For example, to support Japanese text at runtime, paste the Japanese characters you need into the text field.

::: warning Font must support the characters
The font file itself must contain glyphs for the characters you want to display. Adding characters to `FontAdditionalCharacters` only works if the font supports them. For example, to display Chinese characters you need a font that includes Chinese glyphs (e.g. Noto Sans CJK).
:::

:::tip Extending via Script
The `FontAdditionalCharacters` component implements the `IAdditionalFontCharacters` interface. You can create your own MonoBehaviour implementing this interface to programmatically provide additional characters for the font atlas.
:::

## Supported UI Components

The spatial UI system maps from Unity UI (Canvas, not UI Toolkit). All UI elements can be animated.

| Component | Description |
| --- | --- |
| [`Canvas`](https://engine.needle.tools/docs/api/Canvas) | Root UI container (World Space mode required) |
| [`Text`](https://engine.needle.tools/docs/api/Text) | Render text with custom fonts |
| [`Button`](https://engine.needle.tools/docs/api/Button) | Click events with onClick |
| [`Image`](https://engine.needle.tools/docs/api/Image) | Renders sprite images |
| [`RawImage`](https://engine.needle.tools/docs/api/RawImage) | Renders textures |
| [`InputField`](https://engine.needle.tools/docs/api/InputField) | Text input field |

:::tip HTML + Spatial UI
For cross-platform projects (VR, AR, desktop), consider mixing spatial and HTML UI:
- **HTML**: 2D interfaces for best accessibility
- **Spatial UI**: 3D interfaces with depth (e.g., button hover states in VR)
:::

## Common Questions

**My UI text is not showing up**<br>
Make sure you're using `UI/Legacy/Text`, not TextMeshPro. See [FAQ](/docs/reference/faq#my-ui-is-not-rendering-text).

**Some characters are missing at runtime**<br>
The font atlas only contains characters that were known at export time. Add a `FontAdditionalCharacters` component with the missing characters and re-export.

**The font atlas is very large**<br>
If you're adding many characters (e.g. full CJK character sets), the atlas can grow large. Only include the characters you actually need. The exporter warns if a font exceeds 5000 characters.

## More Information

- [UI Components Reference](/docs/reference/components#ui) - Full component table
- [Screenspace UI Sample](https://engine.needle.tools/samples/screenspace-ui/) - Live demo
- [Text API](https://engine.needle.tools/docs/api/Text) - TypeScript API reference
