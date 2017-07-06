import videos from './videos.js';

let gridElement;

export default class Players {
  static setGridElement(e){
    return gridElement = e;
  }
  static loadVideos(){
    videos.forEach(videoId => {
      let videoElement = document.createElement('div');
      videoElement.dataset.videoId = videoId;
      gridElement.insertBefore(videoElement, gridElement.firstElementChild);
    });
  }

  static start() {
    let videos = document.querySelectorAll("[data-video-id]");

    videos.forEach(videoWrapperElement => {
      let videoId = videoWrapperElement.dataset.videoId;
      let playerElement = document.createElement("div");

      videoWrapperElement.appendChild(playerElement);

      videoWrapperElement.player = new window.YT.Player(playerElement, {
        videoId: videoId,
        events: {
          'onReady': e => {
            if(grid.firstElementChild !== videoWrapperElement) {
              e.target.mute()
            }
          }
        },
        playerVars:{
          autoplay:1,
          controls:0,
          disablekb:1,
        },
      })
    });

    let nextButton = document.querySelector('#nextvideo');

    nextButton.addEventListener('click', () => {
      let lastVideo = grid.lastElementChild.previousElementSibling;
      let firstVideo = grid.firstElementChild;
      firstVideo.player.mute();
      grid.insertBefore(lastVideo,firstVideo);
      lastVideo.player.unMute();
      //saveVideos();
    });
  }
}