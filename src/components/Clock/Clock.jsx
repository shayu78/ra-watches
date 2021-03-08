import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import "moment/locale/ru";

export default class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentHourDegree: 0,
      currentMinuteDegree: 0,
      currentSecondDegree: 0,
      dateTime: '',
    };

    this.interval = undefined;
  }

  render() {
    const secondsStyle = {
      transform: `rotate(${this.state.currentSecondDegree}deg)`,
    }

    const minutesStyle = {
      transform: `rotate(${this.state.currentMinuteDegree}deg)`,
    }

    const hoursStyle = {
      transform: `rotate(${this.state.currentHourDegree}deg)`,
    }

    return (
      <React.Fragment>
        <div className="top__clock__info">
          <p className="clock__city">{this.props.item.city}</p>
          <div className="clock__delete" onClick={() => this.props.onDeleteItem(this.props.item.id)}>&#x2716;</div>
        </div>
        <div className="clock">
          <div style={hoursStyle} className="hour__hand"></div>
          <div style={minutesStyle} className="minute__hand"></div>
          <div style={secondsStyle} className="second__hand"></div>
        </div>
        <div className="bottom__clock__info">
          <p className="clock__timezone">UTC{this.getNumberWithSign(this.props.item.timezone)}:00</p>
          <p className="clock__humandate">{this.state.dateTime}</p>
        </div>
      </React.Fragment>
    );
  }

  setData() {
    const timeZone = parseInt(this.props.item.timezone);
    // const day = new Date();
    // const currentHourDegree = 30 * ((day.getUTCHours() + timeZone) + (1 / 60) * day.getUTCMinutes());
    // const currentMinuteDegree = 6 * (day.getUTCMinutes() + (1 / 60) * day.getUTCSeconds());
    // const currentSecondDegree = day.getUTCSeconds() * 6;

    const day = moment().utc();
    const currentHourDegree = 30 * ((day.hour() + timeZone) + + (1 / 60) * day.minute());
    const currentMinuteDegree = 6 * (day.minute() + (1 / 60) * day.second());
    const currentSecondDegree = day.second() * 6;

    this.setState({
      currentHourDegree,
      currentMinuteDegree,
      currentSecondDegree,
      dateTime: day.add(timeZone, 'h').format('LL LTS'),
    });
  }

  getNumberWithSign(input) {
    const sign = input < 0 ? '-' : '+';
    return `${sign}${Math.abs(input)}`;
  }

  componentDidMount() {
    this.setData();
    this.interval = setInterval(() => this.setData(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
}

Clock.propTypes = {
  item: PropTypes.object.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};
