"use strict";

const spellURL = 'https://wizard-world-api.herokuapp.com/Spells';
let spellData; 

window.onload = init;

function init() {

    // Ladda in knappar först
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');

    yesBtn.addEventListener('click', showSpells);
    noBtn.addEventListener('click', showNoSpellsMessage);
}

// Om klickat på ja - hämta data från API
async function showSpells() {
    try {
        const response = await fetch(spellURL);
        const spellData = await response.json();

        // Ta med data till ny funktion
        displaySpells(spellData);

        // Om fel uppstår
    } catch (e) {
        console.log(e);
        document.getElementById('error').innerHTML = "<p>Problemos</p>";
    }
}

// Om klickat på nej - visa inga trollformler, bara meddelande
function showNoSpellsMessage() {
    const spellDataEL = document.getElementById('spells');
    spellDataEL.innerHTML = "<h4>Sorry, we only manage mischief in here..</h4>";
}


// Visa trollformler
function displaySpells(spellData) {
    const spellDataEL = document.getElementById('spells');
    spellDataEL.innerHTML = ''; // Rensa innehållet

    // Skapa div för trollforlmer
    const spellContainer = document.createElement('div');
    spellContainer.id = 'spellContainer';

    // Loopa igenom och ta med trollformel + effekt
    spellData.forEach(spell => {
        if (spell.incantation && spell.effect) {

            // Skapa h3 för trollformel-namn
            const incantationHeader = document.createElement('h3');
            incantationHeader.textContent = spell.incantation;

            // Skapa p för effekt
            const effectParagraph = document.createElement('p');
            effectParagraph.textContent = spell.effect;

            // Lägg allt i en div och slå ihop
            const spellItem = document.createElement('div');
            spellItem.classList.add('spellItem');

            spellItem.appendChild(incantationHeader);
            spellItem.appendChild(effectParagraph);

            spellContainer.appendChild(spellItem);
        }
    });

    spellDataEL.appendChild(spellContainer);
}
