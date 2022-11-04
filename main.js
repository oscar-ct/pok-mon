

const pokemonName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
}
const windowReload = () => {
    location.reload();
}

const pokemonTypes = (arr) => {
    if (arr.length === 1) {
        return arr[0].type.name.charAt(0).toUpperCase() + arr[0].type.name.slice(1);
    } else if (arr.length === 2) {
        return `${arr[0].type.name.charAt(0).toUpperCase() + arr[0].type.name.slice(1)} ${arr[1].type.name.charAt(0).toUpperCase() + arr[1].type.name.slice(1)}`;
    }
}
const pillPokemonTypes = (str) => {
    const arr = str.split(' ');
    console.log(arr);
    if (arr.length === 1) {
        return `<span class="pill">${arr[0]}</span>`;
    } else if (arr.length === 2) {
        return `<span class="pill">${arr[0]}</span><span class="pill">${arr[1]}</span>`;
    }

}
const pokemonHeight = (height) => {
    let inches = (height / 2.54).toFixed(0);
    let feet = Math.floor(inches / 12);
    inches %= 12;
    return `${feet}' ${inches}"`
}


const mapApiPokemonListToDOM = (pokemon) => `<div onclick="searchPokemon(${pokemon.id})" style="cursor: pointer">
    <div class="mx-2 my-2"><img src="${pokemon.sprites.other["official-artwork"].front_default}" style="height: 185px; background-color: whitesmoke; border-radius: 6px"></div>
    <div><span class="pokemon-id">#${pokemon.id}</span></div>
    <div><h4 style="font-family: 'Exo', sans-serif;">${pokemonName(pokemon.name)}</h7></div>
    <div>${pillPokemonTypes(pokemonTypes(pokemon.types))}</div>
    </div>`;

const mapApiPokemonToDOM = (pokemon) => `<div data-id="${pokemon.id}" style="cursor: pointer">
    <img src="${pokemon.sprites.other.dream_world["front_default"]}" style="height: 500px;">
    <div class="d-flex justify-content-center"><h4>Name: <span>${pokemonName(pokemon.name)}</span></h4></div>
    <div class="d-flex justify-content-center"><h4>Type: <span>${pokemonTypes(pokemon.types)}</span></h4></div>
     <div class="d-flex justify-content-center"><h4>Height: <span>${pokemonHeight(pokemon.height * 10)}</span></h4></div>
      <div class="d-flex justify-content-center"><h4>Weight: <span>${(pokemon.weight/4.536).toFixed(2) + "lbs"}</span></h4></div>
    </div>`;
const mapLocalPokemonToDOM = (pokemon) => `<div onclick="searchPokemon(${pokemon.id})" style="cursor: pointer">
    <div class="mx-2 my-2"><img src="${pokemon.sprite}" style="height: 185px; background-color: whitesmoke; border-radius: 6px"></div>
    <div><span class="pokemon-id">#${pokemon.id}</span></div>
    <div><h4 style="font-family: 'Exo', sans-serif;">${pokemonName(pokemon.name)}</h4></div>
    <div>${pillPokemonTypes(pokemon.type)}</div>
    </div>`;


let localStoredPokemon = '';

const viewPokemon = (pokemon, pokemon2) => {
    let promises = [];
    for (let i = pokemon; i < pokemon2; i++) {
        promises.push(fetch("https://pokeapi.co/api/v2/pokemon/" + i).then(resp => resp.json()));
    }
    Promise.all(promises).then(function (data) {
        localStoredPokemon = [data.map(function (data) {
            return {
                id: data.id,
                name: data.name,
                sprite: data.sprites.other["official-artwork"].front_default,
                type: pokemonTypes(data.types)
            }
        })];
        $('#output').html(data.map(mapApiPokemonListToDOM));

    }).then(applyPillBgColor);
    console.log(localStoredPokemon);

}




const searchPokemon = (pokemon) => {
    $.ajax("https://pokeapi.co/api/v2/pokemon/" + pokemon).done(function (data) {
        $('#output').html(mapApiPokemonToDOM(data))
    });
}


$('#searchPokemon').click(function (e) {
    e.preventDefault();
    const pokemon = $('#pokemon').val();
    searchPokemon(pokemon);
});

$('#pokemon').keyup(function (e) {
    console.log(localStoredPokemon)
    const searchTerm = $('#pokemon').val();
    console.log(searchTerm);
    const searchResults = localStoredPokemon[0].filter(function (x) {
        return x.name.includes(searchTerm);
    });
    console.log(searchResults);
    $('#output').html(searchResults.map(mapLocalPokemonToDOM));
    applyPillBgColor();
});


$('#viewAllPokemon').click(function () {
    viewPokemon(1, 152);
});

$('#viewAllPokemon2').click(function () {
    viewPokemon(152, 252);
});

$('#viewAllPokemon3').click(function () {
    viewPokemon(252, 387);
});
$('#viewAllPokemon4').click(function () {
    viewPokemon(387, 494);
});
$('#viewAllPokemon5').click(function () {
    viewPokemon(494, 650);
});

$('#viewAllPokemon6').click(function () {
    viewPokemon(650, 722);
});

$('#viewAllPokemon7').click(function () {
    viewPokemon(722, 810);
});
$('#viewAllPokemon8').click(function () {
    viewPokemon(810, 906);
});
// $('#viewAllPokemon9').click(function () {
//     viewPokemon(906, 925);
// });

$('#viewPokemon2000').click(function () {
    viewAllPokemon2000();
});

function viewAllPokemon2000() {
    for (let i = 0; i < pokemon2000.length; i++) {
        viewPokemon(pokemon2000[i].toLowerCase());
    }
}

const pokemon2000 = [
    'Pikachu', 'Meowth', 'Togepi', 'Bulbasaur', 'Charizard', 'Squirtle', 'Lapras', 'Snorlax', 'Goldeen', 'Staryu', 'Psyduck', 'Venonat', 'Marill', 'Scyther', 'Arbok', 'Weezing', 'Mr-Mime', 'Zapdos', 'Articuno', 'Moltres', 'Lugia', 'Slowking', 'Slowpoke', 'Slowbro', 'Magikarp', 'Pidgey', 'Pidgeotto', 'Pidgeot', 'Diglett', 'Paras', 'Parasect', 'Seel', 'Dewgong', 'Wartortle', 'Blastoise', 'Ekans', 'Arbok', 'Eevee', 'Vaporeon', 'Lickitung', 'Tentacool', 'Tentacruel', 'Golduck', 'Horsea', 'Seadra', 'Seaking', 'Gyarados', 'Starmie', 'Venomoth', 'Spearow', 'Fearow', 'Butterfree', 'Zubat', 'Golbat', 'Raichu', 'Rhyhorn', 'Rhydon', 'Onix', 'Cubone', 'Exeggutor', 'Machop', 'Machoke', 'Machamp', 'Hitmonlee', 'Hitmonchan', 'Primeape', 'Tauros', 'Voltorb', 'Geodude', 'Golem', 'Nidoran-m', 'Nidoran-f', 'Nidorino', 'Nidoking', 'Nidorina', 'Nidoqueen', 'Vulpix', 'Ninetales', 'Rapidash', 'Doduo', 'Dodrio', 'Magnemite', 'Magneton', 'Ivysaur', 'Venusaur', 'Sandshrew', 'Sandslash', 'Kangaskhan', 'Rattata', 'Raticate', 'Pinsir', 'Electabuzz', 'Alakazam', 'Wigglytuff', 'Tangela', 'Oddish', 'Gloom', 'Vileplume', 'Krabby', 'Kingler', 'Clefairy', 'Drowzee', 'Hypno', 'Shellder', 'Cloyster', 'Poliwag', 'Poliwhirl', 'Poliwrath', 'Beedrill', 'Chansey', 'Growlithe', 'Bellsprout', 'Weepinbell', 'Victreebel'];

const applyPillBgColor = () => {
    const val = $('.pill');
    for (let i = 0; i < val.length; i++) {
        const pill = val.eq(i);
        if (pill[0].innerText === "Grass") {
            pill.addClass('background-color-grass');
        } else if (pill[0].innerText === "Poison") {
            pill.addClass('background-color-poison');
        } else if (pill[0].innerText === "Fire") {
            pill.addClass('background-color-fire');
        } else if (pill[0].innerText === "Water") {
            pill.addClass('background-color-water');
        } else if (pill[0].innerText === "Flying") {
            pill.addClass('background-color-flying');
        } else if (pill[0].innerText === "Bug") {
            pill.addClass('background-color-bug');
        } else if (pill[0].innerText === "Normal") {
            pill.addClass('background-color-normal');
        } else if (pill[0].innerText === "Electric") {
            pill.addClass('background-color-electric');
        } else if (pill[0].innerText === "Ground") {
            pill.addClass('background-color-ground');
        } else if (pill[0].innerText === "Fairy") {
            pill.addClass('background-color-fairy');
        } else if (pill[0].innerText === "Fighting") {
            pill.addClass('background-color-fighting');
        } else if (pill[0].innerText === "Psychic") {
            pill.addClass('background-color-psychic');
        } else if (pill[0].innerText === "Steel") {
            pill.addClass('background-color-steel');
        } else if (pill[0].innerText === "Ice") {
            pill.addClass('background-color-ice');
        } else if (pill[0].innerText === "Ghost") {
            pill.addClass('background-color-ghost');
        } else if (pill[0].innerText === "Rock") {
            pill.addClass('background-color-rock');
        } else if (pill[0].innerText === "Dragon") {
            pill.addClass('background-color-dragon');
        } else if (pill[0].innerText === "Dark") {
            pill.addClass('background-color-dark');
        }
    }
}