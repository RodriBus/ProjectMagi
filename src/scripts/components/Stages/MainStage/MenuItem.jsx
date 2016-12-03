import React from 'react';

import { getClasses, getStageText } from '../../../utils';

export default class MenuItem extends React.Component {

  static propTypes = {
    stage: React.PropTypes.string.isRequired
  }

  render() {
    const { stage } = this.props;
    return (
      <div className={ 'text__selectable ' + getClasses(stage) }>
        { getStageText(stage) }
      </div>
    )
  }

}
