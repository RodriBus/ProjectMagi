import React from 'react';

import Stage from './Stage';

import * as Stages from '../stores/StageStores';

export default class Menu extends React.Component {
  constructor(){
    super();
    this.state = {
      currentStage: 'main'
    };
    window.stages = Stages;

    const audio = this.audio = new Audio();
    audio.src = "http://soundfxcenter.com/video-games/final-fantasy-vi/8d82b5_Final_Fantasy_VI_Pointer_Finger_Sound_Effect.mp3"
    audio.volume=.02;
    audio.onload = () => {
      console.log('playable');
      audio.playable = true;
    };
  }

  onKeydown(e) {
    switch(e.which) {
        case 37: // left
        console.log('keydown:left');
        break;

        case 38: // up
        console.log('keydown:up');
        Stages.stagePathStore.up();
        // moveUp();
        break;

        case 39: // right
        console.log('keydown:right');
        break;

        case 40: // down
        console.log('keydown:down');
        Stages.stagePathStore.down();
        // moveDown();
        break;

        case 13: // enter
        console.log('keydown:enter');
        Stages.stagePathStore.navigateNext();
        break;

        case 8: // left
        console.log('keydown:return');
        Stages.stagePathStore.navigatePrev();
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  }

  playMenuSound(){
    const a = this.audio.cloneNode();
    a.play();
  }

  onCursorMove() {
    this.playMenuSound();
  }

  onNavigate(currentStage){
    console.log(currentStage);
    this.playMenuSound();
    this.setState({currentStage});
  }

  componentWillMount(){
    Stages.stagePathStore.on('navigate:next', this.onNavigate.bind(this));
    Stages.stagePathStore.on('navigate:previous', this.onNavigate.bind(this));
    document.addEventListener("keydown", this.onKeydown.bind(this));

    Stages.stagePathStore.on('cursor:up', this.onCursorMove.bind(this));
    Stages.stagePathStore.on('cursor:down', this.onCursorMove.bind(this));
  }

  getStage(id) {
    console.log('Rendered STAGE: ',id);
    const items = {
      main: <Stage id='main' key='main' menuItems={['spells', 'equip', 'achievements', 'save']}/>,
      spells: <Stage id='spells' key='spells' menuItems={['git', 'gulp', 'webpack', 'sass', 'bootstrap', 'php', 'java', 'google', 'photoshop', 'webdev', 'pro', 'passion', 'problemRes', 'organized', 'oldGames']}/>,
      equip: <Stage id='equip' key='equip' menuItems={[]}/>,
      achievements: <Stage id='achievements' key='achievements' menuItems={[]}/>,
      save: <Stage id='save' key='save' menuItems={[]}/>,
    };
    return items[id] || items.main;
  }

  // componentWillUnmount

  render() {
    return (
      <div class="menu">
        {this.getStage(this.state.currentStage)}
      </div>
    );
  }
}
