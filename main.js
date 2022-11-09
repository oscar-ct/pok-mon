let localStoredPokemon = '';
let windowCoords = '';


const scrollTop = () => {
  $(window).scrollTop(0);
}


$(".poke-btn").click(function(){
    if ($('#pokemon').attr('placeholder') === 'Please select a generation') {
        $(".input").toggleClass("active");
    } else {
        $(".input").toggleClass("active").focus();
    }
    $(this).toggleClass("animate");
    $('#poke-ball').toggleClass('bounce');
    $(".input").val("");
});

$(document).ready(function() {
    $('.gen:checked').prop('checked', false);
    $(".select option:selected").prop('selected', false);
    $('#pokemon').val('');
});

$(window).resize(function() {
    const genVal = $('.gen:checked').val();
    const selectVal = $(".select option:selected").val();
    // console.log(genVal);
    // console.log(selectVal);
    if ($(window).width() < 880 && genVal !== undefined && genVal !== selectVal) {
        console.log(genVal);
        const select = $(".select option");
        for (let i = 0; i < select.length; i++) {
            const opt = $('option')[i];
            if (opt.value === genVal) {
                $(opt).prop('selected', true);
            }
        }
    } else if ($(window).width() > 880 && selectVal !== 'Select Here' && genVal !== selectVal) {
        console.log(selectVal);
        const gen = $('.gen');
        for (let i = 0; i < gen.length; i++) {
            const sel = gen[i];
            if (sel.value === selectVal) {
                $(sel).prop('checked', true);
            }
        }
    }
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
        return `<span class="pill" style="${applyPillBgColor3(arr[0])}">${arr[0]}</span>`;
    } else if (arr.length === 2) {
        return `<span class="pill" style="${applyPillBgColor3(arr[0])}">${arr[0]}</span><span class="pill" style="${applyPillBgColor3(arr[1])}">${arr[1]}</span>`;
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
    <div class="back-container" onclick="mapLocalPokemon();"><div id="sm-back-container"><i id="back-icon" class="fa-solid fa-circle-left"></i><span class="back exo">back</span></div></div>
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
        // applyPillBgColor2();
        activatePokeBall();
        // console.log(localStoredPokemon);
    });


}



const searchPokemon = (pokemon) => {
    windowCoords = document.documentElement.scrollTop;
    $.ajax("https://pokeapi.co/api/v2/pokemon/" + pokemon).done(function (data) {
        console.log(data);
        $('#output').html(mapApiPokemonToDOM(data));

        // $("#output").animate({ scrollTop: 0 }, "fast");

      // $('.gen:checked').prop('checked', false);
    }).then(function () {
        $(window).scrollTop(0);
        // applyPillBgColor2();
    });
}

const mapLocalPokemon = () => {
    const searchTerm = $('#pokemon').val();
    if (searchTerm === '') {
        $('#output').html(localStoredPokemon[0].map(mapLocalPokemonToDOM));
        $(window).scrollTop(windowCoords);
        // applyPillBgColor2();
    } else {
        const searchResults = localStoredPokemon[0].filter(function (x) {
            if (namesMatch(x.name, searchTerm))
                return x.name;
        });
        $('#output').html(searchResults.map(mapLocalPokemonToDOM));
        $(window).scrollTop(windowCoords);
    }
}

// $('#searchPokemon').click(function (e) {
//     e.preventDefault();
//     const pokemon = $('#pokemon').val();
//     searchPokemon(pokemon);
//     $('.gen:checked').prop('checked', false);
// });


// $('#pokemon').on('input change', function (e) {
//     // $('.gen:checked').prop('checked', false);
//     // console.log(localStoredPokemon);
//     const searchTerm = $('#pokemon').val();
//     console.log(searchTerm);
//     const searchResults = localStoredPokemon[0].filter(function (x) {
//         return x.name.includes(searchTerm);
//     });
//     console.log(searchResults);
//     $('#output').html(searchResults.map(mapLocalPokemonToDOM));
//     // applyPillBgColor2();
// });

$('#pokemon').on('input', function (e) {
    const genVal = $('.gen:checked').val();
    const selectVal = $(".select option:selected").val();

    if (genVal === undefined && selectVal === 'Select Here') {
        alert('Select a pokemon generation');
        $('#pokemon').val('');
    } else {
        // $('.gen:checked').prop('checked', false);
        // console.log(localStoredPokemon);
        const searchTerm = $('#pokemon').val();
        console.log(searchTerm);
        if (searchTerm !== '') {
            const searchResults = localStoredPokemon[0].filter(function (x) {
                if (namesMatch(x.name, searchTerm))
                    return x.name;
            });
            console.log(searchResults);
            $('#output').html(searchResults.map(mapLocalPokemonToDOM));
            // applyPillBgColor2();
        } else {
            $('#output').html(localStoredPokemon[0].map(mapLocalPokemonToDOM));
        }
    }
});


// $("#optionselect").change(function(){
//     Var value =  $(“# optionselect option: selected”);
//     alert(value.text());
//

const namesMatch = (str, searchTerm) => {
    const strArr = str.split('');
    let newArray = [];
    let count = 0;
    for (let i = 1; i < strArr.length + 1; i++) {
        let word = str.slice(0, i);
        newArray.push(word.toLowerCase());
    }
    for (let j = 0; j < newArray.length; j++) {
        if (searchTerm.toLowerCase() === newArray[j]) {
            count++;
        }
    }
    return count !== 0;
}

$('.gen').change(function () {
    const val = $(".gen:checked").val();
    runPokemon(val);
    // if ($(window).width() < 880) {
    //     $('#search-icon-container').css('display', 'flex');
    // }
});


$('.select').change(function () {
    const val = $(".select option:selected").val();
    $("#disable").attr('disabled', true);
    runPokemon(val);
});


const runPokemon = (val) => {
    const placeholder = $('#pokemon');
    switch (val) {
        case '1':
            viewPokemon(1, 152);
            placeholder.attr('placeholder', 'Search: Gen 1 Pokémon')
            break;
        case '2':
            viewPokemon(152, 252);
            placeholder.attr('placeholder', 'Search: Gen 2 Pokémon')
            break;
        case '3':
            viewPokemon(252, 387);
            placeholder.attr('placeholder', 'Search: Gen 3 Pokémon')
            break;
        case '4':
            viewPokemon(387, 494);
            placeholder.attr('placeholder', 'Search: Gen 4 Pokémon')
            break;
        case '5':
            viewPokemon(494, 650);
            placeholder.attr('placeholder', 'Search: Gen 5 Pokémon')
            break;
        case '6':
            viewPokemon(650, 722);
            placeholder.attr('placeholder', 'Search: Gen 6 Pokémon')
            break;
        case '7':
            viewPokemon(722, 810);
            placeholder.attr('placeholder', 'Search: Gen 7 Pokémon')
            break;
        case '8':
            viewPokemon(810, 906);
            placeholder.attr('placeholder', 'Search: Gen 8 Pokémon')
            break;
    }
}

const applyPillBgColor3 = (str) => {
    switch (str) {
        case 'Grass': return 'background-color: #9bcc50;';
        case 'Poison': return 'background-color: #b97fc9; color: white;';
        case 'Fire': return 'background-color: #fd7d24; color: white;';
        case 'Water': return 'background-color: #4592c4; color: white;';
        case 'Flying': return 'background: linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%);';
        case 'Bug': return 'background-color: #729f3f; color: white;';
        case 'Normal': return 'background-color: #a4acaf;';
        case 'Electric': return 'background-color: #eed535;';
        case 'Ground': return 'background: linear-gradient(180deg, #f7de3f 50%, #ab9842 50%);';
        case 'Fairy': return 'background-color: #fdb9e9; color: white;';
        case 'Fighting': return 'background-color: #d56723; color: white;';
        case 'Psychic': return 'background-color: #f366b9;'
        case 'Steel': return 'background-color: #9eb7b8;';
        case 'Ice': return 'background-color: #51c4e7;';
        case 'Ghost': return 'background-color: #7b62a3; color: white;';
        case 'Rock': return 'background-color: #a38c21; color: white;';
        case 'Dragon': return 'background: linear-gradient(180deg, #53a4cf 50%, #f16e57 50%); color: white;';
        case 'Dark': return 'background:   #707070; color: white;';
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


// const applyPillBgColor2 = () => {
//     const val = $('.pill');
//     for (let i = 0; i < val.length; i++) {
//         const pill = val.eq(i);
//         switch (val.eq(i)[0].innerText) {
//             case 'Grass': pill.addClass('background-color-grass'); break;
//             case 'Poison': pill.addClass('background-color-poison'); break;
//             case 'Fire': pill.addClass('background-color-fire'); break;
//             case 'Water': pill.addClass('background-color-water'); break;
//             case 'Flying': pill.addClass('background-color-flying'); break;
//             case 'Bug': pill.addClass('background-color-bug'); break;
//             case 'Normal': pill.addClass('background-color-normal'); break;
//             case 'Electric': pill.addClass('background-color-electric'); break;
//             case 'Ground': pill.addClass('background-color-ground'); break;
//             case 'Fairy': pill.addClass('background-color-fairy'); break;
//             case 'Fighting': pill.addClass('background-color-fighting'); break;
//             case 'Psychic': pill.addClass('background-color-psychic'); break;
//             case 'Steel': pill.addClass('background-color-steel'); break;
//             case 'Ice': pill.addClass('background-color-ice'); break;
//             case 'Ghost': pill.addClass('background-color-ghost'); break;
//             case 'Rock': pill.addClass('background-color-rock'); break;
//             case 'Dragon': pill.addClass('background-color-dragon'); break;
//             case 'Dark': pill.addClass('background-color-dark'); break;
//         }
//     }
// }

