
////////////   Helper Functions   ///////////
function clearPokemon() {
    $('#output').html('')
}

function pokemonName (name) {
    return name.charAt(0).toUpperCase() + name.slice(1)
}

function windowReload() {
    location.reload()
}


function pokemonTypes (arrayList) {
    if (arrayList.length <= 1) {
        return arrayList[0].type.name.charAt(0).toUpperCase() + arrayList[0].type.name.slice(1)
    } else if (arrayList.length === 2) {
        return arrayList[0].type.name.charAt(0).toUpperCase() + arrayList[0].type.name.slice(1) + ', ' + arrayList[1].type.name.charAt(0).toUpperCase() + arrayList[1].type.name.slice(1)
    } else {
        return arrayList[0].type.name.charAt(0).toUpperCase() + arrayList[0].type.name.slice(1) + ', ' + arrayList[1].type.name.charAt(0).toUpperCase() + arrayList[1].type.name.slice(1) + ', ' + arrayList[2].type.name.charAt(0).toUpperCase() + arrayList[2].type.name.slice(1)
    }
}


////////////  Map To DOM Using API Data  ///////////////
const mapToDOM = (pokemon) => `<div onclick="searchPokemon(${pokemon.id})">
    <img src="${pokemon.sprites.other["official-artwork"].front_default}" style="height: 185px; ">
    <div><h7>Name: <span>${pokemonName(pokemon.name)}</span></h7></div>
    <div><h7>Type(s): <span></span>${pokemonTypes(pokemon.types)}</h7></div>
    </div>`

const mapToDOM2 = (pokemon) => `<div data-id="${pokemon.id}">
    <img src="${pokemon.sprites.other["official-artwork"].front_default}" style="height: 450px;">
    <div class="d-flex justify-content-center"><h4>Name: <span>${pokemonName(pokemon.name)}</span></h4></div>
    <div class="d-flex justify-content-center"><h4>Type(s): <span></span>${pokemonTypes(pokemon.types)}</h4></div>
    </div>`


///////////   API request here  //////////////
function viewPokemon (pokemon) {
    const urls = {"url": "https://pokeapi.co/api/v2/pokemon/" + pokemon, "method": "GET"}
    $.ajax(urls).then(function (data) {
        $('#output').append(mapToDOM(data))
    });
}

function searchPokemon (pokemon) {
    const urls = {"url": "https://pokeapi.co/api/v2/pokemon/" + pokemon, "method": "GET"}
    $.ajax(urls).then(function (data) {
        $('#output').html(mapToDOM2(data))
    });
}


///////////  Search Bar Functionality  //////////
$('#searchPokemon').click(function (e) {
    e.preventDefault();
    clearPokemon();
    const pokemon = $('#pokemon').val()
    searchPokemon(pokemon);
});


//////////  View All Pokemon Button  /////////
$('#viewAllPokemon').click(function () {
    clearPokemon();
    viewAllPokemon();
});
function viewAllPokemon () {
    for (let i = 0; i < 151; i++) {
        viewPokemon(i);
    }
}


//////////  View Pokemon 2000 Button  /////////
$('#viewPokemon2000').click(function () {
    clearPokemon();
    viewAllPokemon2000();
});
function viewAllPokemon2000 () {
    for (let i = 0; i < pokemon2000.length; i++) {
        viewPokemon(pokemon2000[i].toLowerCase());
    }
}
const pokemon2000 = [
    'Pikachu', 'Meowth', 'Togepi', 'Bulbasaur', 'Charizard', 'Squirtle', 'Lapras', 'Snorlax', 'Goldeen', 'Staryu', 'Psyduck', 'Venonat', 'Marill', 'Scyther', 'Arbok', 'Weezing', 'Mr-Mime', 'Zapdos', 'Articuno', 'Moltres', 'Lugia', 'Slowking', 'Slowpoke', 'Slowbro', 'Magikarp', 'Pidgey', 'Pidgeotto', 'Pidgeot', 'Diglett', 'Paras', 'Parasect', 'Seel', 'Dewgong', 'Wartortle', 'Blastoise', 'Ekans', 'Arbok', 'Eevee', 'Vaporeon', 'Lickitung', 'Tentacool', 'Tentacruel', 'Golduck', 'Horsea', 'Seadra', 'Seaking', 'Gyarados', 'Starmie', 'Venomoth', 'Spearow', 'Fearow', 'Butterfree', 'Zubat', 'Golbat', 'Raichu', 'Rhyhorn', 'Rhydon', 'Onix', 'Cubone', 'Exeggutor', 'Machop', 'Machoke', 'Machamp', 'Hitmonlee', 'Hitmonchan', 'Primeape', 'Tauros', 'Voltorb', 'Geodude', 'Golem', 'Nidoran-m', 'Nidoran-f', 'Nidorino', 'Nidoking', 'Nidorina', 'Nidoqueen', 'Vulpix', 'Ninetales', 'Rapidash', 'Doduo', 'Dodrio', 'Magnemite', 'Magneton', 'Ivysaur', 'Venusaur', 'Sandshrew', 'Sandslash', 'Kangaskhan', 'Rattata', 'Raticate', 'Pinsir', 'Electabuzz', 'Alakazam', 'Wigglytuff', 'Tangela', 'Oddish', 'Gloom', 'Vileplume', 'Krabby', 'Kingler', 'Clefairy', 'Drowzee', 'Hypno', 'Shellder', 'Cloyster', 'Poliwag', 'Poliwhirl', 'Poliwrath', 'Beedrill', 'Chansey', 'Growlithe', 'Bellsprout', 'Weepinbell', 'Victreebel']