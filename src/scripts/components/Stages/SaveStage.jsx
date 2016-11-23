import React from 'react';

import navigatorStore from '../../store';
import { Stage as StageClass } from '../../classes';

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
            <p>
                If you want to save me for your company contact me at <i className={this.getClasses('email')}/>{this.getText('email')} or via linkedin on <i className={this.getClasses('linkedin')}/>{this.getText('linkedin')}.
            </p>
            <br/>
            <p>
                You can check my works on Github at <i className={this.getClasses('github')}/>{this.getText('github')}.
            </p>
            <br/>
            <div>Made with <span class="heart">❤</span> by Diego</div>
            </div>
        );
    }
}
