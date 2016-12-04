import React from 'react';

import { getStage, getClasses } from '../../../utils';

export default class SchemataDetails extends React.Component {

  static propTypes = {
    stage: React.PropTypes.string.isRequired
  }

  getChilds (id = navigatorStore.currentCursor.id) {
        const stage = getStage(id);
        const items = stage.childs.map((chld) => (<a
            key={ chld.id }
            id={ chld.id }
            href={ chld.url }
            className={ 'text__link link text__selectable ' + getClasses(chld.id) }>
              <i className={ "icon icon--" + chld.icon }/> { chld.displayName }
            </a>));
        return items;
    }

  render() {
    const { id, title, description, banner } = getStage(this.props.stage);
    return (
      <div className="column--section">
        <div className="section--title section--title__center">
          { title }
        </div>
        <div className="section--banner">
            <img className="profile--image" src={ '/images/banner--' + banner +'.png' }/>
        </div>
        <div className="section--description">
            { description }
        </div>
        <div className="section--links">
            { this.getChilds(id) }
        </div>

      </div>
    )
  }

}
