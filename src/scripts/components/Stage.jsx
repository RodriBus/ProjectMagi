import React from 'react';

import { navigatorStore } from '../store';
import { Stage as StageClass  } from '../store';

export default class Stage extends React.Component {

    constructor (props) {
        super(props);
        const state = this.state = {};
        // state.menuItems = ['spells', 'equip', 'achievements', 'save'];
        console.log('STAGE', props.id, '\nPROPS:', this.props.menuItems);
        if (this.props.menuItems) {
            state.menuItems = this.props.menuItems;
            state.currentSelected = state.menuItems[0];
        }
        // state.currentSelected = state.menuItems[0];

        this.onCursorMove = this.onCursorMove.bind(this);
    }

    componentWillMount () {
        navigatorStore.on('cursor', this.onCursorMove);
        navigatorStore.on('cursor', this.onCursorMove);
    }

    componentWillUnmount () {
        navigatorStore.removeListener('cursor', this.onCursorMove);
        navigatorStore.removeListener('cursor', this.onCursorMove);
    }

    onCursorMove () {
        const currentSelected = navigatorStore.currentCursor;
        console.log(currentSelected);
        this.setState({ currentSelected });
    }

    getOptions () {
        console.log();
        const arr = [];
        for (const opt of this.state.menuItems) {
            const stage = StageClass.getStage(opt);
            if (stage) {
                const li = (
                    <li key={stage.id}>
                        {stage.id === this.state.currentSelected.id ? '>' : ''}{stage.displayName}
                    </li>
                );
                arr.push(li);
            }
        }
        return <ul>{arr}</ul>;
    }

    getHelp () {
        const stage = StageClass.getStage(this.state.currentSelected);
        return (<div style={{
            paddingTop: '20px'
        }}>{stage.help}</div>);
    }

    render () {
        return (
            <div className="stage">
                {this.getOptions()}
                {this.getHelp()}
            </div>
        );
    }
}
