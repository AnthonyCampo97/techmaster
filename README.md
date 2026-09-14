# Tech Master

Página web informativa de servicios tecnológicos, para el negocio **Tech Master** en Cali, Colombia. Sitio publicado en `www.tmservicios.net` vía GitHub Pages.

Servicios que ofrece la página:
- Mantenimientos preventivos de equipos de cómputo
- Mantenimientos correctivos de equipos de cómputo
- Actualización de hardware
- Venta de componentes de cómputo
- Venta de equipos nuevos y usados
- Asesorías en sistemas de información
- Instalación de cámaras CCTV
- Diseño web
- Campañas de Google Ads

## Stack

HTML, CSS y JavaScript puro (sin frameworks, sin build step). Hospedado en **GitHub Pages** con dominio propio (`CNAME`). Integraciones: **Google Analytics**, **EmailJS** (formulario de contacto) y enlaces directos a **WhatsApp**.

## Estructura del proyecto

```
techmaster/
├── index.html            → Inicio
├── services.html          → Servicios (detallado, con anclas #s01–#s09)
├── equipos.html            → Catálogo de equipos, repuestos y periféricos
├── contact.html             → Formulario de contacto (EmailJS)
├── creditos.html             → Créditos de imágenes de banco
├── partials/
│   ├── header.html            → Header compartido (logo, menú móvil y de escritorio)
│   └── footer.html             → Footer compartido + botón flotante de WhatsApp
├── javascript/
│   └── components.js           → Inyecta header.html/footer.html, marca el enlace activo del menú
│                                  y activa el toggle del menú móvil
├── style/
│   ├── style.css                 → Base global (reset, header, menú móvil, footer, WhatsApp flotante)
│   ├── style_index.css            → Estilos exclusivos de Inicio
│   ├── style_services.css          → Estilos exclusivos de Servicios
│   ├── style_equipos.css            → Estilos exclusivos de Equipos
│   ├── style_contact.css             → Estilos exclusivos de Contacto
│   ├── style_tablet.css               → Media query min-width:600px
│   └── style_desktop.css               → Media query min-width:1000px
└── picture/                              → Logos, íconos, banners y fotos de servicios
```

## Header y footer compartidos

El header y el footer (incluyendo el botón flotante de WhatsApp) **ya no están duplicados en cada página**. Viven una sola vez en `partials/header.html` y `partials/footer.html`, y cada página HTML solo tiene un contenedor vacío:

```html
<header id="site-header"></header>
...
<div id="site-footer"></div>
```

`javascript/components.js` los carga con `fetch()` al entrar a cualquier página, resalta automáticamente el enlace del menú correspondiente a la página actual y activa el toggle del menú móvil (esta última función reemplaza al antiguo `javascript/script.js`, que fue eliminado).

**Para editar el menú, el logo del header, el texto del footer o el número de WhatsApp:** modifica únicamente `partials/header.html` o `partials/footer.html`; el cambio se refleja automáticamente en las 4 páginas.

> ⚠️ Como la carga es vía `fetch()`, el sitio debe previsualizarse siempre con un servidor local (ej. la extensión **Go Live** de VS Code) y no abriendo el HTML directamente con doble clic, ya que `fetch()` de archivos locales no funciona bajo el protocolo `file://`.

## Flujo de despliegue

1. Editar localmente en VS Code.
2. Previsualizar con **Go Live**.
3. `git add` → `git commit` → `git push`.
4. GitHub Pages redespliega automáticamente sobre `www.tmservicios.net`.