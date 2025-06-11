---
lang: po-PT
title: Apresentação Mercedes-Benz
editLink: false
---

## Sobre

Olá, o meu nome é Kryštof e fiz um projeto de pesquisa sobre Needle. Na [nossa empresa](https://www.ishowroom.cz/home/), queríamos determinar como o Needle nos pode ajudar no nosso fluxo de trabalho. Temos um cliente local que se foca na revenda de carros de luxo. Já entregámos uma aplicação móvel e uma experiência VR usando Unity. Temos cerca de 30 carros únicos prontos no motor. Planeamos expandir o website do cliente com clones digitais visualmente agradáveis com mais opções de configuração. O Needle poderia alcançar uma conversão perfeita de 1:1 entre as imagens de Unity e da web. Seria um benefício enorme para o nosso fluxo de trabalho. Foi isso que despertou a nossa pesquisa.


<sample src="https://engine.needle.tools/demos/mercedes-benz-demo/" />


## Contexto

Não tenho muita experiência com javascript, typescript ou three.js, por isso o meu ponto de vista é o de um desenvolvedor Unity semi-experiente a tentar a forma mais simples de criar uma experiência web. Para aqueles que sugeririam Unity WebGL, infelizmente isso não funciona e não é flexível em browsers móveis. Needle é 💚


## Iluminação

O nosso modelo de iluminação é baseado em reflection probes no Unity. Não precisamos de luzes direcionais ou pontuais, apenas iluminação ambiente.


Estamos a usar este skybox:

 ![Skybox](/showcase-mercedes/1_skybox.png)

Que tem este aspeto na pintura:

![Paintjob](/showcase-mercedes/2_paintjob_simple.jpg)

Depois, para adicionar um pequeno detalhe, adicionei 2 luzes direcionais com uma intensidade insignificante (0.04) para criar realces especulares. Antes parecia assim:

![Specular off](/showcase-mercedes/3_SpecularHighlights_off.jpg)

Mas com as luzes direcionais adicionadas, acrescentou uma dinâmica melhor. O efeito poderia ser aprofundado com maior intensidade:

![Specular on](/showcase-mercedes/4_SpecularHighlights_on.jpg)



## Fundo

A cena agora tem este aspeto:

![No background](/showcase-mercedes/5_NoBackground.jpg)

O fundo preto não é muito bonito. Assim, para diferenciar entre skyboxes visuais e de iluminação, adicionei uma esfera inversa que envolve todo o mapa.

![With background](/showcase-mercedes/6_MapBackground.png)

Quanto ao gradiente, ele vai de um cinzento leve a uma cor branca.

Este efeito poderia ser facilmente feito apenas com um mapeamento UV adequado e uma textura com um único pixel de altura que definiria o gradiente.

Criei um unlit shader no shader graph:

![Evironemnt shader](/showcase-mercedes/7_EnvShaderGraph.jpg)

Notei um problema de banding de cor, então tentei implementar dithering. Francamente, não ajudou os artefactos, mas aposto que há uma solução simples para esse problema. A parte superior do shader amostra o gradiente com base no eixo Y no espaço de objeto. E a parte inferior tenta anular o banding de cor.

Ao usar shaders, é mais simples de usar e iterar o gradiente. Usando o asset Shadergraph markdown do Needle, é ainda mais simples! 🌵

![Gradiant](/showcase-mercedes/8_Gradiant.png)


## Movimento falso do carro

A cena neste momento é estática, pois nada se move. Podemos anular isso adicionando uma sensação falsa de movimento. Vamos começar por adicionar movimento às rodas.

Com um componente simples chamado Rotator, definimos um eixo e velocidade ao longo dele.

![Rotator](/showcase-mercedes/9_Rotator.png)
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";

export enum RotationAxis {
    X, Y, Z
}

export class Rotator extends Behaviour {
    //@type RotationAxis
    @serializable()
    axis : RotationAxis = RotationAxis.X;

    @serializable()
    speed : number = 1;

    update() {
        const angle = this.speed * this.context.time.deltaTime;
        switch(this.axis) {
            case RotationAxis.X:
                this.gameObject.rotateX(angle);
                break;
            case RotationAxis.Y:
                this.gameObject.rotateY(angle);
                break;
            case RotationAxis.Z:
                this.gameObject.rotateZ(angle);
                break;
        }
    }
}
```


O utilizador agora vê um carro a conduzir num vazio profundo, a cor não se assemelha a nada e a experiência é aborrecida. Queremos assentar o modelo, e isso é feito adicionando uma grelha e depois deslocando-a para que pareça que o carro está a mover-se. É isto que queremos alcançar:

![Motion](/showcase-mercedes/10_WheelsAndGrid.png)

O shader para a grelha era composto por duas partes. Uma textura em mosaico simples da grelha que está a ser multiplicada por um gradiente circular para fazer as bordas desaparecerem.

![Grid](/showcase-mercedes/11_GridShader.jpg)


## Elementos extra

Esta demo técnica tem como objetivo mostrar as capacidades do carro.

Vamos começar por destacar as rodas.

![Wheel highlight](/showcase-mercedes/12_WheelWithText.png)

Adicionar este shader a um plano resultará num círculo tracejado que está a rodar a uma velocidade definida. Combinado com UI em espaço de mundo com um componente Text normal, isto pode destacar algumas capacidades ou parâmetros interessantes do produto em questão.

![Wheel shader](/showcase-mercedes/13_WheelShader.jpg)

Depois de mostrar as rodas, queremos terminar com uma informação ampla sobre o produto. Neste caso, seria o nome completo do carro e talvez algumas configurações disponíveis.

![Rear UI](/showcase-mercedes/14_RearUI.jpg)



## Resumo

Usando a timeline do Unity, podemos controlar quando os traços das rodas e o texto serão mostrados. Isto é complementado pela animação da câmara.


## Conclusão

Needle Engine parece ser um candidato muito bom para nós!

Existem algumas funcionalidades que sentimos falta.

Seria, por exemplo, suporte adequado para os Lit Shader Graphs. Mas nada nos impede de criar shaders à maneira three.js e criar shaders semelhantes em Unity para a nossa equipa de conteúdo ajustar os materiais.

Usar Needle foi ótimo! 🌵


Página traduzida automaticamente usando IA