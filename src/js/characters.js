"use strict";

const characterURL = 'https://hp-api.onrender.com/api/characters';

const searchBox = document.getElementById('search-container');
const searchButton = document.getElementById('search-character-button');
const characterResult = document.getElementById('character-result');

let currentCharacter = null;

// Eventlyssnare för knappar
searchButton.addEventListener('click', findCharacter);
clear.addEventListener('click', clearCharacterResult);

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
    const characterResultEL = document.getElementById('characterResult');
    characterResultEL.innerHTML = ''; 

    characterData.forEach(character => {
        const listItem = document.createElement('li');
        listItem.textContent = character.name;

         // Händelsehanterare med klick för att visa eller dölja ett hus
         listItem.addEventListener('click', () => {
            // Om samma hus klickas på två gånger - dölj det
            if (currentCharacter === character) {
                clearCharacterResult(); // Funktion som kallas på för att dölja hus
                currentCharacter = null;
            } else { // Annars visa 
                showCharacterInfo(character); // Funktion som visar info om hus som klickats på
                currentCharacter = character;
            }
        });

        // Lägg till nytt li-element
        characterResultEL.appendChild(listItem);
    });

     // TA BORT SEN
     console.table(characterData);
}

function showCharacterInfo(character) {
    const characterInfo = document.getElementById('character-info');
    characterInfo.innerHTML = `
        <h2>${character.name}</h2>
        <img src="${character.image}" alt="${character.name}">
        <p>House: ${character.house}</p>
        <p>Born: ${character.dateOfBirth}</p>
        <p>Patronus: ${character.patronus}</p>
    `;
}

// Rensa sökresultat
function clearCharacterResult() {
    const characterResult = document.getElementById('character-info');
    characterResult.innerHTML = ''; 
}