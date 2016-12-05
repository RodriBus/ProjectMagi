import React from 'react';

import { isDevice, playMenuSound } from '../utils';
import { hideInstructions } from '../actions';

export default class Instructions extends React.Component {

    toggleFullScreen () {
        hideInstructions();
        if (!document.fullscreenElement && isDevice()) {
            document.documentElement.webkitRequestFullScreen();
        }
        playMenuSound();
    }

    getDeviceMessage () {
        if (isDevice()) {
            return (
                <p className="paragraph">
                    It works better on desktop browsers...
                </p>
            )
        }
    }

    render () {
        return (
            <div className="message menu--box">
                <h1 className="title tex text__highlighted">
                    Instructions
                </h1>
                <p className="paragraph">
                    Use <em>↑ ↓</em> to select and <em>← →</em> to navigate.
                    It works also with <em>WASD</em>, <em>enter</em>, <em>return</em> and <em>esc</em>.
                </p>
                { this.getDeviceMessage() }
                <p className="paragraph">
                    It makes sound so don't jumpscare.
                </p>
                <p className="paragraph paragraph__right">
                    Enjoy!
                </p>
                <button className="button" onClick={ this.toggleFullScreen.bind(this) }>
                    - Press Start -
                </button>
            </div>
        );
    }
}
