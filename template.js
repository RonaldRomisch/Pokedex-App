//Template for abilities
function renderPokemonInfo(id) {
    let currentPokemon = dataArray[id];
    let infoPokemon = document.getElementById('single-info');
    if(currentPokemon['types'] > 1 || currentPokemon['abilities'] > 1) {
        infoPokemon.innerHTML = `
            <div class="info-abilities">
                <div class="info-abilities-text">Abilities: </div>
                <div class="abilities">
                    <div>${currentPokemon['abilities'][0]['ability']['name']}</div>
                    <div>${currentPokemon['abilities'][1]['ability']['name']}</div>
                </div>
            </div>
            <div class="info-abilities">
                <div class="info-abilities-text">Types: </div>
                <div class="abilities">
                    <div>${currentPokemon['types'][0]['type']['name']}</div>
                    <div>${currentPokemon['types'][1]['type']['name']}</div>
                </div>
            </div>
            <div class="info-abilities">
                <div class="info-abilities-text">Height: </div>
                <div class="abilities">${currentPokemon['height']}</div>
            </div>
            <div class="info-abilities">
                <div class="info-abilities-text">Weight: </div>
                <div class="abilities">${currentPokemon['weight']}</div>
            </div>
        `;
    } else {
        infoPokemon.innerHTML = `
            <div class="info-abilities">
                <div class="info-abilities-text">Abilities: </div>
                <div class="abilities">
                    <div>${currentPokemon['abilities'][0]['ability']['name']}</div>
                </div>
            </div>
            <div class="info-abilities">
                <div class="info-abilities-text">Types: </div>
                <div class="abilities">
                    <div>${currentPokemon['types'][0]['type']['name']}</div>
                </div>
            </div>
            <div class="info-abilities">
                <div class="info-abilities-text">Height: </div>
                <div class="abilities">${currentPokemon['height']}</div>
            </div>
            <div class="info-abilities">
                <div class="info-abilities-text">Weight: </div>
                <div class="abilities">${currentPokemon['weight']}</div>
            </div>
        `;
    }
    infoPokemon.style = 'margin-top: 10px;';
    getCSSStyleInfo('bold', 'normal', 'normal');
}

function getCSSStyleInfo(info, status, moves) {
    document.getElementById('info-info').style = `font-weight: ${info};`
    document.getElementById('info-status').style = `font-weight: ${status};`
    document.getElementById('info-moves').style = `font-weight: ${moves};`
}

//Template for the moves
function showMoves(id) {
    getBeginningOfMoves();
    let movesInfoPokemon = document.getElementById('single-move');
    if(dataArray[id]['moves'].length > 4) {
        for(let i = 0; i < 4; i++) {
            movesInfoPokemon.innerHTML += `<div class="move">${dataArray[id]['moves'][i]['move']['name']}</div>`;
        }
    } else {
        for(let j = 0; j < dataArray[id]['moves'].length; j++) {
            movesInfoPokemon.innerHTML += `<div class="move">${dataArray[id]['moves'][j]['move']['name']}</div>`;
        }
    }
}

function getBeginningOfMoves() {
    let movesInfo = document.getElementById('single-info');
    movesInfo.innerHTML = `
            <div id="single-move" class="single-moves"></div>
    `;
    movesInfo.style = 'margin-top: 0;'
    getCSSStyleInfo('normal', 'normal', 'bold');
}

function showDetailedView(id) {
    let detailedCard = document.getElementById('detailed-view');
    detailedCard.innerHTML = `
        <div id="detailed-pokemon-card" class="pokemon-card">
            <div id="pokedex" class="pokemon-card-top" onclick="isNotBackground()">
                <div class="name-close-container">
                    <div class="background-name"><p id="pokemon-name">${firstLetterUpperCase(dataArray[id]['name'])}</p></div>
                    <div class="background-img"><img class="close-img" onclick="removeDetailedView()" src="img/x-gf60cc9487_1280.png" alt=""></div>
                </div>
                <div><img id="pokemon-img" class="pokemon-img" src="${dataArray[id]['sprites']['other']['official-artwork']['front_default']}" alt=""></div>
            </div>
            <div id="pokedex-bottom" class="pokemon-card-info-with-arrows" onclick="isNotBackground()">
                <div class="pokemon-card-info">
                    <ul class="list-info">
                        <li id="info-info" onclick="renderPokemonInfo(${id})">Info</li>
                        <li id="info-status" onclick="showStatusPokemon(${id})">Status</li>
                        <li id="info-moves" onclick="showMoves(${id})">Moves</li>
                    </ul>
                    <div id="single-info" class="info"></div>
                </div>
                <div class="both-arrows">
                    <div id="left-arrow" class="arrow" onclick="getDetailedView(${id-1})"><img src="./img/pfeil-nach-links.png"></div>
                    <div id="right-arrow" class="arrow" onclick="getDetailedView(${id+1})"><img src="./img/pfeil-rechts.png"></div>
                </div>
            </div>
        </div>
    `;
    detailedCard.classList.remove('d-none');
    renderPokemonInfo(id);
    document.getElementById('pokedex').style = `background-color: ${backgroundDetailedView[dataArray[id]['types'][0]['type']['name']]};`
    if(dataArray[id]['types'][0]['type']['name'] == 'shadow' || dataArray[id]['types'][0]['type']['name'] == 'dark' || dataArray[id]['types'][0]['type']['name'] == 'ghost') {
        document.getElementById('pokemon-name').style = 'color: white;'
    }  
    if(id === 0) {
        document.getElementById('left-arrow').classList.add('d-none');
    }  
}

function showPokemon(id, currentPokemon) {
    let renderAllCards = document.getElementById('display-cards');
    let anotherId = id + 1;
    renderAllCards.innerHTML += `
        <div id="small-card-${id}" class="small-card" onclick="showDetailedView(${id})">
            <div id="small-card-name-${id}" class="small-card-name">Name</div>
            <div class="small-card-img"><img id="small-card-img-${id}" src="./img/pokemon-g4525ff8eb_1280.png" alt=""></div>
            ${getTwoOrOneType(currentPokemon)}
        </div>
    `;
    let name = document.getElementById('small-card-name-' + id);
    name.innerHTML = '#' + anotherId + ' ' + firstLetterUpperCase(currentPokemon['name']);
    document.getElementById('small-card-img-' + id).src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    let card = document.getElementById('small-card-' + id);
    card.style = `background-color: ${chooseColorThroughType(currentPokemon)};`;
}

function getTwoOrOneType(currentPokemon) {
    if(currentPokemon['types'].length > 1) {
        return `<div class="display-types">
                    <div class="display-type">${firstLetterUpperCase(currentPokemon['types'][0]['type']['name'])}</div>
                    <div class="display-type">${firstLetterUpperCase(currentPokemon['types'][1]['type']['name'])}</div>
                </div>`;
    }
    else {
        return `<div class="display-type">${firstLetterUpperCase(currentPokemon['types'][0]['type']['name'])}</div>`;
    }
}

//template for the bigger picture
function showSinglePokemon() {
    document.getElementById('pokemon-name').innerHTML = '#' + pokemonId + ' ' + firstLetterUpperCase(currentPokemon['name']);
    document.getElementById('pokemon-img').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
}