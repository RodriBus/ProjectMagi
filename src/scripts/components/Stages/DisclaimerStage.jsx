import React from 'react';

import { getStage, getClasses } from '../../utils';
import navigatorStore from '../../store';
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
        const email = getStage('email');
        const linkedin = getStage('linkedin');
        const github = getStage('github');
        return (
            <Stage className="stage--save menu--box">
                <div className="section--text">
                    If you want to save me for your company contact me at
                    <a href={ email.url } className={ 'text__link text__selectable ' + getClasses(email.id) }>
                        { email.displayName }
                    </a>
                    &nbsp;or via linkedin on
                    <a href={ linkedin.url } className={ 'text__link text__selectable ' + getClasses(linkedin.id) }>
                        { linkedin.displayName }
                    </a>.
                </div>

                <div className="section--text">
                    You can check my works on Github at
                    <a href={ github.url } className={ 'text__link text__selectable ' + getClasses(github.id) }>
                        { github.displayName }
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
