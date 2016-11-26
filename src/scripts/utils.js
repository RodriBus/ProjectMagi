import navigatorStore from './store';
import { Stage as StageClass } from './classes';

export function getStageText(id) {
  const stage = StageClass.getStage(id);
  return stage.displayName;
}

export function getCurrentStageHelp() {
  const currentStageSelected = navigatorStore.currentCursor;
  const stage = currentStageSelected;
  return stage.help;
}

export function getActiveClass(id) {
  const currentStageSelected = navigatorStore.currentCursor;
  return id === currentStageSelected.id
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
  return [getActiveClass(id), getDisabledClass(id)].filter((val) => !!val).join(' ');
}
