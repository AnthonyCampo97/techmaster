# techmaster
# Tech Master (tmservicios.net) — Documento de Referencia del Proyecto

> Generado a partir del análisis del repositorio `AnthonyCampo97/techmaster` (rama principal), desplegado en GitHub Pages con dominio propio `www.tmservicios.net`.

---

## 1. Resumen del proyecto

Sitio web informativo/comercial para **Tech Master**, negocio de servicios tecnológicos en Cali, Colombia (mantenimiento de equipos, consultoría TI, CCTV, diseño web, Google Ads, venta de equipos y repuestos). Es un sitio **estático multipágina**, en **HTML/CSS/JS puro** (sin frameworks ni build step), pensado para edición directa y despliegue vía `git push` a GitHub Pages.

- **Hosting:** GitHub Pages
- **Dominio:** `www.tmservicios.net` (archivo `CNAME` en la raíz)
- **Idioma:** español (`lang="es"`)
- **Tipografía:** Montserrat (Google Fonts)
- **Analítica:** Google Analytics (`G-M5FQRSTSHJ`), presente en las 4 páginas principales
- **SEO:** metadatos Open Graph + `robots.txt` + `sitemap.xml` ya configurados

---

## 2. Estructura de archivos

```
techmaster/
├── CNAME                     → dominio custom (www.tmservicios.net)
├── robots.txt                → permite indexación, referencia al sitemap
├── sitemap.xml                → 4 URLs: /, /services.html, /equipos.html, /contact.html
├── README.md
├── index.html                 → Página de inicio
├── services.html               → Catálogo de servicios (detallado, con anclas #s01–#s09)
├── equipos.html                → Catálogo de equipos/repuestos/periféricos con filtros
├── contact.html                → Formulario de contacto (EmailJS)
├── creditos.html                → Créditos de imágenes de banco (Freepik)
├── javascript/
│   └── script.js               → Lógica GLOBAL compartida (menú móvil) — se importa en todas las páginas
├── style/
│   ├── style.css                → Base global: variables, header, menú móvil, footer, WhatsApp flotante
│   ├── style_index.css           → Estilos específicos de Inicio (hero, stats, about, services, why, cta)
│   ├── style_services.css        → Estilos específicos de Servicios
│   ├── style_equipos.css         → Estilos específicos de Equipos
│   ├── style_contact.css         → Estilos específicos de Contacto
│   ├── style_tablet.css          → Media query min-width:600px (aplica a todas las páginas)
│   └── style_desktop.css         → Media query min-width:1000px (aplica a todas las páginas)
└── picture/
    ├── Logos/                    → Logos, favicon, imágenes de footer/menú
    ├── banner/                    → Imágenes grandes (ej. sección "Quiénes somos")
    ├── icons/                     → Iconos SVG (ej. icono de menú hamburguesa)
    └── services/                  → Fotos usadas en las tarjetas de servicios.html
```

**Nota:** `equipos.html` actualmente usa imágenes de stock alojadas en **Unsplash** (URLs externas `images.unsplash.com`), no imágenes propias en `/picture/`. Es un punto a tener en cuenta si se quiere migrar a fotos propias.

---

## 3. Patrón repetido en cada página HTML

Las 4 páginas principales (`index`, `services`, `equipos`, `contact`) comparten la misma estructura de "esqueleto":

1. **`<head>`**: metadatos SEO + Open Graph, Google Analytics, fuentes, favicon, hojas de estilo (base + específica de la página + tablet + desktop).
2. **`<header>`**: mismo bloque en las 4 páginas — logo, menú hamburguesa móvil (`nav-mobile` + `mobile-menu`), y menú de escritorio (`navbar-left` + `navbar-center`). El enlace activo se marca con `aria-current="page"`.
3. **`<main>`**: contenido único de cada página (ver sección 4).
4. **`<footer>`**: idéntico en las 4 páginas — dos logos + texto con correo de contacto.
5. **Botón flotante de WhatsApp** (SVG inline): idéntico en las 4 páginas, mismo número `573225064877`.
6. **`<script>` final**: `javascript/script.js` (menú móvil) + scripts inline propios de cada página (animaciones, scroll reveal, formulario, filtros).

> ⚠️ Como el header, footer y botón de WhatsApp están **duplicados manualmente en cada archivo HTML**, cualquier cambio en ellos (por ejemplo el número de WhatsApp, un ítem de menú nuevo, o el texto del footer) debe replicarse en las 4 páginas.

---

## 4. Detalle por página

### 4.1 `index.html` — Inicio
Secciones (en orden):
- **Hero** con efecto *typewriter* (JS inline: alterna las palabras `tecnología`, `hardware`, `software`, `tu negocio`, `el futuro`)
- **Stats section**: contador animado (`data-target` + IntersectionObserver) — 4 métricas (servicios, años, clientes, aliados)
- **Quiénes somos** (`about-section`): texto + imagen (`Banner_H_Portatil3.jpg`)
- **Servicios** (`services-section`): grid de 6 tarjetas resumen, cada una enlaza a un ancla de `services.html` (`#s02`, `#s03`, `#s05`, `#s07`, `#s09`, `#s08`)
- **Por qué elegirnos** (`why-section`): 4 tarjetas
- **CTA final**: botones a contacto + WhatsApp

Scripts inline: typewriter, scroll reveal (`IntersectionObserver` sobre `.reveal`), contador animado sobre `.stats-section`.

### 4.2 `services.html` — Servicios
Lista larga de artículos `<article id="sXX" class="servicio-dark">`, uno por servicio, alternando `servicio-dark-reverse` para el layout en zigzag (imagen izquierda/derecha). Servicios identificados (con su ancla):

| Ancla | Servicio |
|---|---|
| `#s01` | Diagnóstico |
| `#s02` | Mantenimiento Preventivo |
| `#s03` | Mantenimiento Correctivo |
| `#s04` | Actualización de Equipos |
| `#s05` | Consultoría en Sistemas de Información |
| `#s06` | Mantenimiento de Impresoras |
| `#s07` | Instalación CCTV |
| `#s08` | Campañas Google Ads (incluye tabla de planes `planes-dark`) |
| `#s09` | Diseño Web *(confirmar contenido exacto si se va a editar — no se listó completo en este análisis)* |

Cada tarjeta trae: número de servicio, título con emoji, descripción, lista de alcance, precio o nota, botón "Solicitar servicio" → `/contact.html`, e imagen desde `./picture/services/`.

### 4.3 `equipos.html` — Equipos y Repuestos
- **Filtros** (`filtros-dark`): botones `data-filter="all|equipos|repuestos|perifericos"`, controlados por JS inline que muestra/oculta `.producto-dark` según `data-category`.
- **Catálogo** (`catalogo-dark`): artículos `producto-dark` con imagen (Unsplash), badge de categoría, título, descripción y botón de WhatsApp con mensaje prellenado específico del producto.
- Categorías/productos actuales:
  - **Equipos**: Computador Portátil, Computador de Escritorio, Monitores
  - **Repuestos**: Memoria RAM, (líneas truncadas — revisar líneas 169–191 si se edita), Tarjetas Gráficas (GPU), Tarjetas Madre, Fuentes de Poder
  - **Periféricos**: Teclados y Mouse, Cámaras Web, Auriculares y Diademas, Repetidores WiFi

### 4.4 `contact.html` — Contacto
- **Formulario** (`#contact-form`) con validación JS propia (nombre, email regex, servicio requerido, mensaje mínimo 10 caracteres) y envío vía **EmailJS**:
  - Public Key: `ICe_zWHgaoXfxAdT4`
  - Service ID: `service_lan67vv`
  - Template ID: `template_b4q3yqb`
  - Destino: `anthonycampo97@outlook.com`
- Mensajes de éxito/error (`#form-success`, `#form-error`) con clase `.hidden` toggle.
- **Aside de contacto**: tarjetas de WhatsApp, correo, ubicación (Cali) y horario; enlaces rápidos a anclas de `services.html` y a `equipos.html`.

### 4.5 `creditos.html`
Página simple, sin header/footer del sitio, solo crédito de una foto de Freepik. No está enlazada desde el menú principal ni el sitemap — probablemente solo para cumplir licencia de imagen.

---

## 5. CSS — organización y variables clave

| Archivo | Líneas | Alcance |
|---|---|---|
| `style.css` | 251 | Global: reset, `:root` (colores base), header, menú móvil, footer, WhatsApp flotante |
| `style_index.css` | 505 | Solo Inicio: hero, stats, about, services grid, why, cta — define variables propias de tema oscuro |
| `style_services.css` | 586 | Solo Servicios |
| `style_equipos.css` | 194 | Solo Equipos |
| `style_contact.css` | 264 | Solo Contacto |
| `style_tablet.css` | 65 | Media query `min-width:600px`, compartida por todas las páginas |
| `style_desktop.css` | 67 | Media query `min-width:1000px`, compartida por todas las páginas |

Variables detectadas:
- En `style.css` (`:root` global): `--white`, `--black`, `--Dark`, `--very-light-pink`, `--background_services`, `--text-lgc`, tamaños de fuente (`--sm/--md/--lg/--lghover`).
- En `style_index.css` (`:root` local, tema oscuro): `--electric-blue: #00b4ff` (color de marca principal), `--dark-bg: #0a0a0f`, `--dark-card: #111118`, `--dark-border: #1e1e2e`, `--text-light: #e0e0f0`, `--text-muted: #8888aa`.

> El sitio usa una paleta **negro + azul eléctrico (#00b4ff)**, consistente con lo registrado previamente: tema oscuro con animaciones de scroll reveal, contador animado y efecto typewriter en el hero.

---

## 6. JavaScript

- **`javascript/script.js`** (compartido, 9 líneas): controla exclusivamente el toggle del menú móvil (`.menu-icon` click → `.mobile-menu` toggle clase `inactive`). Se incluye al final de las 4 páginas.
- **Scripts inline por página** (no están en archivos separados, viven dentro de cada `.html`):
  - `index.html`: typewriter, scroll reveal, contador de stats.
  - `equipos.html`: filtro de categorías, scroll reveal.
  - `contact.html`: inicialización EmailJS, validación de formulario, envío, scroll reveal.
  - `services.html`: scroll reveal (a confirmar patrón exacto al abrir el archivo completo).

> Patrón repetido: el bloque de **scroll reveal** (`IntersectionObserver` sobre `.reveal`) está copiado en cada página en vez de vivir en `script.js`. Es candidato a refactor si se quiere centralizar, aunque no es urgente.

---

## 7. Integraciones externas activas

| Integración | Dato clave |
|---|---|
| Google Analytics | `G-M5FQRSTSHJ` |
| Google Search Console | Verificado, con `sitemap.xml` enviado |
| EmailJS | Service `service_lan67vv`, Template `template_b4q3yqb`, Public Key `ICe_zWHgaoXfxAdT4` |
| WhatsApp | Número `573225064877`, usado en botón flotante, CTAs y catálogo de equipos |
| Google Fonts | Montserrat (300–800) |
| Imágenes stock (solo en `equipos.html`) | Unsplash (URLs externas, sin `loading` local) |

---

## 8. Flujo de trabajo de edición (confirmado)

1. Editar localmente en VS Code.
2. Previsualizar con **Go Live**.
3. `git add` → `git commit` → `git push` a `AnthonyCampo97/techmaster`.
4. GitHub Pages redeploya automáticamente sobre `www.tmservicios.net`.

---

## 9. Puntos a tener en cuenta antes de editar

- **Duplicación de header/footer/WhatsApp** en las 4 páginas: cualquier cambio estructural ahí debe replicarse manualmente 4 veces (no hay includes/componentes, es HTML puro).
- **`equipos.html` usa imágenes externas de Unsplash**: si se quiere reemplazar por fotos propias, hay que subirlas a `/picture/` y actualizar cada `<img src>`.
- **Separación de estilos por página** (`style_index.css`, `style_services.css`, etc.) más los compartidos (`style.css`, `style_tablet.css`, `style_desktop.css`): al tocar un color o componente, verificar si es local a una página o si vive en un archivo compartido.
- **`services.html`** es el archivo más largo (586 líneas de CSS asociadas) — no se revisó el contenido completo de `#s09` (Diseño Web) ni el bloque final del archivo; conviene abrirlo completo si el cambio a realizar toca esa sección.
- **No hay build step ni bundler**: los cambios en HTML/CSS/JS son directos, se reflejan tal cual al hacer push.

---

## 10. Próximo paso

Con este mapa como referencia, dime **qué cambio(s) quieres hacer** (por ejemplo: agregar/quitar un servicio, cambiar textos, ajustar colores, corregir el menú, reemplazar imágenes de `equipos.html`, agregar una página nueva, etc.) y trabajamos directamente sobre los archivos correspondientes.