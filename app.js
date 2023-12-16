import { calculateDistance, calculateBearing, toCompass} from './helpers.js';

const MAX_GUESSES = 6;

const flag = document.getElementById('flag');
const table = document.getElementById('guess-list');
const dropdown = document.getElementById('countries');
const results = document.getElementById('results');
const button = document.getElementById('new-game');

let country = {};

const response = await fetch('./countries.json');
const countries = await response.json();

countries.forEach(c => dropdown.add(new Option(c.name, c.id)));

function newGame() {
    country = countries[Math.floor(Math.random()*countries.length)];
    flag.src = `flags/${country.code2l}.svg`;

    dropdown.style.visibility = 'visible';
    results.style.visibility = 'hidden';

    table.innerHTML = '';
    dropdown.value = '';
    dropdown.focus()
}

function handleGuess() {
    const id = dropdown.value;
    const correct = id === country.id;
    const guess = countries.find(c => c.id === id);

    if(!guess) return;
    
    //dropdown.value = '';

    if(correct) {
        dropdown.style.visibility = 'hidden';
        results.style.visibility = 'visible';
        // todo: don't use innerHTML
        table.innerHTML += `<tr><td>${guess.name}</td><td colspan="2">Correct!</td></tr>`;
    }
    else {

        const distance = calculateDistance(guess, country);
        const bearing = calculateBearing(guess, country);
        // todo: don't use innerHTML
        table.innerHTML += `<tr><td style="width:60%">${guess.name}</td><td>${Math.trunc(distance)} km</td><td>${toCompass(bearing)}</td></tr>`;
    }
}

newGame();

dropdown.addEventListener("change", handleGuess);
button.addEventListener("click", newGame);
//https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share#syntax
