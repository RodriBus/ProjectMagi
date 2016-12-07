import React from 'react';

export default class SectionContent extends React.Component {

  render() {
    return (
      <div className="section--content">
          { this.props.children }
      </div>
    )
  }

}
