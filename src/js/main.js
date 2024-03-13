"use strict";

// Hämta meny-knappar
let openBtn = document.getElementById("open-menu");
let closeBtn = document.getElementById("close-menu");

// Eventlyssnare för öppna- och stängknappar
openBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

//Toggla fram navigeringsmenyn
function toggleMenu() {
   let navMenuEl = document.getElementById("nav-menu");

    // Hämta in styling för menyn
    let style = window.getComputedStyle(navMenuEl);

    // Kontrollera om navigering är synlig eller ej, ändrar display block/none
    if(style.display === "none") {
        navMenuEl.style.display = "block";
    } else {
        navMenuEl.style.display = "none";
    }
}

