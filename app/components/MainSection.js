import React, { Component, PropTypes } from 'react';
import DateSelect from './DateSelect';
import Countdown from './Countdown';
import './MainSection.css'
import moment from 'moment'

export default class MainSection extends Component {

  static propTypes = {
    timer: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      now: Date.now()
    }
  }

  onTimeIsUp = () => {
    this.setState({
      now: Date.now()
    })
  };

  renderCountdown(expirationDate) {
    if (expirationDate && this.state.now < expirationDate) {
      return (
        <div>
          <Countdown
            date={moment(expirationDate).format()}
            onTimeIsUp={this.onTimeIsUp}
          />
          <strong>until the time expires</strong>
        </div>
      );
    }
  };

  renderExpiredAlert(expirationDate) {
    if (expirationDate && this.state.now > expirationDate) {
      return (
        <div className="alert">EXPIRED</div>
      );
    }
  };

  render() {
    const { timer, actions } = this.props;

    const expirationDate = timer[0].expirationDate;

    return (
      <section>
        <DateSelect
          expirationDate={expirationDate}
          {...actions}
        />

        {this.renderCountdown(expirationDate)}
        {this.renderExpiredAlert(expirationDate)}
      </section>
    );
  }
}
