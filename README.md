# OpenSpotify
[![Build status](https://ci.appveyor.com/api/projects/status/hhugqyes72kg06ne/branch/master?svg=true)](https://ci.appveyor.com/project/FylmTM/openspotify/branch/master)
[![Build Status](https://travis-ci.org/LiquidLlama/OpenSpotify.svg?branch=master)](https://travis-ci.org/LiquidLlama/OpenSpotify)

OpenSpotify is unofficial opinionated open-source Spotify client.  

Goals:
* Provide alternative for everyone who needs it
* Be simple (no social features, just music)
* External integrations (e.g. play recommendation via Last.fm)

# Status

At this point OpenSpotify is completely unusable.  
You will encounter: missing functionality, bugs and bad user experience and lot more.

Details:
- General
  - [ ] Cool logo
- Client
  - [ ] My songs
  - [ ] My playlists
  - [ ] Search
  - [ ] Add/remove songs
- Playback
  - [ ] Integration with Libspotify
  - [ ] Volume
  - [x] Start/Stop
  - [ ] Next/Previous
  - [ ] Shuffle
  - [ ] Repeat
- Integration
  - [ ] Last.fm recommendations

# Thanks

I would like to thanks [Neueda](https://neueda.com) (my employer) for possibility to work on this
project.  
Looking for some badass development expertise? Drop an email to david.claffey@neueda.com and David
will be right there with you.

Also I would like to mention some open-source projects that helped me A LOT to make OpenSpotify real:
* [node-speaker](https://github.com/TooTallNate/node-speaker) - Output PCM audio data to the speakers
* [node-libspotify](https://github.com/Floby/node-libspotify) - Node bindings for the libspotify C library
* [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate) - Electron application boilerplate based on React and Redux

# Contribution

At this point in time contribution process is not established at all.  
TODO:
- [ ] Cleanup code
- [ ] Rewrite several client parts completely
- [ ] Write tests
- [ ] Configure cross-platform CI
- [ ] Release packages that actually works

If you fell brave enough and wan't to contribute something right now, then checkout [Development](docs/development.md) doc page for some details.

# Feedback

Have any feedback, question or just want to chat about something?

* Email - dmitry@vrublevsky.me
* Twitter - [@FylmTM](https://twitter.com/FylmTM)

# Notes

## [Libspotify](https://developer.spotify.com/technologies/libspotify/)

Libspotify is considered outdated and should **not** be used for new development.
Unfortunately this is only way to get actual playback functionality on PC, so I was forced to use it.

OpenSpotify is using Libspotify **only** for playing songs. We will switch to new API as soon as Spotify will provide one.

# License

GPLv3 
