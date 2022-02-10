import * as funs from './dataFuns.js';

const elem = document.getElementById('video-bg');
const search = document.getElementById('search');
const topUrl = 'https://api.themoviedb.org/3/movie/top_rated/';
const queryUrl = 'https://api.themoviedb.org/3/search/movie';


elem.playbackRate = 0.5;
funs.getData(topUrl);


search.onkeydown = function(e){
    if (!e) e = window.event;
    var keyCode = e.code || e.key;
    if (keyCode == 'Enter' || keyCode == 'NumpadEnter'){
        search.value ? funs.getData(queryUrl, {'query':search.value}) : funs.getData(topUrl);
        return;
    }
  }