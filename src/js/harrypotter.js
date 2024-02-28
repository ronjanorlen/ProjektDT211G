"use strict";

console.log("Test av Javascript-fil för Harry Potter-API");

// Hämta data från webbtjänst


const characterUrl = 'https://hp-api.onrender.com/api/characters';
const housesURL = 'https://wizard-world-api.herokuapp.com/Houses';

window.onload = init();

// async function init() {
  //  try {
    //    const response = await fetch(characterUrl);
      //  let characterData = await response.json();

        //console.log(characterData);
       // displayCharacters(characterData);

   // } catch (e) {
     //   console.log(e);
      //  document.getElementById('error').innerHTML = "<p>Kunde inte hitta karaktärer</p>";
   // }
// }
// function displayCharacters(characterData) {

// }

async function init() {
    try {
        const response = await fetch (housesURL);
        let houseData = await response.json();

        // TA BORT INNAN PUBLICERING
        console.table(houseData);

        // Ta med data till ny funktion
        displayHouses(houseData);

    } catch (e) {
        console.log(e)
        document.getElementById('error').innerHTML = "<p>Problemos</p>";
    }
}

function displayHouses(houseData) {
   const houseDataEL = document.getElementById('houses');

   // Loopa igenom och skriv ut i lista
   houseData.forEach((house) => {
    houseDataEL.innerHTML += `<li>${ house.name }</li>`;
   });
   
}