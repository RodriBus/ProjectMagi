import React from 'react';

import {MainStage, EquipStage, SpellStage, SchemataStage, SaveStage} from './Stages';

import navigatorStore from '../store';
import EventHandler from './EventHandler';

export default class Menu extends React.Component {
    constructor () {
        super();
        this.state = {
            currentStageId: navigatorStore.currentPath
        };
    }

    componentWillMount () {
        navigatorStore.on('navigate', this.onNavigate.bind(this));
        // navigatorStore.on('cursor', this.onCursorMove.bind(this));
    }

    onNavigate () {
        const currentStageId = navigatorStore.getLastStage().id;
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
                <EventHandler/>
                { this.getStage(this.state.currentStageId) }
            </div>
        );
    }
}
