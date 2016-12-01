import React from 'react';

import * as utils from '../../utils';
import navigatorStore from '../../store';
import { Stage as StageClass } from '../../classes';
import Stage from '../Stage';

import { Section, MenuItem, EquipSlot, Stat } from './EquipStage/index';

export default class EquipStage extends React.Component {
    render () {
      const {getClasses, getStageText, getStage, getCurrentStageHelp} = utils;
        return (
            <Stage className="stage--equip">
                <div className="stage--column">

                    <Section classes={ ['column--section__top'] }>

                        <MenuItem selected > Equip </MenuItem>
                        <MenuItem disabled > Optimun </MenuItem>
                        <MenuItem disabled > Remove </MenuItem>
                        <MenuItem disabled > Empty </MenuItem>

                    </Section>

                    <Section classes={ ['column--section__middle'] }>

                        <div className="section--column">
                            <EquipSlot stage="rhand"> R-Hand </EquipSlot>
                            <EquipSlot stage="lhand"> L-Hand </EquipSlot>
                        </div>

                        <div className="section--column">
                            <EquipSlot stage="head"> Head </EquipSlot>
                            <EquipSlot stage="body"> Body </EquipSlot>
                        </div>

                    </Section>

                    <Section classes={ ['column--section__bottom'] }>

                        <div className="column--half column--half__column">
                            <Stat stage="js" />
                            <Stat stage="es6" delay={ 0.1 } />
                            <Stat stage="jquery" delay={ 0.2 } />
                            <Stat stage="angular" delay={ 0.3 } />
                            <Stat stage="react" delay={ 0.4 } />
                        </div>

                        <div className="column--half column--half__column">
                            <Stat stage="node" />
                            <Stat stage="css" delay={ 0.1 } />
                            <Stat stage="csharp" delay={ 0.2 } />
                            <Stat stage="tridion" delay={ 0.3 } />
                            <Stat stage="sql" delay={ 0.4 } />
                        </div>

                    </Section>

                </div>
            </Stage>
        );
    }
}
