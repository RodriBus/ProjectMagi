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
                    <span className="text-inline-container"><a href={ email.url } className={ 'text__link text__selectable ' + getClasses(email.id) }>
                        { email.displayName }
                    </a></span>
                    &nbsp;or via linkedin on
                    <span className="text-inline-container"><a href={ linkedin.url } className={ 'text__link text__selectable ' + getClasses(linkedin.id) }>
                        { linkedin.displayName }
                    </a></span>.
                </div>

                <div className="section--text">
                    You can check my works on Github <br/>at
                    <span className="text-inline-container"><a href={ github.url } className={ 'text__link text__selectable ' + getClasses(github.id) }>
                        { github.displayName }
                    </a></span>.
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
