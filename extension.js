// SPDX-License-Identifier: GPL-2.0-or-later
// SPDX-FileCopyrightText: 2026 AlessandroTelesca

import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

// AppIndicator registers Spotify as `appindicator-<busName>@/org/ayatana/NotificationItem/spotify_client`.
const isSpotify = role => role.startsWith('appindicator-') && role.endsWith('/spotify_client');

export default class HideSpotifyTrayExtension extends Extension {
    enable() {
        // Panel._addToPanelBox calls container.show() on every (re)insertion,
        // so re-hide whenever any panel box gains a child.
        this._boxes = [Main.panel._leftBox, Main.panel._centerBox, Main.panel._rightBox];
        this._handlers = this._boxes.map(box => box.connect('child-added', () => this._setHidden(true)));
        this._setHidden(true);
    }

    disable() {
        this._boxes.forEach((box, i) => box.disconnect(this._handlers[i]));
        this._boxes = null;
        this._handlers = null;
        this._setHidden(false);
    }

    _setHidden(hidden) {
        for (const [role, indicator] of Object.entries(Main.panel.statusArea)) {
            if (indicator && isSpotify(role))
                indicator.container.visible = !hidden;
        }
    }
}
