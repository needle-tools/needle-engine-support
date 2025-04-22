---
lang: fr-FR
title: Vitrine Mercedes-Benz
editLink: false
---

## À propos

Bonjour, je m'appelle Kryštof et j'ai réalisé un projet de recherche sur Needle. Dans [notre entreprise](https://www.ishowroom.cz/home/), nous voulions déterminer comment Needle pouvait nous aider dans notre flux de travail. Nous avons un client local qui se concentre sur la revente de voitures de luxe. Nous avons déjà livré une application mobile et une expérience VR utilisant Unity. Nous avons environ 30 voitures uniques prêtes dans le moteur. Nous prévoyons d'étendre le site web du client avec des clones numériques visuellement agréables et plus d'options de configuration. Needle pourrait réaliser une conversion parfaite de 1:1 entre les visuels Unity et web. Ce serait un avantage énorme pour notre flux de travail. C'est ce qui a déclenché notre recherche.


<sample src="https://engine.needle.tools/demos/mercedes-benz-demo/" />


## Contexte

Je n'ai pas beaucoup d'expérience avec javascript, typescript ou three.js, donc mon point de vue est celui d'un développeur Unity semi-expérimenté essayant la manière la plus simple de créer une expérience web. Pour ceux qui suggéreraient Unity WebGL, cela ne fonctionne malheureusement pas et n'est pas flexible sur les navigateurs mobiles. Needle c'est 💚


## Éclairage

Notre modèle d'éclairage est basé sur les reflection probes dans Unity. Nous n'avons pas besoin de lumières directionnelles ou ponctuelles, seulement d'un éclairage ambiant.


Nous utilisons cette skybox :

 ![Skybox](/showcase-mercedes/1_skybox.png)

Ce qui ressemble à ceci sur la peinture :

![Paintjob](/showcase-mercedes/2_paintjob_simple.jpg)

Ensuite, pour ajouter un léger détail, j'ai ajouté 2 directional lights avec une intensité insignifiante (0.04) pour créer des specular highlights. Donc, avant, cela ressemblait à ceci :

![Specular off](/showcase-mercedes/3_SpecularHighlights_off.jpg)

Mais avec les directional lights ajoutées, cela a apporté un meilleur dynamisme. L'effet pourrait être approfondi avec une intensité plus élevée :

![Specular on](/showcase-mercedes/4_SpecularHighlights_on.jpg)



## Arrière-plan

La scène ressemble maintenant à ceci :

![No background](/showcase-mercedes/5_NoBackground.jpg)

L'arrière-plan noir n'est pas très joli. Pour différencier les skyboxes visuelles et d'éclairage, j'ai ajouté une sphère inversée qui enveloppe toute la carte.

![With background](/showcase-mercedes/6_MapBackground.png)

Quant au dégradé, il va d'un léger gris à une couleur blanche.

Cet effet pourrait être facilement réalisé avec un simple UV mapping approprié et une texture haute d'un seul pixel qui définirait le dégradé.

J'ai créé un shader unlit dans le shader graph :

![Evironemnt shader](/showcase-mercedes/7_EnvShaderGraph.jpg)

J'ai remarqué un problème de color banding, alors j'ai essayé d'implémenter du dithering. Franchement, cela n'a pas aidé les artefacts, mais je suis sûr qu'il existe une solution simple à ce problème. Donc, la partie supérieure du shader échantillonne le dégradé basé sur l'axe Y dans l'object space. Et la partie inférieure essaie de neutraliser le color banding.

En utilisant des shaders, c'est plus simple d'utiliser et d'itérer le dégradé. En utilisant l'asset Shadergraph markdown de Needle, c'est encore plus simple ! 🌵

![Gradiant](/showcase-mercedes/8_Gradiant.png)


## Faux mouvement de la voiture

La scène est actuellement statique car rien ne bouge. Nous pouvons y remédier en ajoutant une fausse sensation de mouvement. Commençons par ajouter du mouvement aux roues.

Avec un simple component appelé Rotator, nous définissons un axe et une vitesse le long de celui-ci.

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


L'utilisateur voit maintenant une voiture rouler dans le néant profond, la couleur ne ressemble à rien et l'expérience est ennuyeuse. Nous voulons ancrer le modèle et cela se fait en ajoutant une grille et en la décalant de manière à donner l'impression que la voiture bouge. C'est ce que nous voulons obtenir :

![Motion](/showcase-mercedes/10_WheelsAndGrid.png)

Le shader pour la grille était composé de deux parties. Une simple texture carrelée de la grille multipliée par un dégradé circulaire pour faire disparaître les bords.

![Grid](/showcase-mercedes/11_GridShader.jpg)


## Éléments supplémentaires

Cette démo technique a pour objectif de présenter les capacités de la voiture.

Commençons par mettre en évidence les roues.

![Wheel highlight](/showcase-mercedes/12_WheelWithText.png)

Ajouter ce shader à un plane créera un cercle en pointillés qui tourne à une vitesse définie. Combiné avec une UI en world space avec un component Text normal, cela peut mettre en évidence certaines capacités ou paramètres intéressants du produit donné.

![Wheel shader](/showcase-mercedes/13_WheelShader.jpg)

Après avoir présenté les roues, nous voulons terminer avec une information générale sur le produit. Dans ce cas, ce serait le nom complet de la voiture et peut-être quelques configurations disponibles.

![Rear UI](/showcase-mercedes/14_RearUI.jpg)



## Résumé

En utilisant la timeline d'Unity, nous pouvons contrôler quand les pointillés des roues et le texte seront affichés. Ceci est complété par l'animation de la caméra.


## Conclusion

Needle Engine semble être un très bon candidat pour nous !

Il nous manque quelques fonctionnalités.

Ce serait par exemple un support approprié pour les Lit Shader Graphs. Mais rien ne nous empêche de créer des shaders à la manière de three.js et de créer des shaders similaires dans Unity pour que notre équipe de contenu puisse ajuster les matériaux.

Utiliser Needle a été un plaisir ! 🌵


Page automatiquement traduite utilisant l'IA