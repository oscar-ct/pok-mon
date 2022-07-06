
const mapToDOM = (pokemon) => `<div>
<img src="${pokemon.front_default}" style="height: 220px; ">
</div>`

function searchPokemon (pokemon) {
    const request = {"url": "https://pokeapi.co/api/v2/pokemon/" + pokemon, "method": "GET"}
    $.ajax(request).done(function (data) {
        const pokemon = data.sprites.other["official-artwork"]
        console.log(data.sprites.other["official-artwork"]);
        $('#output').append(mapToDOM(pokemon))
    });
}

$('#searchPokemon').click(function (e) {
    e.preventDefault();
    const pokemon = $('#pokemon').val()
    searchPokemon(pokemon)
});