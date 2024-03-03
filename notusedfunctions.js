// load more pokemon if a search-input was given and output should be only pokemon with matching strings
async function loadMorePokemon() {
    let button = document.getElementById('load-more-button');
    button.disabled = true;
    let inputValue = document.getElementById('search').value;
    if(!inputValue) {
        for (let i = LoadedPokemon; i < LoadedPokemon + 30; i++) {
            let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            let response = await fetch(url);
            currentPokemon = await response.json();
            showPokemon(i, currentPokemon);
        }
        LoadedPokemon += 30;
    }
    else {
        for (let i = LoadedPokemon; i < LoadedPokemon + 30; i++) {
            let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            let response = await fetch(url);
            currentPokemon = await response.json();
            if (currentPokemon['name'].includes(inputValue)) {
                showPokemon(i, currentPokemon);
            }
        }
        LoadedPokemon += 30;
    }
    if(i === LoadedPokemon + 29) {
        button.disabled = false;
    }
}