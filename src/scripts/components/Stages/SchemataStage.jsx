import React from 'react';

import navigatorStore from '../../store';
import { Stage as StageClass } from '../../classes';

export default class SchemataStage extends React.Component {

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

    getChilds (id = this.state.currentStageSelected.id) {
        const stage = StageClass.getStage(id);
        const items = stage.childs.map((chld) => (<li key={chld.id} id={chld.id} className={' ' + this.getClasses(chld.id)}>{this.getText(chld.id)}</li>))
        return (<ul style={{ display: 'inline-block', marginLeft: '40px' }}>
          {items}
        </ul>);
    }

    getActiveClass (id) {
        return id === this.state.currentStageSelected.id ? 'active' : '';
    }

    getDisabledClass (id) {
        const stage = StageClass.getStage(id);
        return stage.available ? '' : 'disabled';
    }

    getForcedActive (id) {
        return this.props.forceActive === id ? 'active' : '';
    }

    getClasses (id) {
        return [
            this.getActiveClass(id),
            this.getDisabledClass(id),
            this.getForcedActive(id)
        ].join(' ');
    }

    render () {
        return (
            <div className="stage">
              <ul style={{ display: 'inline-block' }}>
                <li className={' ' + this.getClasses('thisWeb')}>{this.getText('thisWeb')}</li>
                <li className={' ' + this.getClasses('canapi')}>{this.getText('canapi')}</li>
                <li className={' ' + this.getClasses('pintamonas')}>{this.getText('pintamonas')}</li>
                <li className={' ' + this.getClasses('itgf')}>{this.getText('itgf')}</li>
                <li className={' ' + this.getClasses('ecuestria')}>{this.getText('ecuestria')}</li>
                <li className={' ' + this.getClasses('christmas')}>{this.getText('christmas')}</li>
              </ul>
              {this.getChilds(this.props.forceActive)}
              {this.getHelp()}
            </div>
        );
    }
}
