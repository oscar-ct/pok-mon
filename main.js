

const pokemonName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
}
const windowReload = () => {
    location.reload();
}

const pokemonTypes = (arr) => {
    if (arr.length <= 1) {
        return arr[0].type.name.charAt(0).toUpperCase() + arr[0].type.name.slice(1);
    } else if (arr.length === 2) {
        return arr[0].type.name.charAt(0).toUpperCase() + arr[0].type.name.slice(1) + ', ' + arr[1].type.name.charAt(0).toUpperCase() + arr[1].type.name.slice(1);
    } else {
        return arr[0].type.name.charAt(0).toUpperCase() + arr[0].type.name.slice(1) + ', ' + arr[1].type.name.charAt(0).toUpperCase() + arr[1].type.name.slice(1) + ', ' + arr[2].type.name.charAt(0).toUpperCase() + arr[2].type.name.slice(1);
    }
}
const pokemonHeight = (height) => {
    let inches = (height / 2.54).toFixed(0);
    let feet = Math.floor(inches / 12);
    inches %= 12;
    return `${feet}' ${inches}"`
}


const mapApiPokemonListToDOM = (pokemon) => `<div onclick="searchPokemon(${pokemon.id})" style="cursor: pointer">
    <img src="${pokemon.sprites.other["official-artwork"].front_default}" style="height: 185px; ">
    <div><h7>Name: <span>${pokemonName(pokemon.name)}</span></h7></div>
    <div><h7>Type: <span></span>${pokemonTypes(pokemon.types)}</h7></div>
    </div>`;

const mapApiPokemonToDOM = (pokemon) => `<div data-id="${pokemon.id}" style="cursor: pointer">
    <img src="${pokemon.sprites.other.dream_world["front_default"]}" style="height: 500px;">
    <div class="d-flex justify-content-center"><h4>Name: <span>${pokemonName(pokemon.name)}</span></h4></div>
    <div class="d-flex justify-content-center"><h4>Type: <span>${pokemonTypes(pokemon.types)}</span></h4></div>
     <div class="d-flex justify-content-center"><h4>Height: <span>${pokemonHeight(pokemon.height * 10)}</span></h4></div>
      <div class="d-flex justify-content-center"><h4>Weight: <span>${(pokemon.weight/4.536).toFixed(2) + "lbs"}</span></h4></div>
    </div>`;
const mapLocalPokemonToDOM = (pokemon) => `<div onclick="searchPokemon(${pokemon.id})" style="cursor: pointer">
    <img src="${pokemon.sprite}" style="height: 185px; ">
    <div><h7>Name: <span>${pokemonName(pokemon.name)}</span></h7></div>
    <div><h7>Type: <span></span>${pokemon.type}</h7></div>
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
    });
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
});



$('#viewAllPokemon').click(function () {
    viewPokemon(1,151);
});

$('#viewAllPokemon2').click(function () {
    viewPokemon(152, 300);
});

$('#viewAllPokemon3').click(function () {
    viewPokemon(301, 450);
});
$('#viewAllPokemon4').click(function () {
    viewPokemon(451, 600);
});





$('#viewPokemon2000').click(function () {
    viewAllPokemon2000();
});
function viewAllPokemon2000 () {
    for (let i = 0; i < pokemon2000.length; i++) {
        viewPokemon(pokemon2000[i].toLowerCase());
    }
}
const pokemon2000 = [
    'Pikachu', 'Meowth', 'Togepi', 'Bulbasaur', 'Charizard', 'Squirtle', 'Lapras', 'Snorlax', 'Goldeen', 'Staryu', 'Psyduck', 'Venonat', 'Marill', 'Scyther', 'Arbok', 'Weezing', 'Mr-Mime', 'Zapdos', 'Articuno', 'Moltres', 'Lugia', 'Slowking', 'Slowpoke', 'Slowbro', 'Magikarp', 'Pidgey', 'Pidgeotto', 'Pidgeot', 'Diglett', 'Paras', 'Parasect', 'Seel', 'Dewgong', 'Wartortle', 'Blastoise', 'Ekans', 'Arbok', 'Eevee', 'Vaporeon', 'Lickitung', 'Tentacool', 'Tentacruel', 'Golduck', 'Horsea', 'Seadra', 'Seaking', 'Gyarados', 'Starmie', 'Venomoth', 'Spearow', 'Fearow', 'Butterfree', 'Zubat', 'Golbat', 'Raichu', 'Rhyhorn', 'Rhydon', 'Onix', 'Cubone', 'Exeggutor', 'Machop', 'Machoke', 'Machamp', 'Hitmonlee', 'Hitmonchan', 'Primeape', 'Tauros', 'Voltorb', 'Geodude', 'Golem', 'Nidoran-m', 'Nidoran-f', 'Nidorino', 'Nidoking', 'Nidorina', 'Nidoqueen', 'Vulpix', 'Ninetales', 'Rapidash', 'Doduo', 'Dodrio', 'Magnemite', 'Magneton', 'Ivysaur', 'Venusaur', 'Sandshrew', 'Sandslash', 'Kangaskhan', 'Rattata', 'Raticate', 'Pinsir', 'Electabuzz', 'Alakazam', 'Wigglytuff', 'Tangela', 'Oddish', 'Gloom', 'Vileplume', 'Krabby', 'Kingler', 'Clefairy', 'Drowzee', 'Hypno', 'Shellder', 'Cloyster', 'Poliwag', 'Poliwhirl', 'Poliwrath', 'Beedrill', 'Chansey', 'Growlithe', 'Bellsprout', 'Weepinbell', 'Victreebel'];

