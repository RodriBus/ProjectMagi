import React from 'react';

export default class Stage extends React.Component {

    render () {
        return (
            <div className={"menu--stage " + this.props.className}>
                {this.props.children}
            </div>
        );
    }
}
