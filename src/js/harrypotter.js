"use strict";

console.log("Test av Javascript-fil för Harry Potter-API");

// Hämta data från webbtjänst


const characterUrl = 'https://hp-api.onrender.com/api/characters';
const housesURL = 'https://wizard-world-api.herokuapp.com/Houses';

window.onload = init();

//

 // async function characters() {
   // try {
   // const response = await fetch(characterUrl);
    //   let characterData = await response.json();
// TA BORT INNAN PUBLICERING
      //  console.table(characterData);

        // Ta med data till ny funktion
        // displayCharacters(characterData);

   // } catch (e) {
    //    console.log(e);
     //   document.getElementById('error').innerHTML = "<p>Kunde inte hitta karaktärer</p>";
   // }
// }


// Hämta de 4 husen
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

// Visa de 4 husen
function displayHouses(houseData) {
    const houseDataEL = document.getElementById('houses');

    houseData.forEach((house) => {
        // Skapa ett nytt li-element för varje hus
        const listItem = document.createElement('li');
        listItem.textContent = house.name;

        // Lägg till en klickhändelsehanterare på varje li-element
        listItem.addEventListener('click', () => {
            // Anropa funktionen för att visa mer info när ett hus klickas på
            showHouseInfo(house);
        });

        // Lägg till det nya li-elementet till listan av hus
        houseDataEL.appendChild(listItem);
    });
}

function showHouseInfo(house) {
    const houseInfo = document.getElementById('house-info');
    houseInfo.innerHTML = `
        <h2>${house.name}</h2>
        <p>Founder: ${house.founder}</p>
        <p>House Ghost: ${house.ghost}</p>
        
    `;
}

