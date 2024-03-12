"use strict";

const spellURL = 'https://wizard-world-api.herokuapp.com/Spells';
let spellData; 

window.onload = init();


// Hämta trollformler
async function init() {
    try {
        const response = await fetch (spellURL);
        spellData = await response.json(); 

        // TA BORT INNAN PUBLICERING
        console.table(spellData);

        // Ta med data till ny funktion
        displaySpells(spellData);

    } catch (e) {
        console.log(e)
        document.getElementById('error').innerHTML = "<p>Problemos</p>";
        
    }
}

// Visa trollformler med trollformelnamn + vad den gör
function displaySpells(spellData) {
    const spellDataEL = document.getElementById('spells');

    // Skapa en div för att hålla trollformlerna
    const spellContainer = document.createElement('div');
    spellContainer.id = 'spellContainer';
    
    // Loopa igenom varje trollformel i spellData
    spellData.forEach((spell) => {
        // Kontrollera att incantation och effect är definierade
        if (spell.incantation && spell.effect) {
            // Skapa en h4 för incantation
            const incantationHeader = document.createElement('h4');
            incantationHeader.textContent = `Incantation: ${spell.incantation}`;
            
            // Skapa <p> för effect
            const effectParagraph = document.createElement('p');
            effectParagraph.textContent = `Effect: ${spell.effect}`;
            
            // Skapa en container för varje trollformel
            const spellItem = document.createElement('div');
            spellItem.classList.add('spellItem');

            // Lägg till incantation och effect till spellItem
            spellItem.appendChild(incantationHeader);
            spellItem.appendChild(effectParagraph);
            
            // Lägg till spellItem till spellContainer
            spellContainer.appendChild(spellItem);
        }
    });

    // Lägg till spellContainer till spellDataEL
    spellDataEL.appendChild(spellContainer);
}

