---
title: needle.config.json
---

El `needle.config.json` se utiliza para proporcionar configuración para las integraciones de Needle Editor y para los plugins de la pipeline de compilación de Needle Engine.

| | |
| --- | --- |
| **Rutas** | |
| `buildDirectory` | Aquí es donde se copian los archivos del proyecto compilado |
| `assetsDirectory` | Aquí es donde se copiarán o crearán los recursos de la integración del Editor (por ejemplo, los archivos `.glb` exportados desde Unity o Blender) |
| `scriptsDirectory` | Este es el directorio que la integración del Editor está vigilando en busca de cambios en el código para regenerar componentes |
| `codegenDirectory` | Aquí es donde la integración del Editor genera los archivos de salida. |
| `baseUrl` | Requerido para la integración con, por ejemplo, next.js o SvelteKit. Cuando se establece baseUrl, las rutas relativas para codegen y dentro de los archivos usan baseUrl, no assetsDirectory. Esto es útil en los casos en que el assetDirectory no coincide con la url del servidor.<br/>Por ejemplo, la ruta en disco podría ser `"assetsDirectory": "public/assets"`, pero el framework sirve archivos desde `"baseUrl": "assets"`. |
| **Herramientas** | |
| `build : { copy: ["myFileOrDirectory"] }` | Array de rutas de cadena para copiar archivos o carpetas adicionales al `buildDirectory`. Estas pueden ser absolutas o relativas. |

#### Ejemplo básico
```json
{
  "buildDirectory": "dist",
  "assetsDirectory": "assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated"
}
```

#### Ejemplo de copia
```json
{
  "buildDirectory": "dist",
  "assetsDirectory": "assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated",
  "build": {
    "copy": [
      "cards"
    ]
  }
}
```

#### Ejemplo con baseUrl diferente (por ejemplo, SvelteKit, Next.js)
Los archivos se exportan a `static/assets` pero el framework los sirve desde `/assets`. En este caso, se debe establecer `baseUrl` a `assets` para que las rutas relativas en los archivos sean correctas.

```json
{
  "baseUrl": "assets",
  "buildDirectory": "dist",
  "assetsDirectory": "static/assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated"
}
```

#### Enlaces relacionados
- [Estructura del Proyecto](../project-structure.md)

---
Página traducida automáticamente usando IA