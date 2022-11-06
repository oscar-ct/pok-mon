let localStoredPokemon = '';

$(".poke-btn").click(function(){
    $(".input").toggleClass("active").focus();
    $(this).toggleClass("animate");
    $('#poke-ball').toggleClass('bounce');
    $(".input").val("");
});

$(document).ready(function() {
    $('.gen:checked').prop('checked', false);
});
$(window).resize(function() {
    activatePokeBall();
});
    // if ($(window).width() < 700) {
    //     $('.poke-btn').addClass('animate');
    //     $('.input').addClass('active');
    //     $('#poke-ball').removeClass('bounce');
    // }
// });

const activatePokeBall = () => {
    if (!$('#pokemon').hasClass('active') && $(window).width() > 880) {
        $('.poke-btn').addClass('animate');
        $('.input').addClass('active');
        $('#poke-ball').removeClass('bounce');
    }
}

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
    return `${feet}' ${inches}"`;
}


const mapApiPokemonListToDOM = (pokemon) => `<div class="pokemon-card" onclick="searchPokemon(${pokemon.id})" style="cursor: pointer;">
    <div class="mx-2 my-2"><img class="sm-img" src="${pokemon.sprites.other["official-artwork"].front_default}"></div>
    <div><span class="pokemon-id">#${pokemon.id}</span></div>
    <div class="sm-poke-name"><span class="exo">${pokemonName(pokemon.name)}</span></div>
    <div class="pill-container">${pillPokemonTypes(pokemonTypes(pokemon.types))}</div>
</div>`;

const mapApiPokemonToDOM = (pokemon) => `<div id="lg-main-container" data-id="${pokemon.id}">
    <div class="back-container"><span class="back exo" onclick="mapLocalPokemon();">&lt;&lt;back</span></div>
    <div id="pokemon-stats-container">
        <div id="lg-img-container"><img id="lg-img" src="${checkingPokemonImg(pokemon)}"></div>
        <div id="pokemon-details-container">
            <div id="poke-details">
                <div id="lg-pokemon-name"><span class="exo">${pokemonName(pokemon.name)}</span></div>
                <div class="pill-container">${pillPokemonTypes(pokemonTypes(pokemon.types))}</div>
                <div class="exo poke-stats"><span class="stat">Height:</span><span>${pokemonHeight(pokemon.height * 10)}</span></div>
                <div class="exo poke-stats"><span class="stat">Weight:</span><span>${(pokemon.weight/4.536).toFixed(2) + "lbs"}</span></div>
            </div>
        </div>
    </div>
</div>`;

const mapLocalPokemonToDOM = (pokemon) => `<div class="pokemon-card" onclick="searchPokemon(${pokemon.id})" style="cursor: pointer">
    <div class="mx-2 my-2"><img class="sm-img" src="${pokemon.sprite}"></div>
    <div><span class="pokemon-id">#${pokemon.id}</span></div>
    <div class="sm-poke-name"><span class="exo">${pokemonName(pokemon.name)}</span></div>
    <div class="pill-container">${pillPokemonTypes(pokemon.type)}</div>
</div>`;


const checkingPokemonImg = (pokemon) => {
    const officialArtwork = pokemon.sprites.other["official-artwork"].front_default;
    const dreamWorld = pokemon.sprites.other.dream_world["front_default"];
  if (dreamWorld !== null) {
      return dreamWorld;
  } else {
      return officialArtwork;
  }
}

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
    }).then(function () {
        applyPillBgColor2();
        activatePokeBall();
        // console.log(localStoredPokemon);
    });


}



const searchPokemon = (pokemon) => {
    $.ajax("https://pokeapi.co/api/v2/pokemon/" + pokemon).done(function (data) {
        console.log(data);
        $('#output').html(mapApiPokemonToDOM(data));

        // $("#output").animate({ scrollTop: 0 }, "fast");

      // $('.gen:checked').prop('checked', false);
    }).then(function () {
        $("#output").scrollTop(0);
        applyPillBgColor2();
    });
}

const mapLocalPokemon = () => {
    $('#output').html(localStoredPokemon[0].map(mapLocalPokemonToDOM));
    applyPillBgColor2();
}

// $('#searchPokemon').click(function (e) {
//     e.preventDefault();
//     const pokemon = $('#pokemon').val();
//     searchPokemon(pokemon);
//     $('.gen:checked').prop('checked', false);
// });



$('#pokemon').on('input', function (e) {
    // $('.gen:checked').prop('checked', false);
    // console.log(localStoredPokemon);
    const searchTerm = $('#pokemon').val();
    console.log(searchTerm);
    const searchResults = localStoredPokemon[0].filter(function (x) {
        return x.name.includes(searchTerm);
    });
    console.log(searchResults);
    $('#output').html(searchResults.map(mapLocalPokemonToDOM));
    applyPillBgColor2();
});



$('.gen').change(function () {
    const val = $(".gen:checked").val();
    const placeholder = $('#pokemon');
    switch (val) {
        case '1':
            viewPokemon(1, 51);
            placeholder.attr('placeholder', 'Search Gen 1 Pokémon')
            break;
        case '2':
            viewPokemon(152, 252);
            placeholder.attr('placeholder', 'Search Gen 2 Pokémon')
            break;
        case '3':
            viewPokemon(252, 387);
            placeholder.attr('placeholder', 'Search Gen 3 Pokémon')
            break;
        case '4':
            viewPokemon(387, 494);
            placeholder.attr('placeholder', 'Search Gen 4 Pokémon')
            break;
        case '5':
            viewPokemon(494, 650);
            placeholder.attr('placeholder', 'Search Gen 5 Pokémon')
            break;
        case '6':
            viewPokemon(650, 722);
            placeholder.attr('placeholder', 'Search Gen 6 Pokémon')
            break;
        case '7':
            viewPokemon(722, 810);
            placeholder.attr('placeholder', 'Search Gen 7 Pokémon')
            break;
        case '8':
            viewPokemon(810, 906);
            placeholder.attr('placeholder', 'Search Gen 8 Pokémon')
            break;
    }

});


const applyPillBgColor2 = () => {
    const val = $('.pill');
    for (let i = 0; i < val.length; i++) {
        const pill = val.eq(i);
        switch (val.eq(i)[0].innerText) {
            case 'Grass': pill.addClass('background-color-grass'); break;
            case 'Poison': pill.addClass('background-color-poison'); break;
            case 'Fire': pill.addClass('background-color-fire'); break;
            case 'Water': pill.addClass('background-color-water'); break;
            case 'Flying': pill.addClass('background-color-flying'); break;
            case 'Bug': pill.addClass('background-color-bug'); break;
            case 'Normal': pill.addClass('background-color-normal'); break;
            case 'Electric': pill.addClass('background-color-electric'); break;
            case 'Ground': pill.addClass('background-color-ground'); break;
            case 'Fairy': pill.addClass('background-color-fairy'); break;
            case 'Fighting': pill.addClass('background-color-fighting'); break;
            case 'Psychic': pill.addClass('background-color-psychic'); break;
            case 'Steel': pill.addClass('background-color-steel'); break;
            case 'Ice': pill.addClass('background-color-ice'); break;
            case 'Ghost': pill.addClass('background-color-ghost'); break;
            case 'Rock': pill.addClass('background-color-rock'); break;
            case 'Dragon': pill.addClass('background-color-dragon'); break;
            case 'Dark': pill.addClass('background-color-dark'); break;
        }
    }
}

const pokemon2000 = [
    'Pikachu', 'Meowth', 'Togepi', 'Bulbasaur', 'Charizard', 'Squirtle', 'Lapras', 'Snorlax', 'Goldeen', 'Staryu', 'Psyduck', 'Venonat', 'Marill', 'Scyther', 'Arbok', 'Weezing', 'Mr-Mime', 'Zapdos', 'Articuno', 'Moltres', 'Lugia', 'Slowking', 'Slowpoke', 'Slowbro', 'Magikarp', 'Pidgey', 'Pidgeotto', 'Pidgeot', 'Diglett', 'Paras', 'Parasect', 'Seel', 'Dewgong', 'Wartortle', 'Blastoise', 'Ekans', 'Arbok', 'Eevee', 'Vaporeon', 'Lickitung', 'Tentacool', 'Tentacruel', 'Golduck', 'Horsea', 'Seadra', 'Seaking', 'Gyarados', 'Starmie', 'Venomoth', 'Spearow', 'Fearow', 'Butterfree', 'Zubat', 'Golbat', 'Raichu', 'Rhyhorn', 'Rhydon', 'Onix', 'Cubone', 'Exeggutor', 'Machop', 'Machoke', 'Machamp', 'Hitmonlee', 'Hitmonchan', 'Primeape', 'Tauros', 'Voltorb', 'Geodude', 'Golem', 'Nidoran-m', 'Nidoran-f', 'Nidorino', 'Nidoking', 'Nidorina', 'Nidoqueen', 'Vulpix', 'Ninetales', 'Rapidash', 'Doduo', 'Dodrio', 'Magnemite', 'Magneton', 'Ivysaur', 'Venusaur', 'Sandshrew', 'Sandslash', 'Kangaskhan', 'Rattata', 'Raticate', 'Pinsir', 'Electabuzz', 'Alakazam', 'Wigglytuff', 'Tangela', 'Oddish', 'Gloom', 'Vileplume', 'Krabby', 'Kingler', 'Clefairy', 'Drowzee', 'Hypno', 'Shellder', 'Cloyster', 'Poliwag', 'Poliwhirl', 'Poliwrath', 'Beedrill', 'Chansey', 'Growlithe', 'Bellsprout', 'Weepinbell', 'Victreebel'];

// const applyPillBgColor = () => {
//     const val = $('.pill');
//     for (let i = 0; i < 1; i++) {
//         const pill = val.eq(i);
//         if (pill[0].innerText === "Grass") {
//             pill.addClass('background-color-grass');
//         } else if (pill[0].innerText === "Poison") {
//             pill.addClass('background-color-poison');
//         } else if (pill[0].innerText === "Fire") {
//             pill.addClass('background-color-fire');
//         } else if (pill[0].innerText === "Water") {
//             pill.addClass('background-color-water');
//         } else if (pill[0].innerText === "Flying") {
//             pill.addClass('background-color-flying');
//         } else if (pill[0].innerText === "Bug") {
//             pill.addClass('background-color-bug');
//         } else if (pill[0].innerText === "Normal") {
//             pill.addClass('background-color-normal');
//         } else if (pill[0].innerText === "Electric") {
//             pill.addClass('background-color-electric');
//         } else if (pill[0].innerText === "Ground") {
//             pill.addClass('background-color-ground');
//         } else if (pill[0].innerText === "Fairy") {
//             pill.addClass('background-color-fairy');
//         } else if (pill[0].innerText === "Fighting") {
//             pill.addClass('background-color-fighting');
//         } else if (pill[0].innerText === "Psychic") {
//             pill.addClass('background-color-psychic');
//         } else if (pill[0].innerText === "Steel") {
//             pill.addClass('background-color-steel');
//         } else if (pill[0].innerText === "Ice") {
//             pill.addClass('background-color-ice');
//         } else if (pill[0].innerText === "Ghost") {
//             pill.addClass('background-color-ghost');
//         } else if (pill[0].innerText === "Rock") {
//             pill.addClass('background-color-rock');
//         } else if (pill[0].innerText === "Dragon") {
//             pill.addClass('background-color-dragon');
//         } else if (pill[0].innerText === "Dark") {
//             pill.addClass('background-color-dark');
//         }
//     }
// }


