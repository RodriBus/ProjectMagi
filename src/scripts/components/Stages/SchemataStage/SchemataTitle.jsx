import React from 'react';

import { getStage, getClasses } from '../../../utils';

export default class SchemataTitle extends React.Component {

  static propTypes = {
    stage: React.PropTypes.string.isRequired
  }

  render() {
    const { displayName, element, id } = getStage(this.props.stage);
    return (
      <div className={ "list--item text__selectable " + getClasses(id) }>
          <i className="icon icon--bullet"/>
          { displayName }
      </div>
    )
  }

}
