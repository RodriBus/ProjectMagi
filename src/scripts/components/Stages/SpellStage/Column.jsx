import React from 'react';

export default class Column extends React.Component {

  static propTypes = {
    left: React.PropTypes.bool,
    right: React.PropTypes.bool
  }

  getClasses() {
    const classes = ['stage--column'];
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
