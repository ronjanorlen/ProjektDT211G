"use strict";

// Hämta data från webbtjänst

const housesURL = 'https://wizard-world-api.herokuapp.com/Houses';
const characterURL = 'https://hp-api.onrender.com/api/characters';

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
        <p>Founder: ${house.founder}</p>
        <p>House Colours: ${house.houseColours}</p>
        <p>Ghost: ${house.ghost}</p>
        <p>Animal: ${house.animal}</p>
        <p>Element: ${house.element}</p>
        <p>Common Room: ${house.commonRoom}</p>
    `;
}

// Dölj hus
function hideHouseInfo() {
    const houseInfo = document.getElementById('house-info');
    houseInfo.innerHTML = ''; 
}

const searchBox = document.getElementById('search-container');
const searchButton = document.getElementById('search-character-button');
const characterResult = document.getElementById('character-result');

// Eventlyssnare för klick på sök-knapp
searchButton.addEventListener('click', findCharacter);
clear.addEventListener('click', clearCharacterResult);

async function findCharacter() {
    try {
        const searchTerm = document.getElementById('searchCharacter').value.trim(); // Hämta sökterm och ta bort eventuella extra mellanslag
        if (searchTerm !== '') { // Kontrollera om söktermen är tom
            const response = await fetch(characterURL);
            let characterData = await response.json();

            // Filtrera karaktärer baserat på söktermen
            const filteredCharacters = characterData.filter(character => {
                return character.name.toLowerCase().includes(searchTerm.toLowerCase());
            });

            // Visa de filtrerade karaktärerna
            showCharacter(filteredCharacters);
        } else {
            // Om söktermen är tom, rensa resultatet
            clearCharacterResult();
        }

    } catch (e) {
        console.log(e);
        document.getElementById('error').innerHTML = "<p>Problemos</p>";
    }
}

function showCharacter(characterData) {
    const characterResult = document.getElementById('characterResult');
    characterResult.innerHTML = ''; 

    characterData.forEach(character => {
        const listItem = document.createElement('li');
        listItem.textContent = character.name;
        characterResult.appendChild(listItem);
    });
}

// Rensa sökresultat
function clearCharacterResult() {
    const characterResult = document.getElementById('characterResult');
    characterResult.innerHTML = ''; 
}