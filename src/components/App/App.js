import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Grid, Message} from 'semantic-ui-react';

import styles from './App.css';
import MainMenu from "../MainMenu/MainMenu";
import MapContainer from "../MapContainer/MapContainer";
import ErrorBox from "../ErrorBox/ErrorBox";
import GeoTracker from "../../lib/geo";

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
      currentLocation: {},
      isGeolocationEnabled: true,
      isGeolocationAvailable: true,
      geoAvailableDissmissed: false,
      geoEnabledDissmissed: false,
    }

    this.geoTracker = new GeoTracker()
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleAddNewLog = this.handleAddNewLog.bind(this);
  }

  componentDidMount() {
    if (this.geoTracker.isAvailable()) {
      this.geoTracker.attemptToEnable()
        .then(coords => {
          console.log('enabled')
        })
        .catch(error => {
          this.setState({
            isGeolocationEnabled: false
          })
        })
    } else {
      console.log('geolocation is not available')
      this.setState({
        isGeolocationAvailable: false,
        isGeolocationEnabled: false
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

  startRecording() {
    console.log('start')
    const log = this.state.activeLog;
    this.geoTracker.startWatching(position => {
      log.coords.push(position)
      this.setState({currentLocation: position.coords})
    })
  }

  stopRecording() {
    console.log('stop')
    this.geoTracker.stopWatching()
  }

  dismissGeoAvailableError() {
    this.setState({
      geoAvailableDissmissed: true
    })
  }

  dismissGeoEnabledError() {
    this.setState({
      geoEnabledDissmissed: true
    })
  }

  render() {
    const {isMenuOpen} = this.state
    return (
      <Grid className={styles.Grid}>
        <ErrorBox>
          {!this.state.isGeolocationAvailable && !this.state.geoAvailableDissmissed &&
            <Message warning onDismiss={() => this.dismissGeoAvailableError()}>
              <Message.Header>Sorry, geolocation is not available in your browser.</Message.Header>
            </Message>
          }
          {!this.state.isGeolocationEnabled && !this.state.geoEnabledDissmissed &&
            <Message warning onDismiss={() => this.dismissGeoEnabledError()}>
              <Message.Header>Geolocation is not enabled. Please enable it in your settings and reload your browser.</Message.Header>
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
