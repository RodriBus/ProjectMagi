import React from 'react';

import * as utils from '../../utils';
import navigatorStore from '../../store';
import { Stage as StageClass } from '../../classes';
import Stage from '../Stage';

export default class EquipStage extends React.Component {

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
      const {getClasses, getStageText, getStage, getCurrentStageHelp} = utils;
        return (
            <Stage className="stage--equip">
                <div className="stage--column">

                    <div className="column--section column--section__top menu--box">
                        <span className="text__selectable text__selected">Equip</span>
                        <span className="text__selectable text__disabled">Optimun</span>
                        <span className="text__selectable text__disabled">Remove</span>
                        <span className="text__selectable text__disabled">Empty</span>
                    </div>

                    <div className="column--section column--section__middle menu--box">

                        <div className="section--column">
                            <div className="column--half ">
                                <div className="column--half__left text__highlighted">R-Hand</div>
                                <div className="column--half__right ">
                                    <span className="text__selectable">{getStageText('rhand')}</span>
                                </div>
                            </div>
                            <div className="column--half">
                                <div className="column--half__left text__highlighted">L-Hand</div>
                                <div className="column--half__right ">
                                    <span className="text__selectable">{getStageText('lhand')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="section--column">
                            <div className="column--half">
                                <div className="column--half__left text__highlighted">Head</div>
                                <div className="column--half__right ">
                                    <span className="text__selectable">{getStageText('head')}</span>
                                </div>
                            </div>
                            <div className="column--half">
                                <div className="column--half__left text__highlighted">Body</div>
                                <div className="column--half__right ">
                                    <span className="text__selectable">{getStageText('body')}</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="column--section column--section__bottom menu--box">

                        <div className="column--half column--half__column">
                            <div className="stat">
                                <div className="stat--top">
                                    <div className="stat--name">{getStageText('js')}</div>
                                    <div className="stat--score">{getStage('js').quantity}</div>
                                </div>
                                <div className="stat--bar">
                                    <div className="stat--bar-fill" style={{animationDelay:'0s', backgroundColor:getStage('js').color, width: getStage('js').quantity+'%'}}></div>
                                </div>
                            </div>

                            <div className="stat">
                                <div className="stat--top">
                                    <div className="stat--name">{getStageText('es6')}</div>
                                    <div className="stat--score">{getStage('es6').quantity}</div>
                                </div>
                                <div className="stat--bar">
                                    <div className="stat--bar-fill" style={{animationDelay:'.1s', backgroundColor:getStage('es6').color, width: getStage('es6').quantity+'%'}}></div>
                                </div>
                            </div>

                            <div className="stat">
                                <div className="stat--top">
                                    <div className="stat--name">{getStageText('jquery')}</div>
                                    <div className="stat--score">{getStage('jquery').quantity}</div>
                                </div>
                                <div className="stat--bar">
                                    <div className="stat--bar-fill" style={{animationDelay:'.2s', backgroundColor:getStage('jquery').color, width: getStage('jquery').quantity+'%'}}></div>
                                </div>
                            </div>

                            <div className="stat">
                                <div className="stat--top">
                                    <div className="stat--name">{getStageText('angular')}</div>
                                    <div className="stat--score">{getStage('angular').quantity}</div>
                                </div>
                                <div className="stat--bar">
                                    <div className="stat--bar-fill" style={{animationDelay:'.3s', backgroundColor:getStage('angular').color, width: getStage('angular').quantity+'%'}}></div>
                                </div>
                            </div>

                            <div className="stat">
                                <div className="stat--top">
                                    <div className="stat--name">{getStageText('react')}</div>
                                    <div className="stat--score">{getStage('react').quantity}</div>
                                </div>
                                <div className="stat--bar">
                                    <div className="stat--bar-fill" style={{animationDelay:'.4s', backgroundColor:getStage('react').color, width: getStage('react').quantity+'%'}}></div>
                                </div>
                            </div>

                        </div>

                        <div className="column--half column--half__column">

                            <div className="stat">
                                <div className="stat--top">
                                    <div className="stat--name">{getStageText('node')}</div>
                                    <div className="stat--score">{getStage('node').quantity}</div>
                                </div>
                                <div className="stat--bar">
                                    <div className="stat--bar-fill" style={{animationDelay:'0s', backgroundColor:getStage('node').color, width: getStage('node').quantity+'%'}}></div>
                                </div>
                            </div>

                            <div className="stat">
                                <div className="stat--top">
                                    <div className="stat--name">{getStageText('css')}</div>
                                    <div className="stat--score">{getStage('css').quantity}</div>
                                </div>
                                <div className="stat--bar">
                                    <div className="stat--bar-fill" style={{animationDelay:'.1s', backgroundColor:getStage('css').color, width: getStage('css').quantity+'%'}}></div>
                                </div>
                            </div>

                            <div className="stat">
                                <div className="stat--top">
                                    <div className="stat--name">{getStageText('csharp')}</div>
                                    <div className="stat--score">{getStage('csharp').quantity}</div>
                                </div>
                                <div className="stat--bar">
                                    <div className="stat--bar-fill" style={{animationDelay:'.2s', backgroundColor:getStage('csharp').color, width: getStage('csharp').quantity+'%'}}></div>
                                </div>
                            </div>

                            <div className="stat">
                                <div className="stat--top">
                                    <div className="stat--name">{getStageText('tridion')}</div>
                                    <div className="stat--score">{getStage('tridion').quantity}</div>
                                </div>
                                <div className="stat--bar">
                                    <div className="stat--bar-fill" style={{animationDelay:'.3s', backgroundColor:getStage('tridion').color, width: getStage('tridion').quantity+'%'}}></div>
                                </div>
                            </div>

                            <div className="stat">
                                <div className="stat--top">
                                    <div className="stat--name">{getStageText('sql')}</div>
                                    <div className="stat--score">{getStage('sql').quantity}</div>
                                </div>
                                <div className="stat--bar">
                                    <div className="stat--bar-fill" style={{animationDelay:'.4s', backgroundColor:getStage('sql').color, width: getStage('sql').quantity+'%'}}></div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </Stage>
        );
    }
}
