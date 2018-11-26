import React, { Component, PropTypes } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export default class DateSelect extends Component {
  static propTypes = {
    expirationDate: PropTypes.number.isRequired,
    setExpirationDate: PropTypes.func.isRequired,
    resetExpirationDate: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      date: props.expirationDate
    };
  }

  onBlur = (moment) => {
    const { setExpirationDate, resetExpirationDate } = this.props;

    if (! moment) {
      this.setState({ date: 0 })
      resetExpirationDate();

      return;
    }

    const date = moment.valueOf()

    setExpirationDate(date)
  };

  render() {

    return (
      <div>
        <h2>Select expiration date:</h2>


        <Datetime
          defaultValue={this.state.date}
          onBlur={this.onBlur}
        />
      </div>
    );
  }
}
