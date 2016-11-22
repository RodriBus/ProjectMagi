import React from 'react';

// import Stage from './Stage';
import MainStage from './Stages/MainStage';
import SpellStage from './Stages/SpellStage';
import EquipStage from './Stages/EquipStage';

import { navigatorStore } from '../store';
import * as actions from '../actions';

export default class Menu extends React.Component {
    constructor () {
        super();
        this.state = {
            currentStageId: 'main'
        };

        const audio = this.audio = new Audio();
        audio.src = "http://soundfxcenter.com/video-games/final-fantasy-vi/8d82b5_Final_Fantasy_VI_Pointer_Finger_Sound_Effect.mp3";
        audio.volume = 0.02;
        audio.onload = () => {
            console.log('playable');
        };
    }

    componentWillMount () {
        navigatorStore.on('navigate', this.onNavigate.bind(this));
        navigatorStore.on('cursor', this.onCursorMove.bind(this));

        document.addEventListener("keydown", this.onKeydown.bind(this));
    }

    onKeydown (e) {
        switch (e.which) {
            case 37: // left
                console.log('keydown:left');
                break;

            case 38: // up
                console.log('keydown:up');
                actions.up();
                // moveUp();
                break;

            case 39: // right
                console.log('keydown:right');
                break;

            case 40: // down
                console.log('keydown:down');
                actions.down();
                // moveDown();
                break;

            case 13: // enter
                console.log('keydown:enter');
                actions.next();
                break;

            case 8: // left
                console.log('keydown:return');
                actions.prev();
                break;

            default:
                return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    }

    playMenuSound () {
        const a = this.audio.cloneNode();
        //a.play();
    }

    onCursorMove () {
        this.playMenuSound();
    }

    onNavigate () {
        const currentStageId = navigatorStore.getLastStage().id;
        console.log(currentStageId);
        this.playMenuSound();
        this.setState({ currentStageId });
    }

    getStage (id) {
        console.log('Rendered STAGE: ', id);
        const items = {
            main: <MainStage id="main" key="main" />,
            spells: <SpellStage id="spells" key="spells" />,
            equip: <EquipStage id="equip" key="equip" />,
            // equip: <Stage id="equip" key="equip" menuItems={[]}/>,
            // schemata: <Stage id="schemata" key="schemata" menuItems={[]}/>,
            // save: <Stage id="save" key="save" menuItems={[]}/>
        };
        return items[id] || items.main;
    }

    // componentWillUnmount

    render () {
        return (
            <div className="menu">
                {this.getStage(this.state.currentStageId)}
            </div>
        );
    }
}
