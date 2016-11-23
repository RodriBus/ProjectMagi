export function getStageText(id) {
  const stage = StageClass.getStage(id);
  return stage.displayName;
}

export function getCurrentStageHelp() {
  const stage = this.state.currentStageSelected;
  return stage.help;
}

export function getActiveClass(id) {
  return id === this.state.currentStageSelected.id
    ? 'active'
    : '';
}

export function getDisabledClass(id) {
  const stage = StageClass.getStage(id);
  return stage.available
    ? ''
    : 'disabled';
}

export function getClasses(id) {
  return [getActiveClass(id), getDisabledClass(id)].join(' ').map((val) => !!val);
}
