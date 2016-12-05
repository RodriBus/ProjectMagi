import React from 'react';

import navigatorStore from '../store';
import * as actions from '../actions';

export default class EventHandler extends React.Component {
    constructor () {
        super();
        const audio = this.audio = new Audio();
        audio.src = "http://soundfxcenter.com/video-games/final-fantasy-vi/8d82b5_Final_Fantasy_VI_Pointer_Finger_Sound_Effect.mp3";
        audio.volume = 0.02;
        audio.onload = () => {
            console.log('playable');
        };
    }

    componentWillMount () {
        navigatorStore.on('navigate', this.onCursorMove.bind(this));
        navigatorStore.on('cursor', this.onCursorMove.bind(this));

        document.addEventListener('keydown', this.onKeydown.bind(this));
    }

    componentDidMount () {
      actions.startCounter();
    }

    onKeydown (e) {
        switch (e.which) {
            case 87: // W
            case 38: // up
                actions.up();
                break;

            case 83: // S
            case 40: // down
                actions.down();
                break;

            case 68: // D
            case 39: // right
            case 13: // enter
                actions.next();
                break;

            case 65: // A
            case 37: // left
            case 27: // esc
            case 8: // return
                actions.prev();
                break;

            default:
                return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    }

    playMenuSound () {
        const a = this.audio.cloneNode();
        a.volume = 0.25;
        a.play();
    }

    onCursorMove () {
        this.playMenuSound();
    }

    render () {
        return null;
    }
}
