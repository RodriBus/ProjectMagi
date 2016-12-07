import React from 'react';

import { getStage, getClasses } from '../../../utils';

export default class Passive extends React.Component {

  static propTypes = {
    stage: React.PropTypes.string.isRequired
  }

  render() {
    const stage = getStage(this.props.stage);
    const { displayName, element } = stage;
    return (
      <div className={ 'passive text__selectable ' + getClasses(stage.id) }>
          <i className={ "icon icon--spell icon--spell__" + element }/>
          { displayName }
      </div>
    )
  }

}
