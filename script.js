let LoadedPokemon = 40;
let dataArray = [];
let boolean = true;

async function render() {
    let renderAllCards = document.getElementById('display-cards');
    renderAllCards.innerHTML = '';
    await storeAllData(0, LoadedPokemon);
    for (let i = 0; i < LoadedPokemon; i++) {
        showPokemon(i, dataArray[i]);
    }
}

async function loadMorePokemon() {
    changingButton(true);
    let moreLoadedPokemon = LoadedPokemon + 30;
    await storeAllData(LoadedPokemon, moreLoadedPokemon);
    for (let i = LoadedPokemon; i < moreLoadedPokemon; i++) {
        showPokemon(i, dataArray[i]);
    }
    LoadedPokemon += 30;
    changingButton(false);
}

async function storeAllData(beginning, end) {
    for (let i = beginning; i < end; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i+1}`;
        let response = await fetch(url);
        let currPokemon = await response.json();
        dataArray.push(currPokemon);
    }
}

function changingButton(boolean) {
    document.getElementById('load-more-button').disabled = boolean;
}

function filteredPokemon() { // search function
    let search = document.getElementById('search').value.toLowerCase();
    let renderAllCards = document.getElementById('display-cards');
    renderAllCards.innerHTML = '';
    for (let i = 0; i < LoadedPokemon; i++) {
        let name = dataArray[i];
        if (name['name'].includes(search)) {
            showPokemon(i, name);
        }
    }
}

function getDetailedView(counter) {
    showDetailedView(counter);
}

function isNotBackground() {
    boolean = false;
    return boolean;
}

function removeDetailedView() {
    let detailedCard = document.getElementById('detailed-view');
    if(boolean) {
        detailedCard.classList.add('d-none');
    }
    boolean = true;
}

function chooseColorThroughType(currentPokemon) {
    let type = currentPokemon['types'][0]['type']['name'];
    return colorTypes[type];
}

function firstLetterUpperCase(pokemonName) {
    return pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
}