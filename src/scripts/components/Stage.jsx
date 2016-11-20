import React from 'react';

import {stagePathStore, stageStore} from '../stores/StageStores';

export default class Stage extends React.Component {

  constructor(props) {
    super(props);
    const state = this.state = {};
    // state.menuItems = ['spells', 'equip', 'achievements', 'save'];
    console.log('STAGE', props.id,'\nPROPS:', this.props.menuItems);
    if (this.props.menuItems) {
      state.menuItems = this.props.menuItems;
      state.currentSelected = state.menuItems[0];
    }
    // state.currentSelected = state.menuItems[0];


    this.onCursorMove = this.onCursorMove.bind(this);
  }

  componentWillMount() {
    stagePathStore.on('cursor:up', this.onCursorMove);
    stagePathStore.on('cursor:down', this.onCursorMove);
  }

  componentWillUnmount() {
    stagePathStore.removeListener('cursor:up', this.onCursorMove);
    stagePathStore.removeListener('cursor:down', this.onCursorMove);
  }

  onCursorMove(currentSelected) {
    this.setState({currentSelected});
  }

  getOptions() {
    console.log();
    const arr = [];
    for (const opt of this.state.menuItems) {
      const stage = stageStore.getStage(opt);
      if (stage) {
        const li = (<li key={stage.id}>
          {stage.id === this.state.currentSelected ? '>' : ''}{stage.displayName}
        </li>);
        arr.push(li);
      }
    }
    return <ul>{arr}</ul>;
  }

  getHelp() {
    const stage = stageStore.getStage(this.state.currentSelected);
    return <div style={{paddingTop: '20px'}}>{stage.help}</div>;
  }

  render() {
    return (
      <div class="stage">
        {this.getOptions()}
        {this.getHelp()}
      </div>
    );
  }
}
