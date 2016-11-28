import React from 'react';

import * as utils from '../../utils';
import navigatorStore from '../../store';
import { Stage as StageClass } from '../../classes';
import Stage from '../Stage';

export default class SchemataStage extends React.Component {

    constructor (props) {
        super(props);
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

    getChilds (id = navigatorStore.currentCursor.id) {
        const stage = utils.getStage(id);
        const items = stage.childs.map((chld) => (<div
            key={chld.id}
            id={chld.id}
            className={'link text__selectable ' + this.getClasses(chld.id)}>
            <i className={"icon icon--" + chld.icon}/>{utils.getStageText(chld.id)}
        </div>))
        return items;
    }

    getForcedActive (id) {
        return this.props.forceActive === id ? 'text__selected' : '';
    }

    getClasses (id) {
        return [
            utils.getActiveClass(id),
            utils.getDisabledClass(id),
            this.getForcedActive(id)
        ].join(' ');
    }

    render () {
        const {getStage,  getStageText} = utils;
        const {description} = this.props.forceActive || navigatorStore.currentCursor;
        return (
            <Stage className="stage--schemata">

                <div className="stage--row stage--row__top menu--box">
                    <span className="text__highlighted">Next reward:&nbsp;</span>
                    <span className="">5000 Gold</span>
                </div>

                <div className="stage--row stage--row__bottom">

                    <div className="stage--column stage--column__left menu--box">

                        <div className="column--section">
                            <div className="section--row section--title text__highlighted">2016</div>
                            <div className="section--list">
                                <div className={"list--item text__selectable " + this.getClasses('thisWeb')}>
                                    <i className="icon icon--bullet"/>
                                    {getStageText('thisWeb')}
                                </div>
                                <div className={"list--item text__selectable " + this.getClasses('canapi')}>
                                    <i className="icon icon--bullet"/>
                                    {getStageText('canapi')}
                                </div>
                                <div className={"list--item text__selectable " + this.getClasses('pintamonas')}>
                                    <i className="icon icon--bullet"/>
                                    {getStageText('pintamonas')}
                                </div>
                            </div>
                        </div>
                        <div className="column--section">
                            <div className="section--title text__highlighted">2015</div>
                            <div className="section--list">
                                <div className={"list--item text__selectable " + this.getClasses('itgf')}>
                                    <i className="icon icon--bullet"/>
                                    {getStageText('itgf')}
                            </div>
                            </div>
                        </div>
                        <div className="column--section">
                            <div className="section--title text__highlighted">2014</div>
                            <div className="section--list">
                                <div className={"list--item text__selectable " + this.getClasses('ecuestria')}>
                                    <i className="icon icon--bullet"/>
                                    {getStageText('ecuestria')}
                                </div>
                                <div className={"list--item text__selectable " + this.getClasses('christmas')}>
                                    <i className="icon icon--bullet"/>
                                    {getStageText('christmas')}
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="stage--column stage--column__right menu--box">

                      <div className="column--section">
                        <div className="section--title section--title__center">{navigatorStore.currentCursor.title}</div>
                        <div className="section--banner">
                            <img className="profile--image" src={'/images/banner--' + (['magi', 'canapi', 'nobanner', 'itgf', 'ecuestria', 'christmas'][navigatorStore.currentIndex]) +'.png'}/>
                        </div>
                        <div className="section--description">
                            {description}
                        </div>
                        <div className="section--links">
                            {this.getChilds(this.props.forceActive)}
                        </div>

                      </div>

                    </div>

                </div>
                
            </Stage>
        );
    }
}
