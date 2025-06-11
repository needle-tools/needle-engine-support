---
title: needle.config.json
---

O `needle.config.json` é usado para fornecer configuração para as integrações do Needle Editor e para os plugins da pipeline de compilação do Needle Engine.

| | |
| --- | --- |
| **Caminhos** | |
| `buildDirectory` | É aqui que os ficheiros do projeto compilado são copiados |
| `assetsDirectory` | É aqui que os assets de integração do Editor serão copiados ou criados (por exemplo, os ficheiros `.glb` exportados do Unity ou Blender) |
| `scriptsDirectory` | Este é o diretório que a integração do Editor está a observar para alterações de código para regenerar componentes |
| `codegenDirectory` | É para onde a integração do Editor está a gerar ficheiros. |
| `baseUrl` | Necessário para, por exemplo, a integração com next.js ou SvelteKit. Quando o baseUrl é definido, os caminhos relativos para codegen e dentro de ficheiros usam o baseUrl, não o assetsDirectory. Isto é útil em casos onde o assetDirectory não corresponde ao URL do servidor.<br/>Por exemplo, o caminho em disco poderia ser `"assetsDirectory": "public/assets"`, mas o framework serve ficheiros de `"baseUrl": "assets"`. |
| **Ferramentas** | |
| `build : { copy: ["myFileOrDirectory"] }` | Array de caminhos de string para copiar ficheiros ou pastas adicionais para o `buildDirectory`. Podem ser absolutos ou relativos. |

#### Exemplo Básico
```json
{
  "buildDirectory": "dist",
  "assetsDirectory": "assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated"
}
```

#### Exemplo de Cópia
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

#### Exemplo com baseUrl diferente (por exemplo, SvelteKit, Next.js)
Os ficheiros são exportados para `static/assets` mas o framework serve-os a partir de `/assets`. Neste caso, o `baseUrl` precisa de ser definido para `assets` para que os caminhos relativos nos ficheiros estejam corretos.

```json
{
  "baseUrl": "assets",
  "buildDirectory": "dist",
  "assetsDirectory": "static/assets",
  "scriptsDirectory": "src/scripts",
  "codegenDirectory": "src/generated"
}
```

#### Links Relacionados
- [Estrutura do Projeto](../project-structure.md)


Página traduzida automaticamente usando IA