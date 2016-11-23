import React from 'react';

import navigatorStore from '../../store';
import { Stage as StageClass } from '../../classes';

export default class MainStage extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            currentStageSelected: navigatorStore.currentCursor
        };
        this.onCursorMove = this.onCursorMove.bind(this);
    }

    componentWillMount () {
        navigatorStore.on('cursor', this.onCursorMove);
    }

    componentWillUnmount () {
        navigatorStore.removeListener('cursor', this.onCursorMove);
    }

    onCursorMove () {
        const currentStageSelected = navigatorStore.currentCursor;
        console.log(currentStageSelected);
        this.setState({ currentStageSelected });
    }

    getText (id) {
        const stage = StageClass.getStage(id);
        return stage.displayName;
    }

    getHelp () {
        const stage = this.state.currentStageSelected;
        return (<div style={{
            paddingTop: '20px'
        }}>{stage.help}</div>);
    }

    getActiveClass (id) {
        return id === this.state.currentStageSelected.id ? 'active' : '';
    }

    getDisabledClass (id) {
        const stage = StageClass.getStage(id);
        return stage.available ? '' : 'disabled';
    }

    getClasses (id) {
        return [
            this.getActiveClass(id),
            this.getDisabledClass(id)
        ].join(' ');
    }

    render () {
        return (
            <div className="stage">
                <div className={'menuElement ' + this.getClasses('items')}>{this.getText('items')}</div>
                <div className={'menuElement ' + this.getClasses('abilities')}>{this.getText('abilities')}</div>
                <div className={'menuElement ' + this.getClasses('equip')}>{this.getText('equip')}</div>
                <div className={'menuElement ' + this.getClasses('spells')}>{this.getText('spells')}</div>
                <div className={'menuElement ' + this.getClasses('status')}>{this.getText('status')}</div>
                <div className={'menuElement ' + this.getClasses('formation')}>{this.getText('formation')}</div>
                <div className={'menuElement ' + this.getClasses('config')}>{this.getText('config')}</div>
                <div className={'menuElement ' + this.getClasses('datalog')}>{this.getText('datalog')}</div>
                <div className={'menuElement ' + this.getClasses('schemata')}>{this.getText('schemata')}</div>
                <div className={'menuElement ' + this.getClasses('map')}>{this.getText('map')}</div>
                <div className={'menuElement ' + this.getClasses('help')}>{this.getText('help')}</div>
                <div className={'menuElement ' + this.getClasses('save')}>{this.getText('save')}</div>
                {/*}{this.getHelp()}*/}
            </div>
        );
    }
}
