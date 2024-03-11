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

        // Lägg till klass på list-element för att kunna styla i css
        listItem.classList.add(house.name.toLowerCase()); 

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

        // Lägg till klassen "characterItem"
        listItem.classList.add('characterItem');

        // Lägg till det nya li-elementet till listan av hus
        houseDataEL.appendChild(listItem);
    });
}

// Visa info om hus + karaktärer i huset
function showHouseInfo(house, characterData) {
    const houseInfo = document.getElementById('house-info');
    houseInfo.innerHTML = `
        <h2>${house.name}</h2>
        <p><span class="heading">Founder:</span> ${house.founder}</p>
        <p><span class="heading">House Colours:</span> ${house.houseColours}</p>
    <p><span class="heading">Ghost:</span> ${house.ghost}</p>
    <p><span class="heading">Animal:</span> ${house.animal}</p>
    <p><span class="heading">Element:</span> ${house.element}</p>
    <p><span class="heading">Common Room:</span> ${house.commonRoom}</p>

        <h3>Members of ${house.name} House:</h3>
        <ul id="characterList">
            ${characterData.map(character => `<li class="characterItem">${character.name}</li>`).join('')}
        </ul>
    `;

    // Klick för att visa karaktär
    const characterItems = document.querySelectorAll('#characterList .characterItem');
    characterItems.forEach(characterItem => {
        characterItem.addEventListener('click', () => {
            showCharacterInfo(characterItem.textContent, characterData);
        });
    });
}

// Visa info om en vald karaktär
function showCharacterInfo(characterName, characterData) {
    const character = characterData.find(character => character.name === characterName);

     // Visa i member-info div   
    const memberInfo = document.getElementById('member-info');

    // Dölj alla andra karaktärer
    const characterList = document.getElementById('characterList');
    characterList.innerHTML = '';


    // Lagra HTML-koden för karaktärens info
    let characterInfoHTML = '';

    // Kontrollera varje värde och lägg till det till characterInfoHTML
    // Hitte-på anledningar för värden som är null eller ''
    characterInfoHTML += `<h3>${character.name}</h3>`;
    if (!character || character.image === null || character.image === '') {
        characterInfoHTML += `<p>Photo has unfortunately been stolen by dementors</p>`; 
    } else {
        characterInfoHTML += `<img src="${character.image}" alt="${character.name}">`;
    }
    if (!character || character.patronus === null || character.patronus === '') {
        characterInfoHTML += `<p>Patronus is available for safety reasons</p>`;
    } else {
        characterInfoHTML += `<p>Patronus: ${character.patronus}</p>`;
    }
    if (!character || character.dateOfBirth === null || character.dateOfBirth === '') {
        characterInfoHTML += `<p>Date of birth is unknown</p>`;
    } else {
        characterInfoHTML += `<p>Born: 
        ${character.dateOfBirth}</p>`;
    }
   

    // Lägg till info till characterCard
    memberInfo.innerHTML = characterInfoHTML;

    // Dölj kortet vid klick
    memberInfo.addEventListener('click', () => {

        // Funktion som kallas på för att visa alla karaktärer igen
        showAllCharacters(characterData);
    });

}


// Visa alla karaktärer i huset igen
function showAllCharacters(characterData) {
    const characterList = document.getElementById('characterList');
    characterList.innerHTML = '';

    characterData.forEach(character => {
        const listItem = document.createElement('li');
        listItem.textContent = character.name;
        listItem.classList.add('characterItem');

        listItem.addEventListener('click', () => {
            showCharacterInfo(character.name, characterData);
        });

        characterList.appendChild(listItem);
    });
}

// Dölj hus
function hideHouseInfo() {
    const houseInfo = document.getElementById('house-info');
    houseInfo.innerHTML = ''; 
}

