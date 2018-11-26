import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainSection from '../components/MainSection';
import * as TimerActions from '../actions/timer';
import './App.css';

@connect(
  state => ({
    timer: state.timer
  }),
  dispatch => ({
    actions: bindActionCreators(TimerActions, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {
    timer: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { timer, actions } = this.props;

    return (
      <div>
        <MainSection timer={timer} actions={actions} />
      </div>
    );
  }
}
