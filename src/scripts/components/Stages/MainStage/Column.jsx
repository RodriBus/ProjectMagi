import React from 'react';

export default class Column extends React.Component {

  static propTypes = {
    left: React.PropTypes.bool,
    right: React.PropTypes.bool
  }

  getClasses() {
    const classes = ['stage--column'];
    if (this.props.left) {
      classes.push('stage--column__left-col');
    } else if (this.props.right) {
      classes.push('stage--column__right-col');
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
