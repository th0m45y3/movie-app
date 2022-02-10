const api_key = '219b318ed4c1f1965c4a13ec08a94f4c';
const lang = 'en-US';
const posterUrl = 'https://image.tmdb.org/t/p/original';
const table = document.getElementById('big-table');

export async function getData(url, params={'page':1}) {
    showLoading();
    try {
        const res = await fetch(url + combineQueryParams(params));
        const data = await res.json();

        displayResults(data.results);
        console.log(data);
      } catch (err) {
        showError();
        throw err;
        return;
    }
}

function showTable() {
    document.body.style.overflow = '';
    document.getElementById('error-message').classList.add('hidden');
    document.getElementById('loading-message').classList.add('hidden');
    table.classList.remove('hidden');
}

function showError() {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    table.classList.add('hidden');
    document.getElementById('loading-message').classList.add('hidden');
    document.getElementById('error-message').classList.remove('hidden');
}

function showLoading() {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    table.classList.add('hidden');
    document.getElementById('loading-message').classList.remove('hidden');
    document.getElementById('error-message').classList.add('hidden');
}

function displayResults(data) {
    resetImages();
    for(var res in data) {
        var currentItem = document.getElementById(`card-${res}`)
        currentItem.querySelector('.title').innerHTML = data[res].title;
        currentItem.querySelector('.overview').innerHTML = data[res].overview;
        currentItem.querySelector('.release-date').innerHTML = data[res].release_date;
        currentItem.querySelector('.popularity').innerHTML = data[res].popularity;
        currentItem.querySelector('.vote-average').innerHTML = data[res].vote_average;
    }
    showTable();
    if (data.length < 20) makeRows(data.length);
    for(var res in data) {
        table.querySelectorAll('.poster-image').forEach(function(card, index ){
            const img = new Image();
            img.src = data[index].poster_path ? String(posterUrl + data[index].poster_path) : './assets/img/noImage.png';
            img.onload = () => card.style.backgroundImage = "url(\'" + img.src + "\')";
            return;
         });
    }
}



function makeRows(rows) {
    let tableSize = table.tBodies[0].rows.length;
    console.log(table.tBodies[0].rows.length);
    console.log(table.tBodies[0].rows);
    while(rows < tableSize) {
        table.deleteRow(tableSize-1);
    }
}

function combineQueryParams(params){
    return '?api_key='+ api_key + '&' + Object.keys(params).map( k => `${k}=${params[k]}`).join('&');
}

function resetImages() {
    table.querySelectorAll('.poster-image').forEach( card => card.style.backgroundImage = 'url(./assets/video/load.gif)')
}
