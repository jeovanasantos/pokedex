const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status=== 200){
        const data = APIResponse.json(); 
    return data;
    }
    
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    const data = await fetchPokemon(pokemon);
    
    if(data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value ='';
        searchPokemon = data.id;
    }else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
    }
}


input.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        renderPokemon(input.value.toLowerCase());
    }
});
document.addEventListener('keydown', function(event) {
    if (event.keyCode === 37) {
            searchPokemon -= 1;
            renderPokemon(searchPokemon);
    } else if (event.keyCode === 39) {
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    }
});


renderPokemon(searchPokemon);