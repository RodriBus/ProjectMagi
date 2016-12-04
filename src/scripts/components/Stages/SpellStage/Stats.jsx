import React from 'react';

import { leftpad, getStage } from '../../../utils';
import StatRow from './StatRow';

export default class Stats extends React.Component {

  static propTypes = {
    stage: React.PropTypes.string.isRequired
  }

  render() {
    const stage = getStage(this.props.stage);
    const { displayName, job, image, level, hp, mp } = stage;
    return (
      <div className="stats-container">
          <div className="section section__image">
              <img className="section--image" src={ image }/>
          </div>

          <div className="section section__stats">

              <StatRow>
                { displayName }
              </StatRow>

              <StatRow title="LV">
                { leftpad(level, 2) }
              </StatRow>

              <StatRow title="MP">
                { leftpad(hp.current, 4) }/{ leftpad(hp.max, 4) }
              </StatRow>

              <StatRow title="HP">
                { leftpad(mp.current, 4) }/{ leftpad(mp.max, 4) }
              </StatRow>

          </div>

          <div className="section section__job">

              <div className="section--row">
                  <i className="icon icon--job"/> Web { job }
              </div>

          </div>
      </div>
    )
  }

}
