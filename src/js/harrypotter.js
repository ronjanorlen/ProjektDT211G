"use strict";

console.log("Test av Javascript-fil för Harry Potter-API");

// Hämta data från webbtjänst


const characterUrl = 'https://hp-api.onrender.com/api/characters';
const housesURL = 'https://wizard-world-api.herokuapp.com/Houses';

window.onload = init();

let currentHouse = null; // För att kunna visa/dölja husen
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

        // Händelsehanterare med klick för att visa eller dölja ett hus
        listItem.addEventListener('click', () => {
            // Om samma hus klickas på två gånger - dölj det
            if (currentHouse === house) {
                hideHouseInfo(); // Funktion som kallas på för att dölja hus
                currentHouse = null;
            } else { // Annars visa 
                showHouseInfo(house); // Funktion som visar info om hus som klickats på
                currentHouse = house;
            }
        });

        // Lägg till det nya li-elementet till listan av hus
        houseDataEL.appendChild(listItem);
    });
}

function showHouseInfo(house) {
    const houseInfo = document.getElementById('house-info');
    houseInfo.innerHTML = `
        <h2>${house.name}</h2>
        <p>Grundare: ${house.founder}</p>
        <p>Husfärger: ${house.houseColours}</p>
        <p>Hus-spöke: ${house.ghost}</p>
        <p>Djur: ${house.animal}</p>
        <p>Element: ${house.element}</p>
        <p>Sällskapsrum: ${house.commonRoom}</p>
    `;
}

// Dölj hus
function hideHouseInfo() {
    const houseInfo = document.getElementById('house-info');
    houseInfo.innerHTML = ''; 
}