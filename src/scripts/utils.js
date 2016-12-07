import navigatorStore from './store';
import { Stage as StageClass } from './classes';

const audio = new Audio();
audio.src = "http://soundfxcenter.com/video-games/final-fantasy-vi/8d82b5_Final_Fantasy_VI_Pointer_Finger_Sound_Effect.mp3";
audio.volume = 0.02;

export function playMenuSound () {
  const a = audio.cloneNode();
  a.volume = 0.25;
  a.play();
}

export function getStageText(id) {
  return StageClass.getStage(id).displayName;
}

export function getStage (id) {
  return StageClass.getStage(id);
}

export function getCurrentStageHelp() {
  return navigatorStore.currentCursor.help;
}

export function getActiveClass(id) {
  return isInPath(id)
    ? 'text__selected'
    : '';
}

export function getDisabledClass(id) {
  const stage = StageClass.getStage(id);
  return stage.available
    ? ''
    : 'text__disabled';
}

export function getClasses(id) {
  return [
    getActiveClass(id),
    getDisabledClass(id)
  ].filter( (val) => !!val ).join(' ');
}

export function isInPath(id) {
  return navigatorStore.path.some( val => id === val )
  || (navigatorStore.currentCursor && navigatorStore.currentCursor.id === id) ;
}

export function isDevice () {
  if (('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch)) {
    return true;
  }
return false;
}

export function isLandscape () {
  if (window.innerWidth > window.innerHeight ||
     (window.innerWidth > 600 && window.innerHeight > 400)) {
    return true;
  }
return false;
}

export function leftpad(value, pads, padchar = ' ') {
  if (value) {
    value += '';
    const pad = padchar.repeat(pads);
    return pad.substring(0, pad.length - value.length) + value;
  }
  return '?'.repeat(pads);
}
