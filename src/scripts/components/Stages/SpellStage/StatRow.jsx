import React from 'react';

import { getCurrentStageHelp } from '../../../utils';

export default class StatRow extends React.Component {

  static propTypes = {
    title: React.PropTypes.string
  }

  render() {
    let titleEl;
    if (this.props.title) {
      titleEl = (
        <div className="row--half__left text__highlighted">
          { this.props.title }
        </div>
      )
    }

    return (
      <div className="section--row">
          { titleEl }
          <div className="row--half__right">
            { this.props.children }
          </div>
      </div>
    )
  }

}
