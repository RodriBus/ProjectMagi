import React from 'react';

import navigatorStore from '../../store';
import Stage from '../Stage';

import { Column, SectionBox, Help, Stats, Spell, Passive } from './SpellStage/index';

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
        return (
            <Stage className="stage--spells">
                <Column>

                    <SectionBox top>
                        <Help classes={ ['section--top-content'] } />
                    </SectionBox>

                    <SectionBox middle>
                        <Stats stage="diego" />
                    </SectionBox>

                    <SectionBox bottom>
                        <div className="section--column section--column__spells">
                            <Spell stage="git" />
                            <Spell stage="gulp" />
                            <Spell stage="webpack" />
                            <Spell stage="sass" />
                            <Spell stage="bootstrap" />
                            <Spell stage="php" />
                            <Spell stage="java" />
                            <Spell stage="google" />
                            <Spell stage="photoshop" />
                        </div>

                        <div className="section--column section--column__passives">
                            <Passive stage="webdev" />
                            <Passive stage="pro" />
                            <Passive stage="passion" />
                            <Passive stage="problemRes" />
                            <Passive stage="organized" />
                            <Passive stage="oldGames" />
                        </div>
                    </SectionBox>

                </Column>
            </Stage>
        );
    }
}
