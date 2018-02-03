import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Grid, Message} from 'semantic-ui-react';

import styles from './App.css';
import MainMenu from "../MainMenu/MainMenu";
import MapContainer from "../MapContainer/MapContainer";
import ErrorBox from "../ErrorBox/ErrorBox";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: true,
      activeLog: {coords: []},
      logs: [
        {id: 0, name: 'log 0', coords: [
          {
            coords: {latitude: 51.507351, longitude: -0.127758},
          },
          {
            coords: {latitude: 52.507351, longitude: -0.147758},
          },
        ]},
        {id: 1, name: 'log 1', coords: []},
        {id: 2, name: 'log 2', coords: []},
      ],
      geolocationWatchID: null,
      isGeolocationEnabled: true,
      isGeolocationAvailable: true,
      showGeolocationEnabledError: true,
      showGeolocationAvailableError: true,
      currentLocation: null,
    }

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleAddNewLog = this.handleAddNewLog.bind(this);
  }

  componentDidMount() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({currentLocation: position.coords})
      }, error => {
        console.log('geo not accepted;', error)
        this.setState({
          isGeolocationEnabled: false,
        })
      });
    } else {
      console.log('geolocation not available')
      this.setState({
        isGeolocationAvailable: false
      })
    }
  }

  handleItemClick(e, logElem) {
    for (let log of this.state.logs) {
      if (log.id === logElem.id) {
        this.setState({ activeLog: log})
      }
    }
  }

  handleAddNewLog(log) {
    this.setState(prevState => ({
      logs: [
        ...prevState.logs,
        {
          id: Math.floor(Math.random() * 20000),
          name: log,
          coords: []
        }
      ]
    }))
  }

  handleDismiss() {
    this.setState({showGeolocationAvailableError: false})
  }

  startRecording() {
    console.log('start')
    if (this.state.geolocationWatchID) {
      navigator.geolocation.clearWatch(this.state.geolocationWatchID);
    }
    const log = this.state.activeLog;
    const watchID = navigator.geolocation.watchPosition(position => {
      log.coords.push(position)
      this.setState({currentLocation: position.coords})
    });
    this.setState({geolocationWatchID: watchID})
  }

  stopRecording() {
    console.log('stop')
    navigator.geolocation.clearWatch(this.state.geolocationWatchID);
    this.setState({geolocationWatchID: null})
  }

  render() {
    const {isMenuOpen} = this.state
    return (
      <Grid className={styles.Grid}>
        <ErrorBox>
        {!this.state.isGeolocationAvailable && this.state.showGeolocationAvailableError &&
          <Message warning onDismiss={()=>this.handleDismiss()}>
            <Message.Header>Geolocation is not available in this browser. Please try a new browser like Chrome.</Message.Header>
          </Message>
        }
        {!this.state.isGeolocationEnabled && this.state.showGeolocationEnabledError &&
          <Message warning onDismiss={()=>this.handleDismiss()}>
            <Message.Header>Geolocation is currently disabled. Turn it on first to start recording.</Message.Header>
          </Message>
        }
        </ErrorBox>
        <Grid.Row className={styles.Row}>
          {
            isMenuOpen &&
            <Grid.Column width={4} className={styles.Col}>
              <MainMenu
                activeLog={this.state.activeLog}
                logs={this.state.logs}
                handleItemClick={this.handleItemClick}
                handleAddNewLog={this.handleAddNewLog}
                startRecording={this.startRecording.bind(this)}
                stopRecording={this.stopRecording.bind(this)}
                currentLocation={this.state.currentLocation}
              />
            </Grid.Column>
          }
          <Grid.Column width={isMenuOpen ? 12 : 16} className={styles.Col}>
            <MapContainer coords={this.state.activeLog.coords}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}


const noSpacing = {
  padding: 0,
  margin: 0
}

App.propTypes = {};

export default App;
