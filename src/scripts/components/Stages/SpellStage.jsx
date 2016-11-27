import React from 'react';

import * as utils from '../../utils';
import navigatorStore from '../../store';
import { Stage as StageClass } from '../../classes';
import Stage from '../Stage';

export default class SpellsStage extends React.Component {

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
        const {getStage, getClasses, getStageText, getCurrentStageHelp} = utils;
        return (
            <Stage className="stage--spells">
                <div className="stage--column">

                    <div className="column--section column--section__top menu--box">
                        <div className="section--top-content">
                            <span className="help">{getCurrentStageHelp()}</span>
                        </div>
                    </div>

                    <div className="column--section column--section__middle menu--box">
                        <div className="section section__image">
                            <img className="section--image" src="/images/profile.png"/>
                        </div>

                        <div className="section section__stats">
                            <div className="section--row section--row__one">
                                <div className="row--half__left text__highlighted">LV</div>
                                <div className="row--half__right">26</div>
                            </div>
                            <div className="section--row section--row__two">
                                <div className="row--half__left text__highlighted">HP</div>
                                <div className="row--half__right">260/ 260</div>
                            </div>
                            <div className="section--row section--row__three">
                                <div className="row--half__left text__highlighted">MP</div>
                                <div className="row--half__right">140/ 140</div>
                            </div>
                        </div>

                        <div className="section section__job">
                            <div className="section--row">
                                <i className="icon icon--job"/>Web Developer
                            </div>
                        </div>
                    </div>

                    <div className="column--section column--section__bottom menu--box">

                        <div className="section--column section--column__spells">
                            <div className={'spell text__selectable '+getClasses('git')}>
                                <i className={"icon icon--spell icon--spell__" + getStage('git').element}/>
                                {getStageText('git')}
                            </div>
                            <div className={'spell text__selectable '+getClasses('gulp')}>
                                <i className={"icon icon--spell icon--spell__" + getStage('gulp').element}/>
                                {getStageText('gulp')}
                            </div>
                            <div className={'spell text__selectable '+getClasses('webpack')}>
                                <i className={"icon icon--spell icon--spell__" + getStage('webpack').element}/>
                                {getStageText('webpack')}
                            </div>
                            <div className={'spell text__selectable '+getClasses('sass')}>
                                <i className={"icon icon--spell icon--spell__" + getStage('sass').element}/>
                                {getStageText('sass')}
                            </div>
                            <div className={'spell text__selectable '+getClasses('bootstrap')}>
                                <i className={"icon icon--spell icon--spell__" + getStage('bootstrap').element}/>
                                {getStageText('bootstrap')}
                            </div>
                            <div className={'spell text__selectable '+getClasses('php')}>
                                <i className={"icon icon--spell icon--spell__" + getStage('php').element}/>
                                {getStageText('php')}
                            </div>
                            <div className={'spell text__selectable '+getClasses('java')}>
                                <i className={"icon icon--spell icon--spell__" + getStage('java').element}/>
                                {getStageText('java')}
                            </div>
                            <div className={'spell text__selectable '+getClasses('google')}>
                                <i className={"icon icon--spell icon--spell__" + getStage('google').element}/>
                                {getStageText('google')}
                            </div>
                            <div className={'spell text__selectable '+getClasses('photoshop')}>
                                <i className={"icon icon--spell icon--spell__" + getStage('photoshop').element}/>
                                {getStageText('photoshop')}
                            </div>
                        </div>

                        <div className="section--column section--column__passives">
                            <div>
                                <span className={'text__selectable '+getClasses('webdev')}>{getStageText('webdev')}</span>
                            </div>
                            <div>
                                <span className={'text__selectable '+getClasses('pro')}>{getStageText('pro')}</span>
                            </div>
                            <div>
                                <span className={'text__selectable '+getClasses('passion')}>{getStageText('passion')}</span>
                            </div>
                            <div>
                                <span className={'text__selectable '+getClasses('problemRes')}>{getStageText('problemRes')}</span>
                            </div>
                            <div>
                                <span className={'text__selectable '+getClasses('organized')}>{getStageText('organized')}</span>
                            </div>
                            <div>
                                <span className={'text__selectable '+getClasses('oldGames')}>{getStageText('oldGames')}</span>
                            </div>
                        </div>

                    </div>

                </div>
            </Stage>
        );
    }
}
