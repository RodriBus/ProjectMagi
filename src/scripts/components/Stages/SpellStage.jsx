import React from 'react';

import navigatorStore from '../../store';
import { Stage as StageClass } from '../../classes';

export default class SpellStage extends React.Component {

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
                <li className={' ' + this.getClasses('git')}>{this.getText('git')}</li>
                <li className={' ' + this.getClasses('gulp')}>{this.getText('gulp')}</li>
                <li className={' ' + this.getClasses('webpack')}>{this.getText('webpack')}</li>
                <li className={' ' + this.getClasses('sass')}>{this.getText('sass')}</li>
                <li className={' ' + this.getClasses('bootstrap')}>{this.getText('bootstrap')}</li>
                <li className={' ' + this.getClasses('php')}>{this.getText('php')}</li>
                <li className={' ' + this.getClasses('java')}>{this.getText('java')}</li>
                <li className={' ' + this.getClasses('google')}>{this.getText('google')}</li>
                <li className={' ' + this.getClasses('photoshop')}>{this.getText('photoshop')}</li>
              </ul>

              <ul style={{ display: 'inline-block' }}>
                <li className={' ' + this.getClasses('webdev')}>{this.getText('webdev')}</li>
                <li className={' ' + this.getClasses('pro')}>{this.getText('pro')}</li>
                <li className={' ' + this.getClasses('passion')}>{this.getText('passion')}</li>
                <li className={' ' + this.getClasses('problemRes')}>{this.getText('problemRes')}</li>
                <li className={' ' + this.getClasses('organized')}>{this.getText('organized')}</li>
                <li className={' ' + this.getClasses('oldGames')}>{this.getText('oldGames')}</li>
                </ul>
                 {this.getHelp()}
            </div>
        );
    }
}
