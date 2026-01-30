# VuePress Theme for TypeDoc

This TypeDoc plugin applies VuePress styling to your API documentation HTML output, creating a consistent look and feel between your VuePress docs and TypeDoc API reference.

## What It Does

This plugin customizes TypeDoc's HTML output to match your VuePress theme styling:

1. **Injects VuePress Navigation** - Adds the same navbar that appears in your VuePress docs
2. **Applies VuePress CSS** - Uses VuePress color palette, typography, and component styles
3. **Adds Breadcrumbs** - Provides navigation context linking back to main docs
4. **Consistent Branding** - Includes your Needle Engine logo and branding

## Files

- `index.js` - TypeDoc plugin that injects HTML elements via hooks
- `vuepress-overrides.css` - CSS file that overrides TypeDoc's default styles with VuePress theme
- `README.md` - This file

## How It Works

### 1. Plugin Hooks

The `index.js` file uses TypeDoc's renderer hooks to inject custom HTML:

- **`head.end`** - Injects links to fonts and the custom CSS file
- **`body.begin`** - Injects the VuePress navbar at the top of every page
- **`content.begin`** - Injects breadcrumb navigation

### 2. CSS Overrides

The `vuepress-overrides.css` file provides:

- VuePress color palette (CSS custom properties)
- Typography matching (Inter font family)
- Navbar styling (fixed header with navigation links)
- Component styling (buttons, links, code blocks)
- Dark mode support
- Responsive design

### 3. Build Integration

The CSS file is automatically copied to the API documentation output directory during the build process (see `build_api_docs.mjs:397-403`).

## Customization

### Updating Colors

Edit the CSS custom properties in `vuepress-overrides.css`:

```css
:root {
    --vp-c-brand: #42b883;        /* Primary brand color */
    --vp-c-brand-light: #42d392;  /* Hover states */
    /* ... more colors ... */
}
```

### Changing Navigation Links

Edit the navbar links in `index.js`:

```javascript
app.renderer.hooks.on("body.begin", (context) => {
    // Modify the JSX.createElement calls to change links
});
```

### Adding Custom Elements

Use additional TypeDoc hooks:

- `footer.begin` / `footer.end` - Customize footer
- `navigation.begin` / `navigation.end` - Customize sidebar
- `pageSidebar.begin` / `pageSidebar.end` - Customize page-specific sidebar

## Configuration

The plugin is loaded in `build_api_docs.mjs`:

```javascript
plugin: [
    // ... other plugins ...
    "./tools/api-plugins/vuepress-theme/index.js",
],
```

## Benefits

✅ **Consistent User Experience** - Users see the same design whether in docs or API reference
✅ **Seamless Navigation** - Easy to switch between conceptual docs and API details
✅ **Brand Consistency** - Maintains your visual identity across all documentation
✅ **No Markdown Conversion** - Keeps TypeDoc's rich HTML output with interactive features
✅ **Easy Maintenance** - Update VuePress colors once, they apply to API docs too

## Example Output

When users visit your API documentation, they'll see:

1. **Familiar Navbar** - Same header navigation as your VuePress site
2. **VuePress Colors** - Green brand accent color matching your theme
3. **Breadcrumb Trail** - "Docs / API Reference" navigation
4. **Consistent Typography** - Same fonts and styling as main docs
5. **Dark Mode Support** - Automatic theme switching

## Future Enhancements

Potential improvements:

- Extract actual VuePress build CSS instead of recreating it
- Add VuePress custom container support (tips, warnings, etc.)
- Integrate DocSearch for unified search
- Add version switcher matching VuePress
- Support for VuePress plugins (markdown extensions, etc.)
