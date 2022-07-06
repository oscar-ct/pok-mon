
const mapToDOM = (pokemon) => `<div>
<img src="${pokemon.back_default}" style="height: 220px; ">
</div>`

function searchPokemon (pokemon) {
    const request = {"url": "https://pokeapi.co/api/v2/pokemon/" + pokemon, "method": "GET"}
    $.ajax(request).done(function (data) {
        // const pokemon = data.sprites.map(mapToDOM);
        console.log(data.sprites);
    });
}