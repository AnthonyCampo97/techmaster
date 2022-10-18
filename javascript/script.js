const menuIconMobile = document.querySelector(".menu-icon");
const mobileMenu = document.querySelector(".mobile-menu");


menuIconMobile.addEventListener("click", toggleMobileMenu);

function toggleMobileMenu() {
    mobileMenu.classList.toggle('inactive');
  }