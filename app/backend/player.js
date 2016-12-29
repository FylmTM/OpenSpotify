// @flow
import Speaker from 'speaker';
import libspotify from 'libspotify';

export default class Player {
  session: libspotify.Session;
  player: libspotify.Player;
  speaker: Speaker;
  playing: boolean;

  constructor(session: libspotify.Session) {
    this.session = session;
    this.player = session.getPlayer();
    this.speaker = null;
    this.playing = false;
  }

  play(spotifyUri: string, offsetInMs: number) {
    console.log('Player - play');
    // Check if we are playing any song right now.
    if (this.playing) {
      console.log('Player is currently playing, Stopping....');
      this.stop();
    }

    // Execution is delayed, to not overlap with stop process
    setTimeout(() => {
      const track = libspotify.Track.getFromUrl(spotifyUri);
      track.on('ready', () => {
        this.playing = true;

        this.createSpeaker();
        this.player.load(track);
        this.player.seek(offsetInMs);
        this.player
          .pipe(this.speaker)
          .on('error', (e) => {
            // Usually it's okay. Sometimes we can hit a situation when there is
            // data writing into a stream and we are closing it at the same time.
            console.error(e);
          });
        this.player.play();
      });
    }, 50);
  }

  stop() {
    console.log('Player - stop');
    if (!this.playing) {
      console.log('Player is currently not playing, do not do anything on stop.');
      return;
    }

    // Stop player data fetch and detach it from speaker
    this.player.stop(); // stop fetching by spotify
    this.player.pause(); // pause stream inflow
    this.player.unpipe(); // break pipe from speaker
    this.player.read(); // drain everything that we have
    this.player.resume(); // continue with stream

    // Immediately stop sound.
    try {
      this.speaker.close();
    } catch (e) {
      console.error('Error during speaker close', e);
    }

    // Put speaker into null
    this.speaker = null;

    // Set state
    this.playing = false;
  }

  createSpeaker() {
    this.speaker = new Speaker();
  }
}
