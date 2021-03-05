import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import "moment/locale/ru";

export default class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentHour: 0,
      currentMinute: 0,
      currentSecond: 0,
      dateTime: '',
    };

    this.interval = undefined;
  }

  render() {
    const secondsStyle = {
      transform: `rotate(${this.state.currentSecond}deg)`,
    }

    const minutesStyle = {
      transform: `rotate(${this.state.currentMinute}deg)`,
    }

    const hoursStyle = {
      transform: `rotate(${this.state.currentHour}deg)`,
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
          <p className="clock__timezone">UTC{this.props.item.timezone >= 0
            ? `+${this.props.item.timezone}:00` : `${this.props.item.timezone}:00`}</p>
          <p className="clock__humandate">{this.state.dateTime}</p>
        </div>
      </React.Fragment>
    );
  }

  setData() {
    const timeZone = parseInt(this.props.item.timezone);
    // const day = new Date();
    // const currentHour = 30 * ((day.getUTCHours() + timeZone) + (1 / 60) * day.getUTCMinutes());
    // const currentMinute = 6 * (day.getUTCMinutes() + (1 / 60) * day.getUTCSeconds());
    // const currentSecond = day.getUTCSeconds() * 6;

    const day = moment().utc();
    const currentHour = 30 * ((day.hour() + timeZone) + + (1 / 60) * day.minute());
    const currentMinute = 6 * (day.minute() + (1 / 60) * day.second());
    const currentSecond = day.second() * 6;

    this.setState({
      currentHour,
      currentMinute,
      currentSecond,
      dateTime: day.add(timeZone, 'h').format('LL LTS'),
    });
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
