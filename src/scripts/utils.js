import navigatorStore from './store';
import { Stage as StageClass } from './classes';

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

export function leftpad(value, pads, padchar = ' ') {
  if (value) {
    value += '';
    const pad = padchar.repeat(pads);
    return pad.substring(0, pad.length - value.length) + value;
  }
  return '?'.repeat(pads);
}
