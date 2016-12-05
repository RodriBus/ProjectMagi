import React from 'react';

import navigatorStore from '../store';
import * as actions from '../actions';
import * as utils from '../utils';

export default class EventHandler extends React.Component {
    constructor () {
        super();
        const audio = this.audio = new Audio();
        audio.src = "http://soundfxcenter.com/video-games/final-fantasy-vi/8d82b5_Final_Fantasy_VI_Pointer_Finger_Sound_Effect.mp3";
        audio.volume = 0.02;
        audio.onload = () => {
            console.log('playable');
        };

        this.allowNavigate = true;
    }

    componentWillMount () {
        navigatorStore.on('navigate', this.onCursorMove.bind(this));
        navigatorStore.on('cursor', this.onCursorMove.bind(this));

        document.addEventListener('keydown', this.onKeydown.bind(this));
    }

    componentDidMount () {
      actions.startCounter();
      this.checkDevice();
    }

    hideInstructions () {
        if (navigatorStore.showInstructions) {
            actions.hideInstructions();
        } else {
            actions.next();
        }
        utils.playMenuSound();
    }

    onKeydown (e) {
        if (this.allowNavigate) {
            switch (e.which) {
                case 87: // W
                case 38: // up
                    actions.up();
                    break;

                case 83: // S
                case 40: // down
                    actions.down();
                    break;

                case 13: // enter
                case 68: // D
                case 39: // right
                    this.hideInstructions();
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
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    }

    onCursorMove () {
        utils.playMenuSound();
    }



    checkDevice () {
        //check if device
        if (utils.isDevice()) {
            //if device handle resize event
            this.onResize();
            window.addEventListener('resize', this.onResize.bind(this));
        }
    }

    onResize () {
        if (utils.isLandscape()) {
            this.allowNavigate = true;
            actions.hideDisclaimer();
        } else {
            this.allowNavigate = false;
            actions.showDisclaimer();
        }
    }

    render () {
        return null;
    }
}
