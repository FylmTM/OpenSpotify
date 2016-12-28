// @flow
import libspotify from "libspotify";
import Speaker from "speaker";

export default class Player {
  _session: libspotify.Session;
  _player: libspotify.Player;
  _speaker: Speaker;
  _playing: boolean;

  constructor(session: libspotify.Session) {
    this._session = session;
    this._player = session.getPlayer();
    this._speaker = null;
    this._playing = false;
  }

  play(spotifyUri: string, offsetInMs: number) {
    console.log("Player - play");
    // Check if we are playing any song right now.
    if (this._playing) {
      console.log("Player is currently playing, Stopping....");
      this.stop();
    }

    // Execution is delayed, to not overlap with stop process
    setTimeout(() => {
      const track = libspotify.Track.getFromUrl(spotifyUri);
      track.on('ready', () => {
        this._playing = true;

        this.createSpeaker();
        this._player.load(track);
        this._player.seek(offsetInMs);
        this._player
          .pipe(this._speaker)
          .on('error', (e) => {
            // Usually it's okay. Sometimes we can hit a situation when there is
            // data writing into a stream and we are closing it at the same time.
            console.error(e)
          });
        this._player.play();
      });
    }, 50);
  }

  stop() {
    console.log("Player - stop");
    if (!this._playing) {
      console.log("Player is currently not playing, do not do anything on stop.");
      return;
    }

    // Stop player data fetch and detach it from speaker
    this._player.stop(); // stop fetching by spotify
    this._player.pause(); // pause stream inflow
    this._player.unpipe(); // break pipe from speaker
    this._player.read(); // drain everything that we have
    this._player.resume(); // continue with stream

    // Immediately stop sound.
    try {
      this._speaker.close();
    } catch (e) {
      console.error("Error during speaker close", e)
    }

    // Put speaker into null
    this._speaker = null;

    // Set state
    this._playing = false;
  }

  createSpeaker() {
    this._speaker = new Speaker();
  }
}
