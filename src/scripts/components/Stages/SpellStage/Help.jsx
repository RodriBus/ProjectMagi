import React from 'react';

import { getCurrentStageHelp } from '../../../utils';

export default class Help extends React.Component {

  getClasses() {
    const classes = [];
    return classes.concat(this.props.classes).join(' ');
  }

  render() {
    return (
      <div className={ this.getClasses() }>
          <span className="help">
            { getCurrentStageHelp() }
          </span>
      </div>
    )
  }

}
