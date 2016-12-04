import React from 'react';

import navigatorStore from '../../store';
import Stage from '../Stage';

import { Column, SectionBox, SectionContent, Profile, MenuItem, MenuInfo} from './MainStage/index';

export default class MainStage extends React.Component {

    constructor () {
        super();
        this.onCursorMove = this.onCursorMove.bind(this);
    }

    componentWillMount () {
        navigatorStore.on('cursor', this.onCursorMove);
        navigatorStore.on('time', this.onCursorMove);
    }

    componentWillUnmount () {
        navigatorStore.removeListener('cursor', this.onCursorMove);
        navigatorStore.removeListener('time', this.onCursorMove);
    }

    onCursorMove () {
        this.forceUpdate();
    }

    onTime () {
        this.forceUpdate();
    }

    getMenuItems () {
        return ['items',
            'abilities',
            'equip',
            'spells',
            'status',
            'formation',
            'config',
            'datalog',
            'schemata',
            'map',
            'help',
            'save'].map( (stage) => <MenuItem key={ stage } stage={ stage } /> );
    }

    render () {
        const { hour, minutes, steps, gold } = navigatorStore.info;
        return (
            <Stage className="stage--main">

              <Column left>
                <SectionBox>
                    <Profile stage="diego"/>
                    <Profile stage="biggs"/>
                    <Profile stage="wedge"/>
                </SectionBox>
              </Column>

              <Column right>
                <SectionBox top>
                    <SectionContent>
                        { this.getMenuItems() }
                    </SectionContent>
                </SectionBox>

                <SectionBox middle>
                    <SectionContent>
                        <div className="">Overworld</div>
                    </SectionContent>
                </SectionBox>

                <SectionBox bottom>
                    <SectionContent>
                        <MenuInfo title="Time">
                            { hour }
                            <span className="clock--divider text__blinking">:</span>
                            { minutes }
                        </MenuInfo>
                        <MenuInfo title="Steps">
                            { steps }
                        </MenuInfo>
                        <MenuInfo title="Gold">
                            { gold }
                        </MenuInfo>
                    </SectionContent>
                </SectionBox>
              </Column>

            </Stage>
        );
    }
}
