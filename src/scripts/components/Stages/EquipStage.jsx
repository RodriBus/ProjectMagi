import React from 'react';

import { navigatorStore } from '../../store';
import { Stage as StageClass } from '../../store';

export default class EquipStage extends React.Component {

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

    getStage (id) {
        const stage = StageClass.getStage(id);
        return stage;
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
                <div>
                    <ul style={{ display: 'inline-block', margin: '10px 5px' }}>
                        <li className={' '+this.getClasses('rhand')}>{this.getText('rhand')}</li>
                        <li className={' '+this.getClasses('lhand')}>{this.getText('lhand')}</li>
                    </ul>
                    <ul style={{display: 'inline-block', margin: '10px 5px'}}>
                        <li className={' '+this.getClasses('head')}>{this.getText('head')}</li>
                        <li className={' '+this.getClasses('body')}>{this.getText('body')}</li>
                    </ul>
                </div>
                <div style={{display: 'table'}}>
                    <div style={{display: 'inline-block'}}>
                    <div style={{display: 'table-col', margin: '10px 15px 0 5px'}}>
                        <div style={{display:'table-row', color: this.getStage('js').color}}>
                            <div style={{display: 'table-cell', minWidth: '150px'}}><i  className={' '+this.getClasses('js')}/>{this.getText('js')}</div>
                            <div style={{display: 'table-cell'}}>{this.getStage('js').quantity}</div>

                        </div>
                        <div style={{display:'table-row', color: this.getStage('es6').color}}>
                            <div style={{display: 'table-cell', minWidth: '150px'}}><i  className={' '+this.getClasses('es6')}/>{this.getText('es6')}</div>
                            <div style={{display: 'table-cell'}}>{this.getStage('es6').quantity}</div>

                        </div>
                        <div style={{display:'table-row', color: this.getStage('jquery').color}}>
                            <div style={{display: 'table-cell', minWidth: '150px'}}><i  className={' '+this.getClasses('jquery')}/>{this.getText('jquery')}</div>
                            <div style={{display: 'table-cell'}}>{this.getStage('jquery').quantity}</div>

                        </div>
                        <div style={{display:'table-row', color: this.getStage('angular').color}}>
                            <div style={{display: 'table-cell', minWidth: '150px'}}><i  className={' '+this.getClasses('angular')}/>{this.getText('angular')}</div>
                            <div style={{display: 'table-cell'}}>{this.getStage('angular').quantity}</div>

                        </div>
                        <div style={{display:'table-row', color: this.getStage('react').color}}>
                            <div style={{display: 'table-cell', minWidth: '150px'}}><i  className={' '+this.getClasses('react')}/>{this.getText('react')}</div>
                            <div style={{display: 'table-cell'}}>{this.getStage('react').quantity}</div>

                        </div>
                    </div>
                </div>
                <div style={{display: 'inline-block'}}>
                    <div style={{display: 'table-col', margin: '0px 15px 0 5px'}}>
                        <div style={{display:'table-row', color: this.getStage('node').color}}>
                            <div style={{display: 'table-cell', minWidth: '150px'}}><i className={' '+this.getClasses('node')}/>{this.getText('node')}</div>
                            <div style={{display: 'table-cell'}}>{this.getStage('node').quantity}</div>

                        </div>
                        <div style={{display:'table-row', color: this.getStage('css').color}}>
                            <div style={{display: 'table-cell', minWidth: '150px'}}><i className={' '+this.getClasses('css')}/>{this.getText('css')}</div>
                            <div style={{display: 'table-cell'}}>{this.getStage('css').quantity}</div>

                        </div>
                        <div style={{display:'table-row', color: this.getStage('csharp').color}}>
                            <div style={{display: 'table-cell', minWidth: '150px'}}><i className={' '+this.getClasses('csharp')}/>{this.getText('csharp')}</div>
                            <div style={{display: 'table-cell'}}>{this.getStage('csharp').quantity}</div>

                        </div>
                        <div style={{display:'table-row', color: this.getStage('tridion').color}}>
                            <div style={{display: 'table-cell', minWidth: '150px'}}><i className={' '+this.getClasses('tridion')}/>{this.getText('tridion')}</div>
                            <div style={{display: 'table-cell'}}>{this.getStage('tridion').quantity}</div>

                        </div>
                        <div style={{display:'table-row', color: this.getStage('sql').color}}>
                            <div style={{display: 'table-cell', minWidth: '150px'}}><i className={' '+this.getClasses('sql')}/>{this.getText('sql')}</div>
                            <div style={{display: 'table-cell'}}>{this.getStage('sql').quantity}</div>

                        </div>
                    </div>
                </div>
                </div>
                {this.getHelp()}
            </div>
        );
    }
}
