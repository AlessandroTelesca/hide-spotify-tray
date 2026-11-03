# Hide Spotify Tray Icon

Hides Spotify's tray icon from the top bar. Useful when playback is controlled from a media-controller extension and the tray icon is just clutter. Needs [AppIndicator and KStatusNotifierItem Support](https://extensions.gnome.org/extension/615/appindicator-support/), which is what puts the icon there.

It recognises the icon by AppIndicator's indicator name (`appindicator-…/spotify_client`) and hides it again whenever the panel re-adds it. Disabling the extension shows it again.

Install:

```sh
gnome-extensions pack --force . && gnome-extensions install --force hide-spotify-tray@alessandrot.shell-extension.zip
```

then log out and in, and `gnome-extensions enable hide-spotify-tray@alessandrot`.

GNOME Shell 50.

License: GPL-2.0-or-later, see `LICENSE`.
