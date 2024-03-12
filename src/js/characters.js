"use strict";

const characterURL = 'https://hp-api.onrender.com/api/characters';

const searchBox = document.getElementById('search-container');
const searchButton = document.getElementById('search-character-button');
const characterInfo = document.getElementById('character-info');

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

function showCharacterInfo(characters) {
    const characterInfo = document.getElementById('character-info');

    if (characters.length > 0) { // Om karaktärer hittades
        let charactersHTML = ''; // Lagra HTML-koden för karaktären
        characters.forEach(character => {
            
            let imageHTML = ''; // Skapa en variabel för bild-HTML som är tom
            // för att om det inte finns en bild så ska ingen bild visas
            if (character.image && character.image.trim() !== '') {
                imageHTML = `<img src="${character.image}" alt="${character.name}">`; // Om det finns en bild, lägg till bild-HTML
            }
            charactersHTML += `
                <h2>${character.name || "Could not find info"}</h2>
                ${imageHTML}
                <p>House: ${character.house || "Unknown"}</p>
                <p>Born: ${character.dateOfBirth || "No one really knows"}</p>
                <p>Patronus: ${character.patronus || "Hidden for safety reasons"}</p>
                <p>Actor: ${character.actor || "Trolls have stolen info about actor"}</p>
            `;
        });
        characterInfo.innerHTML = charactersHTML; // Sätt in HTML-koden för alla karaktärer i characterInfo
    } else { // Om ingen karaktär hittades
        characterInfo.innerHTML = "<p>Could not find the character you are looking for, please check your spelling or ask Dumbledore for guidance</p>";
    }
}

// Rensa sökresultat
function clearCharacterResult() {
    const characterInfo = document.getElementById('character-info');
    characterInfo.innerHTML = ''; 
}