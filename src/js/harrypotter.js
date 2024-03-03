"use strict";

// Hämta data från webbtjänst

const housesURL = 'https://wizard-world-api.herokuapp.com/Houses';

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

