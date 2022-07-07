
////////////   Helper Functions   ///////////

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


////////////  DOM  ///////////////
const mapToDOM = (pokemon) => `<div>

<img src="${pokemon.sprites.other["official-artwork"].front_default}" style="height: 185px; ">
<div><h6>Name: <span>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span></h6></div>
<div><h6>Type: <span>${pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1)}</span></h6></div>
<div><h6>ID: <span>${pokemon.id}</span></h6></div>
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
    viewAllPokemon()
});

function viewAllPokemon () {
    for (let i = 0; i <= 250; i++) {
        searchPokemon(i)
    }
}

