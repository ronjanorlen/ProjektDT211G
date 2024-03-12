"use strict";

const spellURL = 'https://wizard-world-api.herokuapp.com/Spells';

window.onload = init();

// Hämta de 4 husen
async function init() {
    try {
        const response = await fetch (spellURL);
        let spellData = await response.json();

        console.table(spellData);

        // Ta med data till ny funktion
        displaySpells(spellData);

    } catch (e) {
        console.log(e)
        document.getElementById('error').innerHTML = "<p>Problemos</p>";
        
    }
}

// Visa trollformler
function displaySpells(spellData) {
    const spellDataEL = document.getElementById("spells");
} 