// components.js
// Carga el header y el footer compartidos (partials/header.html y partials/footer.html)
// en cada página, marca el enlace activo del menú y activa el toggle del menú móvil.
// Reemplaza a script.js: como el header ahora se inyecta de forma asíncrona,
// el menú móvil se debe inicializar DESPUÉS de que el header exista en el DOM.

async function loadComponent(placeholderId, url) {
  const placeholder = document.getElementById(placeholderId);
  if (!placeholder) return;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`No se pudo cargar ${url} (${response.status})`);
    placeholder.innerHTML = await response.text();
  } catch (error) {
    console.error("Error cargando componente compartido:", error);
  }
}

function setActiveNavLink() {
  // Normaliza la ruta actual: "/index.html" y "/" se tratan igual
  let currentPath = window.location.pathname;
  if (currentPath.endsWith("/index.html")) {
    currentPath = currentPath.replace("/index.html", "/");
  }

  document.querySelectorAll("#site-header nav a").forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (linkPath === currentPath) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function initMobileMenu() {
  const menuIconMobile = document.querySelector(".menu-icon");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (!menuIconMobile || !mobileMenu) return;

  menuIconMobile.addEventListener("click", () => {
    mobileMenu.classList.toggle("inactive");
  });

  // Cierra el menú móvil al hacer clic en un enlace
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => mobileMenu.classList.add("inactive"));
  });
}

async function initComponents() {
  await Promise.all([
    loadComponent("site-header", "/partials/header.html"),
    loadComponent("site-footer", "/partials/footer.html"),
  ]);
  setActiveNavLink();
  initMobileMenu();
  // Avisa al resto de scripts de la página que header/footer ya están listos,
  // por si en el futuro algún script inline necesita esperar este momento.
  document.dispatchEvent(new Event("componentsLoaded"));
}

document.addEventListener("DOMContentLoaded", initComponents);
