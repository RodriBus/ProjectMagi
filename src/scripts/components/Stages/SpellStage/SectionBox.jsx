import React from 'react';

export default class SectionBox extends React.Component {

  static propTypes = {
    top: React.PropTypes.bool,
    middle: React.PropTypes.bool,
    bottom: React.PropTypes.bool
  }

  getClasses() {
    const classes = ['column--section', 'menu--box'];
    if (this.props.top) {
      classes.push('column--section__top');
    } else if (this.props.middle) {
      classes.push('column--section__middle');
    } else if (this.props.bottom) {
      classes.push('column--section__bottom');
    }
    return classes.concat(this.props.classes).join(' ');
  }

  render() {
    return (
      <div className={ this.getClasses() }>
          { this.props.children }
      </div>
    )
  }

}
