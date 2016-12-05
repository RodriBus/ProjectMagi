import React from 'react';

import navigatorStore from '../store';
import * as actions from '../actions';
import * as utils from '../utils';

export default class EventHandler extends React.Component {
    constructor () {
        super();
        const audio = this.audio = new Audio();
        audio.src = "/pointer.mp3";
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
            utils.playMenuSound();
        } else {
            actions.next();
        }
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

    move (e) {
        const keycode = e.target.attributes['data-keycode'].value;
        console.log(keycode);
        this.onKeydown({
            which: parseInt(keycode),
            preventDefault: function () {}
        });
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
        if (!utils.isDevice()) {
            return null;
        }
        return (
            <div className="controls" style={ {display: (navigatorStore.showInstructions || !this.allowNavigate) ? 'none' : ''} }>
                <div className="controls--container">
                    <div className="controls--row controls--row__one">
                        <div className="control up" data-keycode={ 38 } onClick={ this.move.bind(this) }></div>
                    </div>
                    <div className="controls--row controls--row__two">
                        <div className="control left" data-keycode={ 37 } onClick={ this.move.bind(this) }></div>
                        <div className="control right" data-keycode={ 39 } onClick={ this.move.bind(this) }></div>
                    </div>
                    <div className="controls--row controls--row__one">
                        <div className="control down" data-keycode={ 40 } onClick={ this.move.bind(this) }></div>
                    </div>
                </div>
            </div>
        )
    }
}
