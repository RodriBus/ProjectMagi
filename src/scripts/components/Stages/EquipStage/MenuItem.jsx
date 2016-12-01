import React from 'react';

export default class MenuItem extends React.Component {

  static propTypes = {
    selected: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    children: React.PropTypes.string
  }

  getClasses() {
    const classes = ['text__selectable']
    if (this.props.selected) {
      classes.push('text__selected');
    }
    if (this.props.disabled) {
      classes.push('text__disabled');
    }
    return classes.join(' ');
  }

  render() {
    return (
      <span className={ this.getClasses() }>
        {this.props.children}
      </span>
    )
  }
  
}
