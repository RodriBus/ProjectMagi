import React from 'react';

import { getStageText } from '../../../utils';

export default class EquipSlot extends React.Component {

  static propTypes = {
    stage: React.PropTypes.string.isRequired,
    children: React.PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className="column--half ">
          <div className="column--half__left text__highlighted">
            { this.props.children }
          </div>
          <div className="column--half__right ">
              <span className="text__selectable">
                { getStageText(this.props.stage) }
              </span>
          </div>
      </div>
    )
  }

}
