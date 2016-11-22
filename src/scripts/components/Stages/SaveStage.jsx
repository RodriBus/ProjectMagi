import React from 'react';

import { navigatorStore } from '../../store';
import { Stage as StageClass } from '../../store';

export default class SaveStage extends React.Component {

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
              <ul style={{ display: 'inline-block' }}>
                <li className={' ' + this.getClasses('email')}>{this.getText('email')}</li>
                <li className={' ' + this.getClasses('linkedin')}>{this.getText('linkedin')}</li>
                <li className={' ' + this.getClasses('github')}>{this.getText('github')}</li>
              </ul>
              {this.getHelp()}
            </div>
        );
    }
}
