
////////////   Helper Functions   ///////////

function pokemonTypes (arrayList) {
    if (arrayList.length <= 1) {
        return arrayList[0].type.name.charAt(0).toUpperCase() + arrayList[0].type.name.slice(1)
    } else if (arrayList.length === 2) {
        return arrayList[0].type.name.charAt(0).toUpperCase() + arrayList[0].type.name.slice(1) + ',' + arrayList[1].type.name.charAt(0).toUpperCase() + arrayList[1].type.name.slice(1)
    }
}

////////////  DOM  ///////////////
const mapToDOM = (pokemon) => `<div>

<img src="${pokemon.sprites.other["official-artwork"].front_default}" style="height: 185px; ">
<div><h6>Name: <span>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span></h6></div>
<div><h6>Type: <span></span>${pokemonTypes(pokemon.types)}</h6></div>
<div><h6>ID: <span>${pokemon.id}</span></h6></div>
<button class="btn-test" onclick="test(${pokemon.id})">Test</button>
</div>`

///////////   API request here  //////////////
function searchPokemon (pokemon) {
    const request = {"url": "https://pokeapi.co/api/v2/pokemon/" + pokemon, "method": "GET"}
    $.ajax(request).done(function (data) {
        console.log(data)
        $('#output').append(mapToDOM(data))
    });
}

///////////  Search Bar Functionality  //////////
$('#searchPokemon').click(function (e) {
    e.preventDefault();
    const pokemon = $('#pokemon').val()
    searchPokemon(pokemon)
});

//////////  View All Button  /////////

$('#viewAllPokemon').click(function () {
    viewAllPokemon();
});

function viewAllPokemon () {
    for (let i = 0; i <= 151; i++) {
        searchPokemon(i)
    }
}


//////////// Test Button  /////////////


function test(id) {
    alert(id)
}