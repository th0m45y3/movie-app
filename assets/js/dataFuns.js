const api_key = '219b318ed4c1f1965c4a13ec08a94f4c';
const lang = 'en-US';
const posterUrl = 'https://image.tmdb.org/t/p/original';
const table = document.getElementById('big-table');

export async function getData(url, params={'page':1}) {
    showLoading();
    try {
        const res = await fetch(url + combineQueryParams(params));
        const data = await res.json();

        console.log(data.results);
        displayResults(data.results);
      } catch (err) {
        showError();
        throw err;
        return;
    }
}

function showTable() {
    document.getElementById('error-message').classList.add('hidden');
    document.getElementById('loading-message').classList.add('hidden');
    table.classList.remove('hidden');
}

function showError() {
    table.classList.add('hidden');
    document.getElementById('loading-message').classList.add('hidden');
    document.getElementById('error-message').classList.remove('hidden');
}

function showLoading() {
    table.classList.add('hidden');
    document.getElementById('loading-message').classList.remove('hidden');
    document.getElementById('error-message').classList.add('hidden');
}

function displayResults(data) {
    showTable();
    var imageArray = [];
    //if (data.length < 20) makeRows(data.length);
    for(var res in data) {
        table.querySelectorAll('.poster-image').forEach(function(card, index ){
            const img = new Image();
            console.log(posterUrl + data[index].poster_path);
            img.src = String(posterUrl + data[index].poster_path);
            //img.onload()
            //card.style.backgroundImage = "url(" + String(posterUrl + data[index].poster_path) + ")";
            imageArray[index] = img;
            return;
         });
    }

    for(var res in data) {
        table.querySelectorAll('.poster-image').forEach((card, index ) =>
            card.style.backgroundImage = "url(" + imageArray[index].src + ")");
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
