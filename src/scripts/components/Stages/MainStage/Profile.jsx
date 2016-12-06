import React from 'react';

import { leftpad, getStage } from '../../../utils';

export default class Profile extends React.Component {

  static propTypes = {
    stage: React.PropTypes.string.isRequired
  }

  render() {
    const stage = getStage(this.props.stage);
    const { displayName, job, image, level, hp, mp } = stage;
    return (
      <div className="profile">
          <div className={ 'profile--image profile--' + image }></div>
          <div className="profile--info">
              <div className="profile--row">
                  <span className="profile--row-item">
                    { displayName }
                  </span>
                  <span className="profile--row-item profile--row-item__right">
                    { job }
                  </span>
              </div>
              <div className="profile--row">

                      <span className="profile--row-item profile--row-item__one profile--row-item__right text__highlighted">LV</span>
                      <span className="profile--row-item profile--row-item__two">
                        { leftpad(level, 2) }
                      </span>


                      <span className="profile--row-item profile--row-item__one profile--row-item__right text__highlighted">HP</span>
                      <span className="profile--row-item profile--row-item__two">
                       { leftpad(hp.current, 4) }/{ leftpad(hp.max, 4) }
                      </span>


                      <span className="profile--row-item profile--row-item__one profile--row-item__right text__highlighted">MP</span>
                      <span className="profile--row-item profile--row-item__two">
                        { leftpad(mp.current, 4) }/{ leftpad(mp.max, 4) }
                      </span>

              </div>
          </div>
      </div>
    )
  }

}
