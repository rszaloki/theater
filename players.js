function onYouTubeIframeAPIReady() {
    "use strict"
    let grid = document.querySelector('#grid');
    let videos = document.querySelectorAll("[data-video-id]");
    let savedVideos = localStorage.getItem('videos');

    if(savedVideos) {
        let savedVideoIds = JSON.parse(savedVideos);
        videos.forEach((videoWrapperElement, index) => {
            videoWrapperElement.dataset.videoId = savedVideoIds[index];
        })
    }

    videos.forEach(videoWrapperElement => {
        let videoId = videoWrapperElement.dataset.videoId;
        let playerElement = document.createElement("div");

        videoWrapperElement.appendChild(playerElement);

        videoWrapperElement.player = new YT.Player(playerElement, {
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


    function saveVideos() {
        let videos = [];
        let l = grid.children.length;
        for(let i=0; i<l; i++) {
            let child = grid.children[i];
            if(child.dataset.videoId) {
                videos.push(child.dataset.videoId);
            }
        }
        localStorage.setItem('videos',JSON.stringify(videos));
    }
}

let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);
