<br/>
<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Logo Needle" alt="Logo Needle"/> +
    <span style="font-size: 50px;">✨</span>
</div>

# S'intégrer à d'autres outils

Needle Engine est conçu pour être flexible et extensible. Il peut être intégré à d'autres outils et services pour améliorer votre flux de travail afin d'intégrer la 3D riche et interactive sur le web depuis n'importe quel logiciel.

Au cœur d'une intégration personnalisée avec Needle Engine se trouve le format 3D glTF. C'est le format le plus largement pris en charge pour la 3D sur le web, et le plus polyvalent. Ce format léger peut stocker des modèles 3D, des animations, des textures et toutes sortes de données supplémentaires. glTF est extensible, c'est exactement pourquoi nous l'avons choisi comme base pour Needle Engine. Il nous permet d'ajouter des fonctionnalités riches et des capacités interactives aux fichiers 3D, notamment un meilleur rendu, la physique, les interactions, la XR, la mise en réseau, et plus encore.

En raison de l'utilisation du format standardisé glTF pour l'échange, la création d'une intégration de base dans n'importe quel logiciel est facile – il suffit d'exporter vos ressources 3D en tant que fichiers glTF et de les importer dans Needle Engine. De là, vous pouvez ajouter d'autres fonctionnalités à votre intégration, pour prendre en charge nos extensions de script. Habituellement, cela se fait via un plugin, une extension ou un hook d'exportation dans votre logiciel 3D.

## Structure d'une intégration personnalisée
La structure d'une intégration personnalisée ressemble à ceci :

1.  Exportez vos ressources 3D en tant que fichiers glTF. À ce stade, votre intégration est probablement aussi simple que de cliquer sur le bouton d'exportation dans votre logiciel 3D.
2.  Utilisez le fichier glTF dans un projet web utilisant Needle Engine.
    *   Il peut s'agir d'un projet web créé avec une autre intégration, téléchargé à partir d'un exemple, ou un nouveau projet web créé avec `npx needle-create`.
    *   Exportez le fichier glTF dans le dossier `assets`. Votre application web devrait se rafraîchir automatiquement chaque fois que vous réexportez le fichier glTF.
3.  À ce stade, vous avez une intégration fonctionnelle de base, et vous pourriez déjà ajouter des fonctionnalités personnalisées via TypeScript dans le projet web.
4.  L'étape suivante consiste à ajouter un moyen de créer et d'ajuster des composants dans votre logiciel. Selon le logiciel, cela peut être fait via une interface utilisateur personnalisée, un script ou un plugin.
    *   Pour commencer, essayez avec un composant comme `DragControls`. Il a quelques options, mais les valeurs par défaut sont suffisantes pour commencer.
    *   Ensuite, passez aux composants qui nécessitent une configuration. Un bon point de départ sont nos `Everywhere Actions`, car ils permettent aux créateurs de créer un large éventail d'expériences interactives sans avoir besoin d'écrire de code.
5.  Exportez ces composants dans le cadre de l'extension glTF `NEEDLE_components` pour chaque nœud. Habituellement, cela se fait en ajoutant une extension glTF ou un hook personnalisé à l'exportateur glTF existant dans votre logiciel.
6.  Intégrez-vous à un projet web afin que l'interface utilisateur puisse être générée pour les composants personnalisés. Pour Unity et Blender, nous appelons cela `Component Compiler` – il crée automatiquement une interface utilisateur pour les composants de votre projet et sert de pont entre les composants TypeScript et votre logiciel 3D.

## Intégrer le flux de travail du projet web

Une intégration complète pourrait également gérer une plus grande partie du flux de travail du projet web. Toutes ces opérations peuvent être effectuées à partir de la ligne de commande, mais pour faciliter l'utilisation, elles peuvent être soigneusement enveloppées dans une interface graphique ou un menu personnalisé dans votre logiciel 3D. Cela inclut :

1.  Créer un nouveau projet ou changer l'emplacement du projet web
2.  Exécuter le projet web depuis votre logiciel 3D
    *   Notre [intégration Unity](./../unity/) remplace le bouton "Play" pour exécuter le projet web.
    *   L'[intégration Blender](./../blender/) a un bouton "Play" personnalisé qui exécute le projet web.
3.  Compiler le projet web dans un dossier
4.  Télécharger le projet compilé sur Needle Cloud ou une autre plateforme, et mémoriser l'ID du projet et l'ID de l'équipe
    *   Notre intégration Unity affiche également les derniers téléversements de votre équipe et vous permet d'accéder au dernier déploiement d' un projet.
5.  Télécharger/télécharger des ressources individuelles sur Needle Cloud ou une autre plateforme

:::tip Contactez-nous si vous prévoyez de créer une intégration personnalisée !
Veuillez nous contacter si vous êtes intéressé par la création d'une intégration personnalisée. Nous sommes heureux de vous aider dans le processus et de vous expliquer plus de détails. Pour les clients Enterprise, nous proposons également des intégrations personnalisées en tant que service.
:::

---
---
Page automatiquement traduite par IA