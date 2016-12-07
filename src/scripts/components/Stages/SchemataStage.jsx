import React from 'react';

import * as utils from '../../utils';
import navigatorStore from '../../store';
import Stage from '../Stage';

import { SchemataGroup, SchemataDetails } from './SchemataStage/index';

export default class SchemataStage extends React.Component {

    static propTypes = {
        forceActive: React.PropTypes.string
    }

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

    render () {
        const currentStageId = this.props.forceActive || navigatorStore.currentCursor.id;
        return (
            <Stage className="stage--schemata">

                <div className="stage--row stage--row__top menu--box">
                    <span className="text__highlighted">Next reward:&nbsp;</span>
                    <span className="">5000 Gold</span>
                </div>

                <div className="stage--row stage--row__bottom">

                    <div className="stage--column stage--column__left menu--box">

                      <SchemataGroup year={ 2016 } />
                      <SchemataGroup year={ 2015 } />
                      <SchemataGroup year={ 2014 } />

                    </div>

                    <div className="stage--column stage--column__right menu--box">

                        <SchemataDetails stage={ currentStageId }/>

                    </div>

                </div>

            </Stage>
        );
    }
}
