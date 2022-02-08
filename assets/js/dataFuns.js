const api_key = '219b318ed4c1f1965c4a13ec08a94f4c';
const lang = 'en-US';
const posterUrl = 'https://image.tmdb.org/t/p/original/';
const table = document.getElementById('big-table');

export async function getData(url, params={'page':1}) {
    try {
        const res = await fetch(url + combineQueryParams(params));
        const data = await res.json();

        console.log(data.results.length);
        if (data.results.length < 20) makeRows(data.results.length);
        var currentImage = posterUrl + data.results[0]['poster_path'];
        table.querySelectorAll('.card')[1].querySelector("img").style.backgroundImage =  `url(${currentImage})`;
        console.log(currentImage);
      } catch (err) {
        table.style.display = 'none';
        document.getElementById('error-message').classList.remove('hidden');
        throw err;
        return;
    }
}
function makeRows(rows) {
    let tableSize = table.rows.length;
    while(rows < tableSize) {
        table.deleteRow(tableSize-1);
    }
}

function combineQueryParams(params){
    return '?api_key='+ api_key + '&' + Object.keys(params).map( k => `${k}=${params[k]}`).join('&');
}
