# Development guide

## Libspotify

Audio playback is based on `libspotify`.
Libspotify is outdated and not supported anymore.

However, there are not alternatives at this point.
As soon as Spotify will provide new API, we will migrate away from libspotify.

Meanwhile it is required to have `libspotify` installed in your system in order to develop OpenSpotify.

* Windows: Extract archive to `C:\build\libspotify`
* Linux: `sudo make install prefix=/usr/local`
* OS X: {TODO}

Download links:
- https://developer.spotify.com/download/libspotify/libspotify-12.1.64-iOS-universal.zip
- https://developer.spotify.com/download/libspotify/libspotify-12.1.51-Android-arm-release.tar.gz
- https://developer.spotify.com/download/libspotify/libspotify-12.1.51-win32-release.zip
- https://developer.spotify.com/download/libspotify/libspotify-12.1.51-Darwin-universal.zip
- https://developer.spotify.com/download/libspotify/libspotify-12.1.51-Linux-i686-release.tar.gz
- https://developer.spotify.com/download/libspotify/libspotify-12.1.51-Linux-x86_64-release.tar.gz
- https://developer.spotify.com/download/libspotify/libspotify-12.1.51-Linux-armv5-release.tar.gz
- https://developer.spotify.com/download/libspotify/libspotify-12.1.51-Linux-armv6-release.tar.gz
- https://developer.spotify.com/download/libspotify/libspotify-12.1.51-Linux-armv7-release.tar.gz
- https://developer.spotify.com/download/libspotify/libspotify-12.1.103-Linux-armv6-bcm2708hardfp-release.tar.gz
