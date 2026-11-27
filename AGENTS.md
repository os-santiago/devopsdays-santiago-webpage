# AGENTS.md: contexto para agentes de IA (y personas)

Sitio oficial de **DevOpsDays Santiago**, https://devopsdayschile.cl. Edición actual: **2027, tema "DevOpsDays Land"**, un mundo de juego de plataformas.
Lee este archivo antes de cambiar código, textos o diseño. Si cambias una decisión de abajo, actualiza este archivo en el mismo PR.

## Stack y comandos

- Vite, React, TypeScript, Tailwind y shadcn/ui (`src/components/ui/*` es código generado; no lo toques salvo que sea necesario).
- Animaciones en **CSS nativo** (scroll-driven animations). `framer-motion` solo queda para el menú móvil (`AnimatePresence`).
- `npm run dev` · `npm test` · `npm run test:coverage` (mínimo 80 %) · `npm run lint` (0 errores) · `npm run build`
- Skills del repo: `skills/lint-zero-errors-guard` y `skills/unit-test-coverage-guard`.
- `tsc` muestra errores preexistentes en `src/components/ui/*` y en `src/test/setup.ts`; no son tuyos.

## Datos del evento 2027: una sola fuente

Todo vive en `event2027` y `sponsorTiers` dentro de `src/data/event.ts`. **Nunca escribas fechas, cupos, URLs ni estados directo en un componente.**

- Viernes **3 de septiembre de 2027**, **un solo día**, de 8:00 a 18:00, en el **Centro de Extensión UC** (Alameda 390).
- **Zona horaria: UTC−4.** El horario de verano de Chile empieza el 4–5 de septiembre de 2027, así que el 3 de septiembre todavía rige UTC−4. Esto aplica a `startsAt`, a `public/devopsdays-santiago-2027.ics` y al JSON-LD de `index.html`. Si cambia la fecha, actualiza los tres.
- **Entradas: gratuitas, por postulación, 700 cupos.** El equipo organizador aprueba a quién se le da entrada.
- **CFP:** todavía sin fecha de apertura.
- **Patrocinio:** 3 Platinum, 6 Gold, 4 Silver y 6 "Comunidades y Training". Aún no hay sponsors confirmados. Los precios y el resto de los beneficios se publicarán más adelante; por ahora solo se muestran el stand, la visibilidad y la publicidad.
- **Video resumen 2026:** YouTube `a69mWcLuZEs`. Canal: https://www.youtube.com/@DevOpsDaysSantiago

### Cambiar de estado (una línea en `event2027`)

| Cuando... | Cambia | Efecto |
|---|---|---|
| Abre la postulación a entradas | `tickets: "open"` y completa `ticketsApplyUrl`, `ticketsRulesUrl` | El hero, el navbar y la sección de entradas muestran "Postular" y "Ver bases" |
| Cierra la postulación | `tickets: "closed"` | Botón "Postulaciones cerradas" |
| Abre o cierra el CFP | `cfp: "open"` / `"closed"` y completa `cfpUrl` | Cambia la sección CFP |
| Hay agenda o speakers | Llena `agendaItems` / `speakers` | Desaparecen los 🔒 del menú y el estado "Nivel bloqueado" |
| Se confirma un sponsor | Aún no existe ese camino. Agrega logos a `sponsorTiers` y renderízalos antes de los espacios vacíos en `SponsorsSection` | — |

Mientras un estado sea `"soon"`, el CTA es **"Avísame"** (`NotifyDialog`). Envía el correo con el `contact.php` existente, con el asunto "Avísame 2027 – Postulación entradas", así que cada inscripción llega como un correo al buzón de contacto y no a una lista. Si el volumen crece, migra a un formulario o una lista de correo.

## Reglas de copyright (obligatorias)

El tema está inspirado en juegos de plataformas, **sin referencias directas a Nintendo ni a Mario**.

- **Prohibido:**
  - bloques `?`, tuberías verdes, hongos, flores de fuego, estrellas de invencibilidad, castillos o princesas
  - "1-UP", "Super", "World 1-1"
  - tipografías pixel que imiten las de Nintendo
  - sonidos de salto o de moneda
  - la "M" roja, azul y amarilla
- **Permitido** (son tropos genéricos o vienen de nuestros assets): islas flotantes, bloques `{ }` y de engranaje, monedas con estrella, letreros de madera, "Niveles", "Mundo Santiago", "Desbloquea", "Nivel bloqueado".
- **Mascota:** solo la Shiba con **polera a rayas** (`design/2027/mascot-thumbsup.jpg` y la escena del hero). Existió una versión de polera roja sentada que **se descartó y se sacó del repo**, porque se parece demasiado a la vestimenta característica de Mario. No la reintroduzcas.
- **Elementos chilenos que sí suman:** copihue, empanadas, mote con huesillo, teleférico, cordillera, Costanera Center, bandera.

## Sistema de diseño

- **Tokens** (`src/index.css`, `tailwind.config.ts`): colores `land-{sky,navy,red,coin,grass,wood,pink}`. Tema claro de "cielo".
- **Fuentes:** `font-display` es Baloo 2 (títulos); el texto usa Poppins.
- **Contraste:** sobre celeste o amarillo el texto **siempre va en azul marino**. El texto blanco solo va sobre azul marino o rojo.
- **Clases propias** (no crees componentes nuevos para esto):
  - `.toy`: borde azul marino de 3 px y sombra dura.
  - `.btn-block`, más `.btn-coin`, `.btn-cloud` y `.btn-sm`: botones 3D que "saltan".
  - `.eyebrow`: etiqueta pequeña sobre los títulos.
  - `.grass-edge`: borde de pasto entre secciones.
- **Movimiento:**
  - `.reveal`: aparece al hacer scroll.
  - `.bob`: flota.
  - `.drift`: las nubes cruzan la pantalla.
  - `.scroll-zoom`: zoom del arte del hero al hacer scroll.
  - Barra de progreso del navbar: `.level-progress`, con la mascota caminando.
  - Todo está dentro de `prefers-reduced-motion: no-preference` y `@supports (animation-timeline: view())`. Sin soporte, el contenido se ve estático; nunca dependas de la animación para mostrar contenido.
  - `.reveal` y `.bob` no se combinan en el mismo elemento, porque ambas usan `animation` y la última pisa a la otra. Ponlas en elementos anidados.
- **Variables CSS para animaciones:** `--delay`, `--tilt` y `--duration` (se pasan por `style`).

## Estructura de la portada (orden promocional, no lo cambies sin motivo)

1. Hero, con la entrada gratis visible y los CTA arriba del pliegue en 1440×900
2. Cuenta regresiva
3. Mundo Santiago
4. Revive 2026, la única sección de video, con `youtube-nocookie` y `loading="lazy"`
5. Cómo se juega
6. Entradas
7. CFP
8. Aliados
9. Preguntas frecuentes
10. Footer

El teaser 2027 (`public/teaser-2027.mp4`) se abre en un diálogo desde el hero.
**Principio:** mientras casi todo esté "pronto", cada visita debe terminar en una acción posible hoy: avisarme, agregar al calendario o ver 2026.
En las preguntas frecuentes, **no inventes respuestas**. Lo no confirmado dice "Pronto lo confirmaremos.".

## Archivo 2026 (`/2026/`)

- El sitio 2026 está congelado en la etiqueta git **`v2026-final`** y su build vive en `public/2026/` (con su `.htaccess`). Por eso sale en cada deploy.
- **¿Por qué no es una carpeta aparte en el servidor?** `scripts/ci/ftps_deploy.sh purge` hace `rm -rf *` en el directorio remoto en cada release.
- Las fotos del archivo se sirven desde **`public/speaker-images/` en la raíz**. No borres esa carpeta.
- Para regenerar el archivo:

  ```sh
  git worktree add /tmp/v2026 v2026-final
  cd /tmp/v2026 && npm ci
  npx vite build --base=/2026/ --outDir dist-2026
  ```

  Luego copia `dist-2026/{index.html,assets}` a `public/2026/`, sin `api/` ni `speaker-images/`.
- `eslint.config.js` ignora `public/2026`.

## Assets 2027

- **Fuentes:** `design/2027/` (`scene-hero.jpg`, `mascot-thumbsup.jpg`, `logo-land.jpg`, `badge-2027.jpg`). Son copias comprimidas, suficientes para la web. Los originales en alta resolución y con capas los guarda el diseñador. **No edites estas fuentes a mano:** reemplázalas cuando llegue una versión mejor. Las versiones web están en `src/assets/2027/`:
  - **WebP a varios tamaños:** `scene-*` (hero), `mascot-*` y `logo-land-*` con fondo recortado, y `badge-*`.
  - **SVG dibujados a mano:** `svg/` contiene `block-braces`, `block-gear`, `coin` y `cloud`.
- En `public/`: `og-2027.jpg` (1200×630), `teaser-poster.jpg`, `favicon.png`, `apple-touch-icon.png` y `teaser-2027.mp4`. El video vive solo ahí, no tiene copia en `design/`.
- **Regenerar** cuando el diseñador mande versiones nuevas: `python -I scripts/assets/build_2027_assets.py design/2027 src/assets/2027 public`. Necesita Pillow en un venv temporal; no lo agregues al proyecto. `cwebp` no es necesario.
- Pendiente del diseñador: la mascota en alta resolución o en SVG con transparencia, y la escena del hero separada en capas para hacer parallax real.

## Tests

- `src/test/setup.ts` simula `framer-motion`, y las animaciones CSS no necesitan mocks.
- `AgendaPage` y `SpeakersPage` reciben datos por props (`items`, `speakerList`, `sessions`). Los tests pasan datos de ejemplo porque los datos reales de 2027 están vacíos.
- Para probar estados `"open"`, pasa `status` por prop. Las URLs de formularios se asignan en `beforeAll` sobre `event2027`, porque un `<a href="">` no cuenta como enlace.
- `Countdown` exporta `timeLeft()`, una función pura, para testearla.

## Pendientes de la organización (al 27-11-2026)

- Respuestas a las preguntas frecuentes: quién puede postular, lista de espera, idioma y comida.
- URLs del formulario de postulación, de las bases y del CFP, y sus fechas de apertura.
- Precios y beneficios completos de cada nivel de patrocinio.
- Confirmar si los correos de "Avísame" pueden seguir llegando al buzón de contacto.
