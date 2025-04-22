---
next: features-overview
---

# Nuestra Visión 🔮

## El futuro de la Web 3D

Creemos que el uso de 3D en la web se expandirá considerablemente en los próximos años. Mientras que hoy las aplicaciones nativas son la norma, cada vez más contenido está disponible como una aplicación web o [PWA](https://web.dev/progressive-web-apps/). Los nuevos dispositivos de VR y AR se [extenderán a la web](https://immersive-web.github.io/webxr-samples/), creando un problema interesante: "responsive" de repente no solo significa "pantalla pequeña" o "pantalla grande", ¡también estás lidiando con espacios, 3D, colocación espacial y potencialmente gafas y mandos!

Añade a eso un impulso hacia una mayor interactividad y colaboración, y tienes una mezcla interesante de desafíos.

En Needle, creemos que idear y crear en este espacio debería ser fácil. Nos propusimos acelerar las cosas, creando nuestro propio runtime para alcanzar estos objetivos. Por eso estamos integrando la capacidad de desplegar en AR y VR directamente en nuestros componentes principales, y probamos continuamente que las nuevas ideas funcionen en todas las plataformas.

## ¿Por qué otra plataforma para 3D en la web? ¿No hay suficientes opciones ya?

Hay numerosas opciones, ¡es cierto! Descubrimos que los sistemas actuales<sup>1</sup> se pueden clasificar a grandes rasgos en dos categorías: algunos tienen un excelente manejo de assets, herramientas y flujos de trabajo amigables para artistas, pero generan una especie de blob binario, y otros están más enfocados en el código, son amigables para desarrolladores y permiten una excelente integración en los flujos de trabajo web modernos<sup>2</sup>.

Queremos unir estos mundos y combinar lo mejor de ambos: flujos de trabajo amigables para artistas y tecnologías web modernas. Combinado con formatos modernos y un flujo de trabajo ágil, creemos que esto permitirá a muchos más creadores llevar su contenido a la web. También vimos una oportunidad para hacer bien AR, VR y la colaboración desde el principio.

<sup>1</sup>: _Ejemplos incluyen Unity, PlayCanvas, three.js, react-three-fiber, Babylon, A-Frame, Godot, y muchos más._
<sup>2</sup>: _¡Hay más matices en esto de los que caben en un párrafo introductorio! Todos los motores y frameworks tienen sus fortalezas y debilidades, y están en constante evolución._

## Creando un Flujo de Trabajo, no un Editor

Creemos que la próxima ola de aplicaciones 3D en la web vendrá con mejores _flujos de trabajo_: todos deberían poder montar una escena 3D, una galería de arte, presentar un producto o un escaneo 3D en la web o hacer juegos simples. Alcanzar este objetivo requerirá más que simplemente soportar un sistema en particular y exportar a la web desde allí.

Nuestro objetivo es permitir que las personas lleven datos a la web desde _sus_ herramientas creativas: ya sea Unity, Blender, Photoshop o alguna otra. Somos conscientes de que este es un gran objetivo, pero en lugar de hacerlo todo a la vez, queremos iterar y acercarnos a él juntos.

## Estándares Abiertos en lugar de Contenedores Propietarios

En el núcleo de Needle Engine se encuentra el formato [glTF](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html) y su capacidad para ser extendido con extensiones personalizadas. El objetivo es: un solo archivo `.glb` puede contener los datos de toda tu aplicación.

Vale la pena señalar que no es un objetivo enviar código real dentro de glTF; enviar y ejecutar código es trabajo de los runtimes web modernos y el bundling. Ciertamente podemos imaginar que las representaciones abstractas de la lógica (por ejemplo, gráficos, máquinas de estado, etc.) puedan estandarizarse hasta cierto punto y permitir mundos interoperables, pero aún no estamos ahí.

[Lee más sobre nuestro uso de glTF y extensiones](./technical-overview.md)

# Objetivos y No Objetivos

## Objetivos
- La iteración debe ser rápida y el despliegue debe ser veloz.
- Trabajar en proyectos web 3D debe ser tan fácil como trabajar en proyectos web 2D.
- Los desarrolladores y artistas deben poder colaborar directamente.
- El web responsive se extiende más allá de las pantallas: AR y VR deben estar integrados, no ser añadidos posteriores.
- Queremos contribuir a proyectos de código abierto.
- Discusión abierta sobre 3D y estándares web.
- Capacidad para traer y llevar tus datos en formatos abiertos.
- Capacidad para elegir qué web framework usar, sin dependencia de frameworks y proveedores particulares.
- Los casos de uso comunes funcionan sin o con experiencia de codificación limitada.

## No Objetivos
- No es un objetivo tener una cobertura del 100% de todas las combinaciones de versiones de Editor, conjuntos de características, pipelines de renderizado.
- No es un objetivo proporcionar un entorno completo sin código.
- No es un objetivo igualar el conjunto de características, capacidades o rendimiento en tiempo de ejecución de otros motores.

# Relación con otros motores y frameworks

## Needle Engine y Unity WebGL

Tras trabajar con Unity durante muchos años, hemos descubierto que si bien el motor y el editor progresan a un gran ritmo, la salida WebGL se ha quedado un poco atrás. La integración de los players de Unity en sistemas basados en web es bastante difícil, "hablar" con el sitio web circundante requiere una serie de soluciones alternativas, y lo más importante, los tiempos de iteración son muy lentos debido a la forma en que Unity empaqueta todo el código en WebAssembly a través de IL2CPP. Estas tecnologías son asombrosas y resultan en un gran rendimiento en tiempo de ejecución y mucha flexibilidad. Pero son mucho más lentas y cerradas en comparación con los flujos de trabajo de desarrollo web modernos, por lo que decidimos tomar el asunto en nuestras propias manos.

## Needle Engine y three.js

Needle Engine se basa en three.js. Todo el renderizado pasa por él, los archivos glTF se cargan a través de las interfaces de extensión de three, y nuestro sistema de componentes gira en torno a Object3D y el grafo de escena de three. Estamos comprometidos a subir algunos de nuestros cambios y mejoras, creando pull requests e informando de problemas a lo largo del camino.

Página traducida automáticamente usando IA
