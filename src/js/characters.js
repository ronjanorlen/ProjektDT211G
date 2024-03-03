"use strict";

const characterURL = 'https://hp-api.onrender.com/api/characters';

const searchBox = document.getElementById('search-container');
const searchButton = document.getElementById('search-character-button');
const characterResult = document.getElementById('character-result');

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
    const characterResult = document.getElementById('characterResult');
    characterResult.innerHTML = ''; 

    characterData.forEach(character => {
        const listItem = document.createElement('li');
        listItem.textContent = character.name;
        characterResult.appendChild(listItem);
    });

     // TA BORT SEN
     console.table(characterData);
}

// Rensa sökresultat
function clearCharacterResult() {
    const characterResult = document.getElementById('characterResult');
    characterResult.innerHTML = ''; 
}