import React from 'react';

export default class MenuInfo extends React.Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired
  }

  render() {
    const { stage } = this.props;
    return (
      <div className="section--row">
          <div className="section--row__half row--half__left text__highlighted">
            { this.props.title }
          </div>
          <div className="section--row__half row--half__right">
              { this.props.children }
          </div>
      </div>
    )
  }

}
