import React from 'react';

import MenuItem from './MenuItem';

export default class Section extends React.Component {

  static propTypes = {
    classes: React.PropTypes.arrayOf(React.PropTypes.string),
  }

  getClasses() {
    const classes = ['column--section', 'menu--box'];
    return classes.concat(this.props.classes).join(' ');
  }

  render() {
    return (
      <div className={ this.getClasses() }>
          {this.props.children}
      </div>
    )
  }

}
