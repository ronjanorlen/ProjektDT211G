"use strict";

// Hämta data från webbtjänst

const housesURL = 'https://wizard-world-api.herokuapp.com/Houses';
const characterBaseURL = 'https://hp-api.onrender.com/api/characters/house/';

window.onload = init();

let currentHouse = null; // För att kunna visa/dölja husen

// Hämta de 4 husen
async function init() {
    try {
        const response = await fetch (housesURL);
        let houseData = await response.json();

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

    // Skapa nytt li-element för varje hus
    houseData.forEach((house) => {
        const listItem = document.createElement('li');
        listItem.textContent = house.name;

        // Om samma hus klickas på två gånger, dölj det.
        // Visa de karaktärer som finns i det huset som klickats på
        listItem.addEventListener('click', async () => {
            if (currentHouse === house) {
                hideHouseInfo(); // Funktion som kallas på för att dölja hus
                currentHouse = null;
            } else {
                try {
                    const characterResponse = await fetch(characterBaseURL + house.name);
                    const characterData = await characterResponse.json();
                    showHouseInfo(house, characterData); // Funktion som visar hus + karaktärer 
                    currentHouse = house;
                } catch (error) {
                    console.log(error);
                    document.getElementById('error').innerHTML = "<p>Problem med att hämta karaktärer för detta hus</p>";
                }
            }
        });
        // Lägg till det nya li-elementet till listan av hus
        houseDataEL.appendChild(listItem);
    });
}

// Visa info om hus + karaktärer i huset
function showHouseInfo(house, characterData) {
    const houseInfo = document.getElementById('house-info');
    houseInfo.innerHTML = `
        <h2>${house.name}</h2>
        <p>Founder: ${house.founder}</p>
        <p>House Colours: ${house.houseColours}</p>
        <p>Ghost: ${house.ghost}</p>
        <p>Animal: ${house.animal}</p>
        <p>Element: ${house.element}</p>
        <p>Common Room: ${house.commonRoom}</p>

        <h3>Members of Gryffindor House:</h3>
        <ul>
            ${characterData.map(character => `<li>${character.name}</li>`).join('')}
        </ul>
    `;
}

// Dölj hus
function hideHouseInfo() {
    const houseInfo = document.getElementById('house-info');
    houseInfo.innerHTML = ''; 
}

