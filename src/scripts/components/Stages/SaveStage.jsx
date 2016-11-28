import React from 'react';

import * as utils from '../../utils';
import navigatorStore from '../../store';
import { Stage as StageClass } from '../../classes';
import Stage from '../Stage';

export default class SaveStage extends React.Component {

    constructor () {
        super();
        this.onCursorMove = this.onCursorMove.bind(this);
    }

    componentWillMount () {
        navigatorStore.on('cursor', this.onCursorMove);
    }

    componentWillUnmount () {
        navigatorStore.removeListener('cursor', this.onCursorMove);
    }

    onCursorMove () {
        this.forceUpdate();
    }

    render () {
        const {getStage, getClasses, getStageText} = utils;
        return (
            <Stage className="stage--save menu--box">
                <div className="section--text">
                    If you want to save me for your company contact me at
                    <a href={getStage('email').url} className={'text__link text__selectable ' + getClasses('email')}>
                        {getStageText('email')}
                    </a>
                    &nbsp;or via linkedin on
                    <a href={getStage('linkedin').url} className={'text__link text__selectable ' + getClasses('linkedin')}>
                        {getStageText('linkedin')}
                    </a>.
                </div>

                <div className="section--text">
                    You can check my works on Github at
                    <a href={getStage('github').url} className={'text__link text__selectable ' + getClasses('github')}>
                        {getStageText('github')}
                    </a>.
                </div>

                <div className="section--bottom">
                    Made with
                    <i className="icon icon--heart"/>
                    {/*<span class="text__red">❤</span>*/}
                    by Diego
                </div>
            </Stage>
        );
    }
}
