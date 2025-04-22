# Redes

O Needle Engine inclui uma solução de rede completa para experiências multiplayer.
Um estado de mundo partilhado, chat de voz, persistência de sessão e muito mais podem ser alcançados com os nossos componentes e APIs de rede. Pode configurar a rede dos seus próprios componentes com uma escolha de rede automática ou manual.

As redes no Needle Engine são baseadas em [Websockets](https://github.com/jjxxs/websocket-ts). A rede automática usa dados JSON para facilidade de uso. Para casos de uso complexos e requisitos de alto desempenho, usamos [Flatbuffers](https://google.github.io/flatbuffers/).

O acesso à funcionalidade principal de rede pode ser obtido usando ``this.context.connection`` a partir de um componente. O servidor de backend padrão conecta os utilizadores a salas. Utilizadores na mesma sala partilharão o estado e receberão mensagens uns dos outros.

## Conceitos de Rede

### Salas e Estado

No centro das redes no Needle Engine está o conceito de salas sincronizadas. Cada sala tem um ID, e os utilizadores conectam-se a uma sala fornecendo este ID. As salas são armazenadas num servidor, e os utilizadores podem entrar e sair de salas a qualquer momento.
Quando um utilizador entra numa sala, ele recebe o estado atual da sala, aplica esse estado atual à sua cena e, em seguida, escuta as alterações ao estado da sala.
Quando um utilizador sai de uma sala, ele para de escutar as alterações ao estado da sala.

O estado da sala é armazenado como dados JSON no servidor, então todas as alterações são persistentes. Isso significa que o estado da sala não é apenas útil para redes, mas também para persistir ações de um único utilizador.

O Needle pode fornecer _IDs apenas de visualização_ para salas. Ao aceder a uma sala com um ID apenas de visualização, o utilizador não poderá interagir com a sala, mas poderá ver o estado atual e obter atualizações em tempo real. Isso é útil para apresentações ou demonstrações.

### Propriedade

Objetos numa sala podem ser _possuídos_ por um utilizador. Isso significa que apenas o proprietário de um objeto pode alterar o seu estado.
Por padrão, os objetos não têm proprietário.
Componentes como `DragControls` solicitarão a propriedade de um objeto antes de realmente o mover.
Em componentes personalizados, pode controlar como a propriedade é gerida.
Pode não ser necessária propriedade, a propriedade pode ser permitida a ser transferida para outro utilizador automaticamente, ou a propriedade pode ser transferida apenas por uma ação específica.

Quando um utilizador sai de uma sala, os objetos de propriedade desse utilizador serão eliminados ou terão a propriedade redefinida, dependendo de como o objeto foi criado.

## Ativar Redes para o seu projeto

1. Adicione um componente `SyncedRoom` à sua cena. Por padrão, isso usará a infraestrutura de rede fornecida pelo Needle.
2. Adicione um componente `SyncedTransform` a um objeto cujo movimento deseja sincronizar pela rede.
3. Adicione um componente `DragControls` ao mesmo objeto.
4. Execute o projeto. No navegador, clique em "Join Room" (Entrar na Sala) e copie o URL.
5. Abra uma nova janela do navegador e cole o URL. Agora deverá ver o mesmo objeto em ambas as janelas. Tente arrastar o objeto numa janela e veja-o mover-se na outra janela.

O componente `DragControls`, como muitos outros componentes Needle, tem suporte de rede incorporado.
A propriedade será transferida para quem começar a arrastar o objeto.

## Componentes Incorporados com Suporte de Rede

| Componente | Descrição |
| --- | --- |
| `SyncedRoom` | Gerencia a conexão de rede e a conexão a uma sala. |
| `SyncedTransform` | Gerencia a sincronização de transformações. |
| `SyncedCamera` | Gera um prefab para qualquer utilizador conectado à sala que seguirá a sua posição. |
| `VoIP` | Gerencia conexões de áudio voz-sobre-IP, acesso ao microfone, etc., entre utilizadores. |
| `ScreenCapture` | Gerencia o compartilhamento de tela via APIs web. |
| `Networking` | Use para personalizar o URL do servidor backend. Também permite configurar um servidor local para desenvolvimento. |
| `DragControls` | Gerencia o arrasto de objetos. A propriedade será automaticamente passada para o último utilizador a arrastar um objeto. |
| `Duplicatable` | Gerencia a duplicação de objetos. Objetos duplicados são instanciados para todos na sala. |
| `Deletable` | Gerencia a exclusão de objetos. As exclusões são sincronizadas pela rede. |
| `DeleteBox` | Gerencia a exclusão de objetos que têm um componente "Deletable" quando são arrastados para um volume de caixa. |
| `PlayerSync` | Componente poderoso que instancia um objeto específico para cada jogador conectado. |
| `PlayerState` | Adicione este componente a objetos que são atribuídos a `PlayerSync`. |
| `PlayerColor` | Componente simples para cores específicas do jogador. Cada utilizador recebe uma cor aleatória ao entrar numa sala. Este componente atribui essa cor ao material principal do objeto. |
| `WebXR` | Gerencia a sincronização de avatares de utilizador (mãos e cabeças). |

## Rede Automática para Componentes Personalizados

Campos nos seus próprios componentes podem ser configurados em rede muito facilmente. As alterações no campo serão detetadas automaticamente e enviadas para todos os utilizadores na sala. As alterações também são persistidas como parte do Estado da Sala, para que os utilizadores que entrarem na sala mais tarde também recebam o estado atual do campo, garantindo que todos veem os mesmos dados.

Para configurar um campo em rede automaticamente num componente, decore-o com o decorador ``@syncField()``:

::::code-group
:::code-group-item Sincronizar um número
```ts twoslash
import { Behaviour, syncField, IPointerClickHandler } from "@needle-tools/engine"

export class SyncedNumber extends Behaviour implements IPointerClickHandler {

    // Use `@syncField` to automatically network a field. 
    // You can optionally assign a method or method name to be called when the value changes.
    @syncField("myValueChanged")
    mySyncedValue?: number = 1;
    
    private myValueChanged() {
       console.log("My value changed", this.mySyncedValue);
    }
    
    onPointerClick() {
       this.mySyncedValue = Math.random();
    }
}
```
:::
:::code-group-item Sincronizar a cor de um objeto
<!-- SAMPLE network color change -->
:::
::::

Observe que syncField tem um parâmetro opcional para especificar um método que deve ser chamado quando o valor muda. Este método deve ser definido na mesma classe.

::: tip Configuração de Projeto Personalizada
Se estiver a usar uma configuração de projeto personalizada, precisa de ter ``experimentalDecorators: true`` no seu ficheiro ``tsconfig.json`` para que os decoradores syncField funcionem. Projetos criados com Needle Starters têm isto ativado por padrão.
:::

## Criar e destruir objetos

Muitas vezes, deseja criar e destruir objetos em tempo de execução e, claro, essas alterações devem ser sincronizadas pela rede.

O componente `PlayerSync` simplifica este processo instanciando automaticamente um objeto específico para cada jogador conectado.
Quando um jogador sai da sala, o objeto é destruído para todos os utilizadores.

Além disso, o Needle Engine fornece dois métodos de alto nível:
- [`syncInstantiate()`](https://engine.needle.tools/docs/api/latest/syncInstantiate) para duplicar objetos pela rede.
- [`syncDestroy()`](https://engine.needle.tools/docs/api/latest/syncDestroy) para destruir objetos pela rede.

> 🏗️ Exemplos de Código em Construção

## Rede Manual

O Needle Engine também fornece uma API de baixo nível para enviar e receber mensagens. Chamamos a isso "rede manual". Os princípios são os mesmos, mas você tem controlo total sobre o envio e recebimento de mensagens e como as gerir.

### Enviar Mensagens

Envie uma mensagem para todos os utilizadores na mesma sala:
```ts
this.context.connection.send(key: string, data: IModel | object | boolean | string | number | null);
```

### Receber Mensagens

Pode subscrever eventos na sala usando uma chave específica.
Tipicamente, deseja emparelhar isso com o cancelamento da subscrição:

- subscrever em `onEnable` e cancelar subscrição em `onDisable`
  Com esta abordagem, nenhuma mensagem será recebida enquanto o objeto estiver desativado.

- ou subscrever em `start` e cancelar subscrição em `onDestroy`
  Com esta abordagem, as mensagens ainda serão recebidas enquanto o objeto estiver desativado.

```ts
this.context.connection.beginListen(key:string, callback:(data) => void)
```

Cancelar subscrição de eventos:
```ts
this.context.connection.stopListen(key:string)
```

### Controlar a persistência das mensagens

Ao enviar mensagens de rede, a API de baixo nível permite decidir se essa mensagem deve ser persistida (salva no estado da sala) ou não (apenas enviada para os utilizadores atualmente na sala). Para persistir uma mensagem, certifique-se de que ela tem um campo `guid`. Este campo é tipicamente usado para aplicar os dados da mensagem a um objeto específico, fornecendo o guid desse objeto. Se quiser direcionar um objeto específico (e, portanto, incluir um campo `guid`), mas quiser que os dados não sejam persistidos, defina o campo `dontSave` para `true` na sua mensagem.

Todas as mensagens persistentes são salvas no estado da sala e serão enviadas para os utilizadores que se conectarem mais tarde. Mensagens não persistentes são enviadas apenas para os utilizadores atualmente na sala, o que é útil para efeitos (como tocar um efeito sonoro) que não faz sentido reproduzir para utilizadores que não estão atualmente na sala. Opcionalmente, pode incluir um campo `deleteOnDisconnect` na sua mensagem para excluir esta mensagem em particular quando o utilizador se desconectar.

```ts
// Esta mensagem será enviada para todos os utilizadores atualmente na sala,
// E para utilizadores que entrarem na sala mais tarde.
this.context.connection.send("my-message", { guid: this.guid, myData: "myValue" });

// Esta mensagem será enviada para todos os utilizadores atualmente na sala,
// mas NÃO será enviada para utilizadores que entrarem na sala mais tarde.
this.context.connection.send("my-message", { guid: this.guid, myData: "myValue", dontSave: true });

// Esta mensagem será enviada para todos os utilizadores atualmente na sala,
// mas NÃO será enviada para utilizadores que entrarem na sala mais tarde.
this.context.connection.send("my-message", { myData: "myValue" });

// Esta mensagem será enviada para todos os utilizadores atualmente na sala,
// E para utilizadores que entrarem na sala mais tarde,
// mas será excluída do estado da sala quando o utilizador se desconectar.
this.context.connection.send("my-message", { guid: this.guid, myData: "myValue", deleteOnDisconnect: true });
```

Para excluir o estado de um guid específico do armazenamento backend, defina a chave da mensagem como `delete-state` e direcione um objeto específico com o seu guid: `{ guid: "guid_to_delete" }`.

```ts
this.context.connection.send("delete-state", { guid: "guid_to_delete" });
```

### Usar flags de depuração para entender as mensagens de rede

Existem várias flags de depuração que podem ser usadas para aprofundar as mensagens de rede.
Estas podem ser anexadas ao URL da página, como `https://localhost:3000/?debugnet`.

| Flag | Descrição |
|------|-------------|
| `?debugnet` | Regista todas as mensagens de rede de entrada e saída na consola |
| `?debugowner` | Regista todos os pedidos e alterações de propriedade na consola |
| `?debugnetbin` | Regista informações adicionais para mensagens binárias de entrada e saída |

## Eventos do Ciclo de Vida da Rede

Os seguintes eventos estão disponíveis para escutar nos seus componentes. Eles descrevem eventos de rede comuns aos quais pode querer reagir nos seus componentes, como você ou outro utilizador a entrar ou sair de uma sala.

```ts
// Escuta o evento quando *você* se juntou a uma sala em rede
this.context.beginListen(RoomEvents.JoinedRoom, ({room, viewId, allowEditing, inRoom}) => { ... });

// Escuta o evento quando *você* saiu de uma sala em rede
this.context.beginListen(RoomEvents.LeftRoom, ({room}) => { ... });

// Escuta o evento quando *outro utilizador* se juntou à sua sala em rede
this.context.beginListen(RoomEvents.UserJoinedRoom, ({userId}) => { ... });

// Escuta o evento quando *outro utilizador* saiu da sua sala em rede
this.context.beginListen(RoomEvents.UserLeftRoom, ({userId}) => { ... });

// Este evento é recebido depois de todo o estado atual da sala ter sido enviado para o cliente
this.context.beginListen(RoomEvents.RoomStateSent, () => { ... });
```

- [Ver todos os Eventos de Sala na documentação da API](https://engine.needle.tools/docs/api/latest/RoomEvents)
- [Ver todos os Eventos de Propriedade na documentação da API](https://engine.needle.tools/docs/api/latest/OwnershipEvent)
- [Ver todos os Eventos de Conexão na documentação da API](https://engine.needle.tools/docs/api/latest/ConnectionEvents)

## Usando Servidores de Rede Needle

Por padrão, as cenas Needle em rede conectam-se à infraestrutura de nuvem gerida e fornecida pela Needle. Não há necessidade de configuração adicional e, atualmente, não há custo adicional para usar este serviço.

Tipicamente, isso funcionará bem para cerca de 15-20 utilizadores na mesma sala. Assim que o seu projeto amadurecer, pode atualizar para uma solução de rede maior/melhor/mais forte, alojando o seu próprio servidor de rede.

## Alojando o seu próprio Servidor de Rede

Pode querer alojar o seu próprio servidor de rede para implementações maiores ou para ter mais controlo sobre a infraestrutura e implementação de rede.

O nosso servidor de rede está disponível no NPM [pacote de rede próprio](https://fwd.needle.tools/needle-engine/packages/needle-engine-networking) como um pacote node.js. O pacote contém integrações pré-configuradas para os populares frameworks web [Fastify](https://www.npmjs.com/package/fastify) e [Express](https://www.npmjs.com/package/express), e pode ser integrado noutros frameworks de servidor Node.js também.

::: tip Para experiências rápidas: Remix no Glitch
Pode fazer um remix de um simples servidor de rede a correr no Glitch a partir desta página: [needle-networking.glitch.me](https://needle-networking.glitch.me/) clicando no botão no canto inferior direito.

A instância padrão do servidor Glitch é pequena e só consegue lidar com uma quantidade limitada de utilizadores. Se espera que mais de 15-20 pessoas estejam na sua cena ao mesmo tempo, deve considerar alojar o seu servidor de rede noutro local (como no Google Cloud ou AWS).
:::

::::code-group
:::code-group-item Fastify
```js
import networking from "@needle-tools/needle-networking";
networking.startServerFastify(fastifyApp, { endpoint: "/socket" });
```
:::
:::code-group-item Express
```js
import networking from "@needle-tools/needle-networking";
networking.startServerExpress(expressApp, { endpoint: "/socket" });
```
:::
:::code-group-item Custom Integration
```js
import { init, onConnection } from "@needle-tools/networking";

// Add your framework-specific websocket implementation here. 
// You can view the fastify and express implementations in server.js for reference.
class WebsocketConnector {
    constructor(frameworkWebsocket) {
        // Your implementation.
    }
    on(event, callback) {
        // Your implementation. When receiving a message in the websocket connection, call the callback.
        // 'event' can be 'message' or 'close'.
    }
    send(key, value) {
        // Your implementation. Pass the message along to the websocket connection.
    }
}
const options = { endpoint: "/socket" };
init(options);
yourFramework.createWebsocketRoute(options.endpoint, frameworkWebsocket => {
    onConnection(new WebsocketConnector(frameworkWebsocket));
});
```
:::
::::

::: tip Exemplo em Glitch.com
Veja o código em [glitch.com/edit/#!/needle-networking](https://glitch.com/edit/#!/needle-networking?path=server.js) para um exemplo de como integrar o Needle Networking com um servidor Express.
:::

### Configuração

As seguintes opções estão disponíveis:

| Opção | Descrição |
| -- | -- |
| `options.endpoint` *string* | Opcional. Endpoint relativo do servidor. Por exemplo, `/socket` iniciará o endpoint websocket em `seuservidor/socket`. O padrão é `/`. |
| `options.maxUsers` *number* | Número máximo de utilizadores concorrentes num servidor. O padrão é `50`. |
| `options.defaultUserTimeout` *number* | Tempo em segundos após o qual um utilizador é considerado desconectado. O padrão é `30`. |
| `process.env.VIEW_ONLY_SALT` *string* | Valor de salt usado para gerar IDs de sala apenas de visualização a partir de IDs de sala regulares. O padrão é um valor de salt predefinido. |
| `process.env.NEEDLE_NETWORKING_S3_*` *string* | Ativar armazenamento S3. Veja abaixo a lista completa de variáveis de ambiente que precisa configurar para isto. Quando não configurado, o armazenamento padrão é usado (ficheiros JSON em disco). |

O servidor de rede gerirá automaticamente a conexão e desconexão de utilizadores, o recebimento e envio de mensagens e a persistência do estado da sala.

Servidores de rede personalizados podem ser implementados em qualquer lugar, por exemplo no Google Cloud. Para mais instruções, consulte este repositório: [Local Needle Networking Server](https://fwd.needle.tools/needle-engine/local-networking-repository)

::: tip Locais de servidor diferentes para desenvolvimento local e alojado
Se estiver a trabalhar em código de rede personalizado, pode querer usar locais de servidor diferentes para desenvolvimento local e a aplicação alojada. Pode configurar URLs de servidor individuais no componente `Networking`:

![Componente de Rede do Needle Engine com servidor de rede alojado noutro local](/imgs/networking_absolute.webp)
:::

#### Armazenamento de Estado

Por padrão, o estado da rede é armazenado em disco no servidor como ficheiros JSON no diretório `/.data`.
Cada sala tem o seu próprio ficheiro, e o estado é enviado para os clientes que se conectam quando entram numa sala.

Opcionalmente, o estado da rede pode ser armazenado com um provedor de armazenamento compatível com S3. Use as seguintes variáveis de ambiente para ativar o armazenamento S3:

```bash
NEEDLE_NETWORKING_S3_ENDPOINT=
NEEDLE_NETWORKING_S3_REGION=
NEEDLE_NETWORKING_S3_BUCKET=
NEEDLE_NETWORKING_S3_ACCESS_KEY_ID=
NEEDLE_NETWORKING_S3_ACCESS_KEY=
NEEDLE_NETWORKING_S3_PREFIX= # todo o estado salvo no bucket será prefixado com esta string. Pode ser um caminho, por exemplo `my_state/` ou um id único `server_123_`
```

## Servidor de Rede Local

Para fins de teste e desenvolvimento, pode executar o pacote de rede Needle Engine num servidor local. Preparámos um repositório configurado para alojar o pacote websocket e tornar isso fácil para si.

1. Faça o download da amostra do servidor local de [github.com/needle-tools/networking-local](https://fwd.needle.tools/needle-engine/local-networking-repository)
2. Siga as instruções no README para configurar o servidor. O servidor será executado em `wss://localhost:9001/socket` por padrão.
3. Adicione o componente `Networking` à sua cena.
4. Cole o endereço do servidor local no campo `Localhost` no componente `Networking`.

## Avançado: Personalizar definições WebRTC para peer.js

Os componentes `Screencapture` (Compartilhamento de Tela) e `VoIP` (Comunicação por Voz) do Needle Engine usam [peer.js](https://peerjs.com/) para rede de áudio e vídeo. O Peer.js usa WebRTC por baixo.

O Needle Engine usa padrões razoáveis para peerjs. Se quiser modificar esses padrões, pode chamar
```ts
setPeerOptions(opts: PeerjsOptions);
```
com as suas definições personalizadas. Isso pode ser usado para modificar o provedor de hospedagem para servidores ICE/STUN/TURN, por exemplo, quando usar os seus próprios servidores WebRTC.

## Avançado: Formatos de Mensagem do Servidor e Cliente

::: warning Apenas para fins informativos. Use as APIs fornecidas pelo Needle Engine.
Tipicamente, não precisa interagir diretamente com estes formatos de mensagem, pois a API de rede de baixo nível já gerencia a análise de mensagens e fornece os tipos corretos. As informações aqui são fornecidas para utilizadores avançados que desejam entender os formatos de mensagem subjacentes ou implementar as suas próprias soluções de rede.
:::

As mensagens são enviadas no formato JSON. Elas sempre têm um campo `key` que descreve o tipo de mensagem e um campo `data` que contém a carga útil da mensagem. O campo `data` pode ser qualquer objeto serializável em JSON.

### Eventos de Sala Incorporados

::::code-group
:::code-group-item Entrar
```json
// Enviado para o servidor para tentar entrar numa sala.
{
    "key": "join-room",
    "data": {
        "room": string,
        "viewOnly": boolean,
    }
}
```
:::
:::code-group-item Sair
```json
// Enviado para o servidor para sair de uma sala.
{
    "key": "leave-room",
    "data": {
        "room": string
    }
}
```
:::
:::code-group-item JoinedRoom
```json
// Enviado para o cliente quando o utilizador local entrou numa sala.
// Tipo: JoinedRoomResponse
{
    "key": "joined-room",
    "room": string,
    "viewId": string,
    "allowEditing": boolean,
    "inRoom": string[] // connection IDs
}
```
:::
:::code-group-item LeftRoom
```json
// Enviado para o cliente quando o utilizador local saiu de uma sala.
// Tipo: LeftRoomResponse
{
    "key": "left-room",
    "room": string
}
```
:::
:::code-group-item UserJoinedRoom
```json
// Enviado para o cliente quando qualquer utilizador entrou numa sala.
// Tipo: UserJoinedOrLeftRoomModel
{
    "key": "user-joined-room",
    "data": {
        "userId": string // connection ID
    }
}
```
:::
:::code-group-item UserLeftRoom
```json
// Enviado para o cliente quando qualquer utilizador saiu de uma sala.
// Tipo: UserJoinedOrLeftRoomModel
{
    "key": "user-left-room",
    "data": {
        "userId": string // connection ID
    }
}
````
:::
:::code-group-item RoomStateSent
```json
// Enviado para o cliente depois de todo o estado completo da sala ter sido enviado.
{
    "key": "room-state-sent",
    "room": string // room name 
}
```
:::
::::

### Eventos de Utilidade Incorporados

::::code-group
:::code-group-item ConnectionInfo
```json
// Enviado para o cliente quando a conexão é estabelecida.
{
    "key": "connection-start-info",
    "data": {
        "id": string // connection ID
    }
}
```
:::
:::code-group-item syncInstantiate
```json
// Usado pela API syncInstantiate() para criar uma nova instância de um asset.
// Tipo: NewInstanceModel
{
    "key": "new-instance-created",
    "data": {
        "guid": string,
        "originalGuid": string,
        "seed": number | undefined,
        "visible": boolean | undefined,
        "dontSave": boolean | undefined,

        "parent": string | undefined,
        "position": { x: number, y: number, z: number } | undefined,
        "rotation": { x: number, y: number, z: number, w: number } | undefined,
        "scale": { x: number, y: number, z: number } | undefined,

        "deleteStateOnDisconnect": boolean | undefined
    }
```
:::
:::code-group-item syncDestroy
```json
// Usado pela API syncDestroy() para destruir uma instância de um asset.
// Tipo: DestroyInstanceModel
{
    "key": "instance-destroyed",
    "data": {
        "guid": string,
        "dontSave": boolean | undefined
    }
}
```
:::
:::code-group-item Ping
```json
// Enviado para o servidor a cada poucos segundos para manter a conexão ativa.
{
    "key": "ping",
    "data": {}
}
```
:::
:::code-group-item Pong
```json
// Enviado pelo servidor em resposta a um ping.
{
    "key": "pong",
    "data": {}
}
```
:::
:::code-group-item DeleteState
```json
// Enviado para o servidor para excluir o estado de um guid específico.
{
    "key": "delete-state",
    "data": {
        "guid": <string>
    }
}
```
:::
:::code-group-item DeleteAllState
```json
// Enviado para o servidor para excluir TODO o estado atual da sala.
{
    "key": "delete-all-state",
    "data": {}
}
```
::::

### Eventos de Propriedade Incorporados

::::code-group
:::code-group-item OwnershipRequest
```json
{
    "key": 
      "request-has-owner" | 
      "request-ownership" | 
      "remove-ownership",
    "data": {
        "guid": string
    }
}
```
:::
:::code-group-item OwnershipResponse
// Tipo: OwnershipResponse
```json
{
    "key": 
      "response-has-owner",
    "data": {
        "guid": string,
        "value": boolean
    }
}
```
:::
::: code-group-item OwnershipBroadcastResponse
```json
{
    "key": 
      "gained-ownership" | 
      "lost-ownership" | 
      "gained-ownership-broadcast" | 
      "lost-ownership-broadcast",
    "data": {
        "guid": string,
        "owner": string
    }
}
```
:::
::::

### Esquemas Flatbuffer Incorporados

As mensagens Flatbuffer são enviadas diretamente como mensagens binárias.

::::code-group
:::code-group-item SyncedTransform ('STRS')
```cs
<!-- SAMPLE node_modules/@needle-tools/engine/src/engine-schemes/transforms.fbs -->
```
:::
:::code-group-item SyncedCamera ('SCAM')
```cs
<!-- SAMPLE node_modules/@needle-tools/engine/src/engine-schemes/syncedCamera.fbs -->
```
:::
:::code-group-item Vec2|3|4
```cs
<!-- SAMPLE node_modules/@needle-tools/engine/src/engine-schemes/vec.fbs -->
```
:::
::::

## Avançado: Mensagens Binárias no formato Flatbuffer

As mensagens JSON são fáceis de usar e entender, mas são tipicamente maiores em memória e largura de banda. Para grandes quantidades de dados, ou ao enviar atualizações rápidas, as mensagens binárias são mais rápidas e eficientes. Pode usar mensagens Flatbuffers no Needle Engine para casos em que isso é necessário. Usar Flatbuffers requer etapas de configuração adicionais, como definir e compilar um esquema de mensagem, e é mais difícil depurar, pois está a lidar com mensagens binárias.

Observe que ao enviar e receber mensagens flatbuffer, não há campo `key` – o tipo de mensagem faz parte do esquema Flatbuffer. O que envia e recebe pela conexão Websocket é um único buffer binário.

Envie uma mensagem binária para todos os utilizadores na mesma sala:
```ts
this.context.connection.sendBinary(byteArray: Uint8Array);
```

Subscreva mensagens binárias no formato Flatbuffer:
```ts
this.context.connection.beginListenBinary(identifier:string, callback:(data : ByteBuffer) => void);
```

Cancelar subscrição de mensagens binárias:
```ts
this.context.connection.stopListenBinary(identifier:string);
```

#### Código de Exemplo de Flatbuffers

Antes de poder enviar e receber mensagens Flatbuffer, precisa definir um esquema e compilá-lo para TypeScript. Em seguida, registe o esquema com o sistema de rede e use os métodos de esquema gerados para criar e analisar mensagens.

- [Esquemas Flatbuffer incorporados no Needle Engine](#esquemas-flatbuffer-incorporados)
- [Gerando um esquema](https://google.github.io/flatbuffers/flatbuffers_guide_writing_schema.html)
- [Usando o compilador de esquema](https://google.github.io/flatbuffers/flatbuffers_guide_using_schema_compiler.html)
- [Flatbuffers em Typescript](https://google.github.io/flatbuffers/flatbuffers_guide_use_typescript.html)

::::code-group
:::code-group-item Registrar um esquema
```ts
// Register a new Flatbuffer schema with the networking system
import { registerBinaryType } from '@needle-tools/engine';
import { MyDataModel } from 'my-data-model.js';

const MySchemaIdentifier = "MYSC";

registerBinaryType(MySchemaIdentifier, MyDataModel.getRootAsSyncedTransformModel);
```
:::
:::code-group-item Enviar Mensagens
```ts
// Prepare data for sending by creating a Flatbuffer message:
import { MyDataModel } from 'my-data-model.js';

const MySchemaIdentifier = "MYSC";
const builder = new flatbuffers.Builder();

// Construct a Flatbuffer message
function createMyCustomModel(somePayload: string): Uint8Array {
    builder.clear();
    MyDataModel.startMyDataModel(builder);    
    const guidObj = builder.createString(guid);
    MyDataModel.addSomePayload(builder, guidObj);
    const res = MyDataModel.endMyDataModel(builder);
    builder.finish(res, MySchemaIdentifier);
    return builder.asUint8Array();
}

// Send the data
function sendData() {
    const data = createMyCustomModel("your-payload", this, true);
    this.context.connection.sendBinary(data);
}
```
:::
:::code-group-item Receber Mensagens
```ts
// Subscribe to receive this specific message type:
import { MyDataModel } from 'my-data-model.js';

const MySchemaIdentifier = "MYSC";

this.context.connection.beginListenBinary(MySchemaIdentifier, (data) => {
    const model = MyDataModel.getRootAsMyDataModel(data);
    console.log("Received binary message", model, model.somePayload());
});
```
:::
::::

::: tip Mensagens Flatbuffer personalizadas e persistência
Atualmente, as mensagens binárias personalizadas não podem ser persistidas no servidor de rede. Modifique o servidor de rede e adicione os seus esquemas flatbuffer personalizados para garantir que a propriedade guid pode ser processada.
:::

## Resumo

O Needle Engine torna o complexo tópico de redes acessível e fácil de usar. Pode começar com redes automáticas para os seus componentes com apenas algumas linhas de código, e pode aprofundar-se nas redes manuais quando precisar de mais controlo.

---
Página traduzida automaticamente com IA