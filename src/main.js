import Players from './players.js';

Players.setGridElement(document.querySelector('#grid'));
Players.loadVideos();

window.onYouTubeIframeAPIReady = Players.start();

let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);

