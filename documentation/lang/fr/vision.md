---
next: features-overview
---

# Notre Vision 🔮

## L'avenir du Web 3D

Nous pensons que l'utilisation de la 3D sur le web va considérablement se développer dans les prochaines années. Alors qu'aujourd'hui les applications natives sont la norme, de plus en plus de contenu est rendu disponible sous forme d'application web ou de [PWA](https://web.dev/progressive-web-apps/). De nouveaux appareils VR et AR vont [s'étendre au web](https://immersive-web.github.io/webxr-samples/), créant un problème intéressant : la réactivité ne signifie plus seulement "petit écran" ou "grand écran", vous avez aussi affaire à des espaces, de la 3D, du placement spatial et potentiellement des lunettes et des contrôleurs !

Ajoutez à cela une poussée vers plus d'interactivité et de collaboration, et vous obtenez un mélange intéressant de défis.

Chez Needle, nous pensons que l'idéation et la création dans cet espace devraient être faciles. Nous nous sommes donné pour objectif d'accélérer les choses – en créant notre propre runtime pour atteindre ces objectifs. C'est pourquoi nous intégrons la possibilité de déployer en AR et VR directement dans nos composants de base, et testons continuellement que les nouvelles idées fonctionnent sur toutes les plateformes.

## Pourquoi une autre plateforme pour la 3D sur le web ? N'y a-t-il pas déjà assez d'options ?

Il existe de nombreuses options, c'est vrai ! Nous avons constaté que les systèmes actuels<sup>1</sup> peuvent être grossièrement classés en deux catégories : certains ont une excellente gestion des assets, des outils et des workflows conviviaux pour les artistes, mais produisent une sorte de "binary blob", et d'autres sont plus axés sur le code, conviviaux pour les développeurs et permettent une excellente intégration dans les workflows web modernes<sup>2</sup>.

Nous voulons faire le pont entre ces mondes et combiner le meilleur des deux : des workflows conviviaux pour les artistes et des technologies web modernes. Combiné avec des formats modernes et un workflow rapide, nous pensons que cela permettra à beaucoup plus de créateurs d'apporter leur contenu sur le web. Nous avons également vu une opportunité de bien gérer l'AR, la VR et la collaboration dès le départ.

<sup>1</sup>: _Exemples incluent Unity, PlayCanvas, three.js, react-three-fiber, Babylon, A-Frame, Godot, et bien d'autres._
<sup>2</sup>: _Il y a plus de nuances à cela que ce qui peut être abordé dans un paragraphe d'introduction ! Tous les moteurs et frameworks ont leurs forces et leurs faiblesses, et évoluent constamment._

## Créer un Workflow, pas un Éditeur

Nous pensons que la prochaine vague d'applications 3D sur le web viendra avec de meilleurs _workflows_ : tout le monde devrait être capable de créer une scène 3D, une galerie d'art, de présenter un produit ou un scan 3D sur le web ou de réaliser des jeux simples. Atteindre cet objectif nécessitera plus que le simple support d'un système particulier et l'exportation vers le web à partir de celui-ci.

Notre objectif est de permettre aux gens d'apporter des données sur le web à partir de _leurs_ outils de création : que ce soit Unity, Blender, Photoshop, ou autre chose. Nous sommes conscients que c'est un grand objectif – mais au lieu de tout faire en même temps, nous voulons itérer et nous en rapprocher ensemble.

## Standards Ouverts au lieu de Conteneurs Propriétaires

Au cœur de Needle Engine se trouve le format [glTF](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html) et sa capacité à être étendu avec des extensions personnalisées. L'objectif est le suivant : un seul fichier `.glb` peut contenir toutes les données de votre application.

Il est important de noter que l'objectif n'est pas d'embarquer du code réel à l'intérieur de glTF ; l'embarquement et l'exécution du code sont le travail des runtimes web modernes et du bundling. Nous pouvons certainement imaginer que des représentations abstraites de logique (par exemple, des graphes, des machines à états, etc.) puissent être standardisées à un certain degré et permettre des mondes interopérables, mais nous n'en sommes pas encore là.

[En savoir plus sur notre utilisation de glTF et des extensions](./technical-overview.md)

# Objectifs et Non-Objectifs

## Objectifs
- L'itération doit être rapide et le déploiement doit être rapide.
- Travailler sur des projets web 3D doit être aussi simple que travailler sur des projets web 2D.
- Les développeurs et les artistes doivent pouvoir collaborer directement.
- Le web réactif s'étend au-delà des écrans – l'AR et la VR doivent être intégrées, pas des ajouts ultérieurs.
- Nous voulons contribuer aux projets open source.
- Discussion ouverte concernant les standards 3D et web.
- Capacité à apporter et à récupérer vos données dans des formats ouverts.
- Capacité à choisir le framework web que vous utilisez, et non à être lié à des frameworks et des fournisseurs particuliers.
- Les cas d'utilisation courants fonctionnent sans ou avec une expérience de codage limitée.

## Non-Objectifs
- L'objectif n'est pas d'avoir une couverture à 100 % de toutes les combinaisons de versions d'Editor, d'ensembles de fonctionnalités, de pipelines de rendu.
- L'objectif n'est pas de fournir un environnement entièrement sans code.
- L'objectif n'est pas d'égaler l'ensemble des fonctionnalités, les capacités ou les performances d'exécution d'autres moteurs.

# Relation avec d'autres moteurs et frameworks

## Needle Engine et Unity WebGL

En travaillant avec Unity pendant de nombreuses années, nous avons constaté que si le moteur et l'éditeur progressent à un rythme soutenu, la sortie WebGL a quelque peu pris du retard. L'intégration des players Unity dans les systèmes web est plutôt difficile, "parler" au site web environnant nécessite un certain nombre de contournements, et surtout, les temps d'itération sont très lents en raison de la manière dont Unity compile tout le code en WebAssembly via IL2CPP. Ces technologies sont géniales et permettent d'obtenir d'excellentes performances d'exécution et une grande flexibilité. Mais elles sont tellement plus lentes et isolées par rapport aux workflows de développement web modernes que nous avons décidé de prendre les choses en main.

## Needle Engine et three.js

Needle Engine s'appuie sur three.js. Tout le rendu passe par lui, les fichiers glTF sont chargés via les interfaces d'extension de three, et notre système de composants s'articule autour de Object3D et du graphe de scène de three. Nous nous engageons à intégrer certaines de nos modifications et améliorations en amont, en créant des "pull requests" et en signalant des problèmes en cours de route.

Page automatiquement traduite utilisant l'IA