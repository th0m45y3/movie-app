const api_key = '219b318ed4c1f1965c4a13ec08a94f4c';
const lang = 'en-US';
const topUrl = 'https://api.themoviedb.org/3/movie/top_rated/';
const posterUrl = 'https://image.tmdb.org/t/p/original';
const table = document.getElementById('big-table');

export async function getData(url, params={'page':1}) {
    showLoading();
    try {
        const res = await fetch(url + combineQueryParams(params));
        const data = await res.json();

        if (!params.page) params.page = 1;
        setPages( url, params, data.total_pages, data.total_results);
        displayResults(data.results, data.total_pages);

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

function setPages(url, params, pages, total) {
    document.getElementById('first-info').innerHTML = url === topUrl ? 'TOP RATED MOVIES' : `${total} RESULTS`;
    const currentPage = Number(params.page);
    const host = document.getElementById('page-host');
    host.dataset.url = url;
    host.dataset.params = params.query;

    table.querySelectorAll('#page-host .page').forEach( function(item, index) {
        
    if(pages < 10) {
        item.innerHTML = index + 1;
        document.getElementById(`duplicate-${index}`).innerHTML = index + 1;
        if(index + 1 > pages) {
            item.classList.add('hidden');
            document.getElementById(`duplicate-${index}`).classList.add('hidden');
        }

    } else {
        if(index === 0) {
            if(currentPage === 1) {
                item.innerHTML = pages;
                document.getElementById(`duplicate-${index}`).innerHTML = pages;
            } else {
                item.innerHTML = currentPage - 1;
                document.getElementById(`duplicate-${index}`).innerHTML =  currentPage - 1;
                } 
        } else {
            var forward = currentPage + index;
            if (forward > pages) { 
                forward = forward - pages;
            }
            item.innerHTML = forward;
            document.getElementById(`duplicate-${index}`).innerHTML = forward;
            }
        table.querySelectorAll('.page').forEach(el => el.classList.remove('hidden'));
    }
    });
}

function displayResults(data, total_pages) {
    reset();
    for(var res in data) {
        var currentItem = document.getElementById(`card-${res}`);
        currentItem.querySelector('.title').innerHTML = data[res].title;
        currentItem.querySelector('.overview').innerHTML = data[res].overview;
        currentItem.querySelector('.release-date').innerHTML = data[res].release_date;
        currentItem.querySelector('.popularity').innerHTML = data[res].popularity;
        currentItem.querySelector('.vote-average').innerHTML = data[res].vote_average;
        currentItem.style.display = 'inline-grid';
    }
    showTable();
    if (total_pages < 2) hidePages;
    if (data.length < 20) hideRows(data.length);
    table.querySelectorAll('.poster-image').forEach(function(card, index ){
        if (index <= res) {
            const img = new Image();
            img.src = data[index].poster_path ? String(posterUrl + data[index].poster_path) : './assets/img/noImage.png';
            img.onload = () => card.style.backgroundImage = "url(\'" + img.src + "\')";
            return card;
        }
    });
}


function hideRows(rows) {
    const items = table.querySelectorAll('.card.full');
    for (let i = 0; i < 20 - rows; i++) {
        items[19 - i].style.display = 'none';
    }
}

function hidePages() {
    table.querySelectorAll('.pages').forEach( x => x.classList.add('hidden'));
}

function combineQueryParams(params){
    return '?api_key='+ api_key + '&' + Object.keys(params).map( k => `${k}=${params[k]}`).join('&');
}

function reset() {
    table.querySelectorAll('.poster-image').forEach( card => card.style.backgroundImage = 'url(./assets/video/load.gif)')
    table.querySelectorAll('.pages').forEach( x => x.classList.remove('hidden'));
}
