import React from 'react';

import * as utils from '../../utils';
import navigatorStore from '../../store';
import { Stage as StageClass } from '../../classes';
import Stage from '../Stage';

export default class MainStage extends React.Component {

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
        const {getClasses, getStageText} = utils;
        return (
            <Stage className="stage--main">

              <div className="stage--column stage--column__left-col">
                <div className="menu--section colum--section menu--box">
                    <div className="profile">
                        <img className="profile--image" src="/images/profile.png"/>
                        <div className="profile--info">
                            <div className="profile--row">
                                <span className="profile--row-item">Diego</span>
                                <span className="profile--row-item profile--row-item__right">Dev</span>
                            </div>
                            <div className="profile--row">

                                    <span className="profile--row-item profile--row-item__one profile--row-item__right text__highlighted">LV</span>
                                    <span className="profile--row-item profile--row-item__two">26</span>


                                    <span className="profile--row-item profile--row-item__one profile--row-item__right text__highlighted">HP</span>
                                    <span className="profile--row-item profile--row-item__two">260/ 260</span>


                                    <span className="profile--row-item profile--row-item__one profile--row-item__right text__highlighted">MP</span>
                                    <span className="profile--row-item profile--row-item__two">140/ 140</span>

                            </div>
                        </div>
                    </div>

                    <div className="profile">
                        <img className="profile--image" src="/images/soldier.png"/>
                        <div className="profile--info">
                            <div className="profile--row">
                                <span className="profile--row-item">Biggs</span>
                                <span className="profile--row-item profile--row-item__right">Mgtk Elite</span>
                            </div>
                            <div className="profile--row">

                                    <span className="profile--row-item profile--row-item__one profile--row-item__right text__highlighted">LV</span>
                                    <span className="profile--row-item profile--row-item__two"><span className="text__unknown-2"/></span>


                                    <span className="profile--row-item profile--row-item__one profile--row-item__right text__highlighted">HP</span>
                                    <span className="profile--row-item profile--row-item__two">706/<span className="text__unknown-4"/></span>


                                    <span className="profile--row-item profile--row-item__one profile--row-item__right text__highlighted">MP</span>
                                    <span className="profile--row-item profile--row-item__two">154/<span className="text__unknown-4"/></span>

                            </div>
                        </div>
                    </div>

                    <div className="profile">
                        <img className="profile--image" src="/images/soldier.png"/>
                        <div className="profile--info">
                            <div className="profile--row">
                                <span className="profile--row-item">Wedge</span>
                                <span className="profile--row-item profile--row-item__right">Mgtk Elite</span>
                            </div>
                            <div className="profile--row">

                                    <span className="profile--row-item profile--row-item__one profile--row-item__right text__highlighted">LV</span>
                                    <span className="profile--row-item profile--row-item__two"><span className="text__unknown-2"/></span>


                                    <span className="profile--row-item profile--row-item__one profile--row-item__right text__highlighted">HP</span>
                                    <span className="profile--row-item profile--row-item__two">704/<span className="text__unknown-4"/></span>


                                    <span className="profile--row-item profile--row-item__one profile--row-item__right text__highlighted">MP</span>
                                    <span className="profile--row-item profile--row-item__two">154/<span className="text__unknown-4"/></span>

                            </div>
                        </div>
                    </div>
                </div>
              </div>



              <div className="stage--column stage--column__right-col">
                <div className="menu--section colum--section__top menu--box">
                    <div className="section--content">
                        <div className={'text__selectable ' + getClasses('items')}>{getStageText('items')}</div>
                        <div className={'text__selectable ' + getClasses('abilities')}>{getStageText('abilities')}</div>
                        <div className={'text__selectable ' + getClasses('equip')}>{getStageText('equip')}</div>
                        <div className={'text__selectable ' + getClasses('spells')}>{getStageText('spells')}</div>
                        <div className={'text__selectable ' + getClasses('status')}>{getStageText('status')}</div>
                        <div className={'text__selectable ' + getClasses('formation')}>{getStageText('formation')}</div>
                        <div className={'text__selectable ' + getClasses('config')}>{getStageText('config')}</div>
                        <div className={'text__selectable ' + getClasses('datalog')}>{getStageText('datalog')}</div>
                        <div className={'text__selectable ' + getClasses('schemata')}>{getStageText('schemata')}</div>
                        <div className={'text__selectable ' + getClasses('map')}>{getStageText('map')}</div>
                        <div className={'text__selectable ' + getClasses('help')}>{getStageText('help')}</div>
                        <div className={'text__selectable ' + getClasses('save')}>{getStageText('save')}</div>
                    </div>
                </div>
                <div className="menu--section colum--section__middle menu--box">
                    <div className="section--content">
                        <div className="">Overworld</div>
                    </div>
                </div>
                <div className="menu--section colum--section__bottom menu--box">
                    <div className="section--content">
                        <div className="section--row">
                            <div className="section--row__half row--half__left text__highlighted">Time</div>
                            <div className="section--row__half row--half__right">
                                29
                                <span className="clock--divider text__blinking">:</span>
                                18
                            </div>
                        </div>
                        <div className="section--row">
                            <div className="section--row__half row--half__left text__highlighted">Steps</div>
                            <div className="section--row__half row--half__right">9256</div>
                        </div>
                        <div className="section--row">
                            <div className="section--row__half row--half__left text__highlighted">Gold</div>
                            <div className="section--row__half row--half__right">21288</div>
                        </div>
                    </div>
                </div>
              </div>

            </Stage>
        );
    }
}
