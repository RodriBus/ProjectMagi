import React from 'react';

import Stage from '../../../classes/Stage';
import SchemataTitle from './SchemataTitle';

export default class SchemataGroup extends React.Component {

  static propTypes = {
    year: React.PropTypes.number
  }

  getShematas(year) {
    const stages = Stage.stages.filter((stage) => stage.year === year);
    return stages.map((stage) => <SchemataTitle key={ stage.id } stage={ stage.id } />)
  }

  render() {
    const { year } = this.props;
    return (
      <div className="column--section">
          <div className="section--row section--title text__highlighted">
            { year }
          </div>
          <div className="section--list">
              { this.getShematas(year) }
          </div>
      </div>
    )
  }

}
