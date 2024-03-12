"use strict";

const characterURL = 'https://hp-api.onrender.com/api/characters';

const searchBox = document.getElementById('search-container');
const searchButton = document.getElementById('search-character-button');
const characterInfo = document.getElementById('character-info');

let currentCharacter = null;

// Eventlyssnare för knappar
searchButton.addEventListener('click', findCharacter);
clear.addEventListener('click', clearCharacterResult);

window.onload = init();


async function init() {
    try {
        const response = await fetch (characterURL);
        let characterData = await response.json();

        clearCharacterResult(); // Rensa eventuell tidigare sökning

        // TA BORT SEN
     console.table(characterData);
     

        // Ta med data till ny funktion
        showCharacterInfo(characterData);

    } catch (e) {
        console.log(e)
        document.getElementById('error').innerHTML = "<p>Problemos</p>";
        
    }
}

async function findCharacter() {
    try {
        const searchTerm = document.getElementById('searchCharacter').value.trim(); // Hämta sökterm och ta bort eventuella extra mellanslag
        if (searchTerm !== '') { // Kontrollera om söktermen är tom
            const response = await fetch(characterURL);
            let characterData = await response.json();

            // Filtrera karaktärer baserat på söktermen, oavsett om användare söker med stora eller små bokstäver
            const filteredCharacters = characterData.filter(character => {
                return character.name.toLowerCase().includes(searchTerm.toLowerCase());
            });

            // Ta med data och visa resultat
            showCharacterInfo(filteredCharacters);
        } else {
            // Om söktermen är tom, rensa resultatet
            clearCharacterResult();
        }

    } catch (e) {
        console.log(e);
        document.getElementById('error').innerHTML = "<p>Problemos</p>";
    }
}

function showCharacterInfo(character) {
    const characterInfo = document.getElementById('character-info');

    if (character.length > 0) { // Om karaktären hittades
        const characterData = character[0]; // Ta den första karaktären från den filtrerade listan

        characterInfo.innerHTML = `
            <h2>${characterData.name}</h2>
            <img src="${characterData.image}" alt="${characterData.name}">
            <p>House: ${characterData.house}</p>
            <p>Born: ${characterData.dateOfBirth}</p>
            <p>Patronus: ${characterData.patronus}</p>
        `;
    } else { // Om ingen karaktär hittades
        characterInfo.innerHTML = "<p>Kan inte hitta karaktär</p>";
    }
}

// Rensa sökresultat
function clearCharacterResult() {
    const characterInfo = document.getElementById('character-info');
    characterInfo.innerHTML = ''; 
}