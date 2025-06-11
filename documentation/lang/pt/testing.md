---
title: Testar em dispositivos locais
---

## Testar em dispositivos locais

Ao usar os nossos modelos, o Needle Engine executa um servidor de desenvolvimento local para si. Basta premir play e um website abrirá no seu browser predefinido, pronto para testar no seu dispositivo local. Para testar noutros dispositivos na mesma rede, poderá ter de instalar um certificado autoassinado (veja abaixo).

Ao usar uma configuração / framework personalizada, por favor, consulte a documentação da sua framework sobre como executar um servidor de desenvolvimento local seguro.

::: tip
O nosso servidor local usa o endereço IP na sua rede local (por exemplo, `https://192.168.0.123:3000`) em vez de `localhost:3000`. Isto permite-lhe visualizar rapidamente e testar o seu projeto a partir de dispositivos móveis, óculos de RV, e outras máquinas na mesma rede.

Estamos a usar HTTPS em vez do antigo HTTP, porque APIs web modernas e poderosas como o WebXR requerem uma ligação segura – o S significa "segura".
:::

## Configurar um certificado autoassinado para desenvolvimento

Diferentes sistemas operativos têm diferentes requisitos de segurança para o desenvolvimento local. Tipicamente, exibir um website funcionará mesmo com um certificado não fidedigno gerado automaticamente, mas os browsers podem avisar sobre a falta de confiança e algumas funcionalidades não estão disponíveis. Eis um resumo:

::: tip
Instalar certificados autoassinados fidedignos nos seus dispositivos de desenvolvimento é recomendado para uma experiência de desenvolvimento fluida. Encontre os passos no fundo desta página.
:::

**Padrão – com certificado não fidedigno gerado automaticamente**
_Exibe um aviso de certificado ao abrir o projeto num browser._
_Usa o pacote npm [vite-plugin-basic-ssl](https://github.com/vitejs/vite-plugin-basic-ssl)._

Estamos a usar ligações websocket para comunicar entre o browser e o servidor de desenvolvimento local. Websockets requerem uma ligação segura (HTTPS) para funcionar. Dependendo da plataforma, poderá ter de configurar um certificado personalizado para desenvolvimento local. Android e Windows não necessitam de um certificado personalizado, mas iOS e MacOS sim.

| SO | Visualização no browser<br/>(com aviso de segurança) | Recarregamentos automáticos |
| --- | --- | --- |
| Windows | (✓) | ✓ |
| Linux | (✓) | ✓ |
| Android | (✓) | ✓ |
| macOS | (✓) | ❌ |
| iOS | (✓ Safari e Chrome, após recarregar a página)<br/>❌ Mozilla XR Viewer | ❌ |
| Xcode Simulators | (✓ após recarregar a página) | ❌ |

**Com um certificado raiz autoassinado e fidedigno**
_Nenhum aviso de segurança é exibido. Precisa de instalar o certificado gerado nos seus dispositivo(s)._
_Usa o pacote npm [vite-plugin-mkcert](https://github.com/liuweiGL/vite-plugin-mkcert)._


| SO | Visualização no browser | Recarregamentos automáticos |
| --- | --- | --- |
| Windows | ✓ | ✓ |
| Linux | ✓ | ✓ |
| Android | ✓ | ✓ |
| macOS | ✓ | ✓ |
| iOS | ✓ | ✓ |

### Gerar um certificado de desenvolvimento autoassinado

- no Unity/Blender, clique em "Open Workspace" para abrir o VS Code

- verifique se está a usar `vite-plugin-mkcert` em vez de `vite-plugin-basic-ssl` (este último não gera um certificado raiz fidedigno, do qual necessitamos) no seu ficheiro `vite.config.ts`:
  - abra `package.json`
  - remova a linha com `"@vitejs/plugin-basic-ssl"` de `devDependencies`
  - abra um Terminal no VS Code e execute `npm install vite-plugin-mkcert --save-dev` que irá adicionar a versão mais recente
  - abra `vite.config.ts` e substitua `import basicSsl from '@vitejs/plugin-basic-ssl'` por `import mkcert from'vite-plugin-mkcert'`
  - em `plugins: [`, substitua `basicSsl(),` por `mkcert(),`
  - package.json agora parece assim:
  ![](/testing/switch-to-mkcert.webp)
- execute `npm run start` uma vez a partir do terminal do VS Code
  - no Windows, isto irá abrir uma nova janela e guiá-lo através da criação e instalação do certificado
  - no MacOS, o terminal pede a sua palavra-passe e depois gera e instala o certificado.
  - se estiver a receber um erro `Error: Port 3000 is already in use`, por favor, feche o servidor que ainda poderá estar a correr a partir do Unity.
- o certificado gerado será automaticamente instalado na máquina onde o gerou.
- pode parar o processo do terminal novamente.
- a partir de agora, premir Play no Unity/Blender usará o certificado gerado para o servidor local, e nenhum "aviso de segurança" será exibido mais, uma vez que o seu browser agora confia na ligação local.

## Instalar o certificado nos seus dispositivos de desenvolvimento

Nos seus dispositivos de desenvolvimento, precisa de _instalar_ o certificado gerado e permitir que o SO _confie_ nele. Isto é diferente para cada SO. Para cada um deles, precisará do ficheiro `rootCA.pem` que foi gerado, e enviá-lo para o dispositivo que pretende autenticar.

**No Windows:** encontre o certificado em `Users/<your-user>/.vite-plugin-mkcert/rootCA.pem`
**No MacOS:** encontre o certificado em `Users/<your-user>/.vite-plugin-mkcert/rootCA.pem`

Envie o ficheiro para si mesmo (por exemplo, via E-Mail, AirDrop, iCloud, USB, Slack, ...) para que possa aceder a ele nos seus dispositivos de desenvolvimento.

### Instalar o certificado no Android

1. Abra o ficheiro. Ser-lhe-á pedido para instalar o certificado.

### Instalar o certificado no iOS / iPadOS / VisionOS
1. Abra o ficheiro.
2. Ser-lhe-á pedido para _adicionar_ o perfil ao seu dispositivo. Confirme.
3. Vá a Definições
4. Haverá uma nova entrada "Profile". Selecione-a e permita que o perfil fique _ativo_ para este dispositivo.
5. No iOS / iPadOS, também precisa de permitir "Root Certificate Trust". Para isso, procure por `Trust` ou vá a `Settings > General > About > Info > Certificate Trust Settings` e ative a confiança total para o certificado raiz.

::: tip
O certificado é instalado automaticamente na máquina onde o gerou. Para outras máquinas na rede local, siga os passos abaixo para também estabelecer uma ligação fidedigna.
:::

### Instalar o certificado noutra máquina MacOS
1. Abra o ficheiro. A Acesso a Chaves irá abrir e permitir-lhe instalar o certificado.
2. Poderá ter de definir "Trust" para "Permitir sempre".

### Instalar o certificado noutra máquina Windows
1. Abra `certmgr` ("Gerir certificados de utilizador") digitando <kbd>Windows key</kbd> + `certmgr`.
2. Na barra lateral esquerda, selecione "Trusted Root Certification Authorities".
3. Clique com o botão direito em "Certificates" e selecione "All Tasks > Import".
4. Selecione o ficheiro `rootCA.pem` (poderá ter de mudar o tipo de ficheiro para "todos") e siga as instruções.

---
Página traduzida automaticamente usando IA