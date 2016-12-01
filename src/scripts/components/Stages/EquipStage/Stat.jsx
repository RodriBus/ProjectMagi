import React from 'react';

import { getStageText, getStage } from '../../../utils';

export default class Stat extends React.Component {

  static propTypes = {
    stage: React.PropTypes.string.isRequired,
    delay: React.PropTypes.number,
  }

  static defaultProps = {
    delay: 0
  }

  render() {
    const stage = getStage(this.props.stage);
    const text = getStageText(this.props.stage);

    return (
      <div className="stat">

          <div className="stat--top">
              <div className="stat--name">
                { text }
              </div>
              <div className="stat--score">
                { stage.quantity }
              </div>
          </div>

          <div className="stat--bar">
              <div
                className="stat--bar-fill"
                style={ {
                  animationDelay: this.props.delay + 's',
                  backgroundColor: stage.color,
                  width: stage.quantity + '%'
                } }></div>
          </div>

      </div>
    )
  }

}
