/* Table of Contents
********************

1. Create Effect for Hamburger Menu Lines

*/


// Create Effect for Hamburger Menu Lines
const menuIcon = document.querySelector (".home_hamburger");
const home = document.querySelector (".home");
menuIcon.addEventListener("click", () => {
    home.classList.toggle("home_change");
});