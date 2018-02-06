import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import {Grid, Message} from 'semantic-ui-react';

import styles from './App.css';
import MainMenu from "../MainMenu/MainMenu";
import MapContainer from "../MapContainer/MapContainer";
import ErrorBox from "../ErrorBox/ErrorBox";
import GeoTracker from "../../lib/geo";
import {
  setGeolocationAvailable,
  setGeolocationEnabled
} from "../../actions";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: true,
      geoAvailableDissmissed: false,
      geoEnabledDissmissed: false,
    }

    this.geoTracker = new GeoTracker()
  }

  componentDidMount() {
    if (this.geoTracker.isAvailable()) {
      this.geoTracker.attemptToEnable()
        .then(() => {
          console.log('geolocation is enabled')
        })
        .catch(() => {
          this.props.dispatch(setGeolocationEnabled(false))
        })
    } else {
      console.log('geolocation is not available')
      this.props.dispatch(setGeolocationAvailable(false))
      this.props.dispatch(setGeolocationEnabled(false))
    }
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
    const {isMenuOpen, geoAvailableDissmissed, geoEnabledDissmissed} = this.state
    const {isGeolocationAvailable, isGeolocationEnabled} = this.props
    return (
      <Grid className={styles.Grid}>
        <ErrorBox>
          {!isGeolocationAvailable && !geoAvailableDissmissed &&
            <Message warning onDismiss={() => this.dismissGeoAvailableError()}>
              <Message.Header>Sorry, geolocation is not available in your browser.</Message.Header>
            </Message>
          }
          {!isGeolocationEnabled && !geoEnabledDissmissed &&
            <Message warning onDismiss={() => this.dismissGeoEnabledError()}>
              <Message.Header>Geolocation is not enabled. Please enable it in your settings and reload your browser.</Message.Header>
            </Message>
          }
        </ErrorBox>
        <Grid.Row className={styles.Row}>
          {
            isMenuOpen &&
            <Grid.Column width={4} className={styles.Col}>
              <MainMenu geoTracker={this.geoTracker} />
            </Grid.Column>
          }
          <Grid.Column width={isMenuOpen ? 12 : 16} className={styles.Col}>
            <MapContainer />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

App.propTypes = {};

const mapStateToProps = state => {
  return {
    isGeolocationEnabled: state.geoSettings.isGeolocationEnabled,
    isGeolocationAvailable: state.geoSettings.isGeolocationAvailable,
  }
}

const AppContainer = connect(mapStateToProps)(App)

export default AppContainer
