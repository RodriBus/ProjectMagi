import React from 'react';
export default class Disclaimer extends React.Component {

    render () {
        return (
            <div className="message menu--box">
                <h1 className="title text__red">
                    Disclaimer
                </h1>
                <p className="paragraph">
                    This project was made by a developer with null-but-well-meaning CSS skills and is not adjusted to every market device screen.
                </p>
                <p className="paragraph">
                    I'm trying to avoid you to see some serious mess so please rotate your device to landscape.
                </p>
                <p className="paragraph paragraph__right">
                    Thank you!
                </p>
            </div>
        );
    }
}
