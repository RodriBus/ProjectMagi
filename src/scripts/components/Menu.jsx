import React from 'react';

// import Stage from './Stage';
import {MainStage, EquipStage, SpellStage, SchemataStage, SaveStage} from './Stages';

import navigatorStore from '../store';
import * as actions from '../actions';

export default class Menu extends React.Component {
    constructor () {
        super();
        this.state = {
            currentStageId: navigatorStore.currentPath
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
        //a.play();
    }

    onCursorMove () {
        this.playMenuSound();
    }

    onNavigate () {
        const currentStageId = navigatorStore.getLastStage().id;
        this.playMenuSound();
        this.setState({ currentStageId });
    }

    getStage (id) {
        const main = (<MainStage id="main" key="main" />);
        const spells = (<SpellStage id="spells" key="spells" />);
        const equip = (<EquipStage id="equip" key="equip" />);
        const schemata = (<SchemataStage id="schemata" key="schemata" />);
        const save = (<SaveStage id="save" key="save" />);

        //Render same stage using the key but changing forceActive
        const thisWeb = (<SchemataStage forceActive="thisWeb" id="thisWeb" key="schemata" />);
        const canapi = (<SchemataStage forceActive="canapi" id="canapi" key="schemata" />);
        const pintamonas = (<SchemataStage forceActive="pintamonas" id="pintamonas" key="schemata" />);
        const itgf = (<SchemataStage forceActive="itgf" id="itgf" key="schemata" />);
        const ecuestria = (<SchemataStage forceActive="ecuestria" id="ecuestria" key="schemata" />);
        const christmas = (<SchemataStage forceActive="christmas" id="christmas" key="schemata" />);

        const items = {
            main,
            spells,
            equip,
            schemata,
            thisWeb,
            canapi,
            pintamonas,
            itgf,
            ecuestria,
            christmas,
            save
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
