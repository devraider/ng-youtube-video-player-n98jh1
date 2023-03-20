import { Component } from '@angular/core';
import { Ivideos } from './videos';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular';

  player: YT.Player;

  public videos: Ivideos[] = [
    { id: 'L-tNSip4EQM', player: null },
    { id: 'wvetj7Txj1g', player: null },
    { id: 'WcIcVapfqXw', player: null },
  ];

  savePlayer(e, video) {
    this.videos.find((obj) => obj.id == video.id).player = e;

    this.player = e;

    console.log(this.player.j.videoData.video_id);
  }
  onStateChange(event, video) {
    console.log('player state', event.data, video);
    if (event.data === 0) {
      let nextId = this.videos.findIndex((index) => index.id === video.id) + 1;
      console.log(nextId);
      if (nextId > this.videos.length - 1) {
        nextId = 0;
      }
      console.log(nextId);
      let nextVideo = this.videos[nextId];
      console.log(nextVideo);
      this.playYoutube(nextVideo.id);
    }
  }

  playYoutube(id) {
    let video = this.videos.find((obj) => obj.id == id);

    console.log(video.player);
    console.log(video.player.playerInfo.playerState);
    if (video.player.playerInfo.playerState === 1) {
      video.player.pauseVideo();
    } else if ([2, 3, 5].includes(video.player.playerInfo.playerState)) {
      video.player.playVideo();
    } else if (video.player.playerInfo.playerState === 0) {
      video.player.playVideo();
    }
  }
}
