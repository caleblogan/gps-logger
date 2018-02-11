import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import {Grid, Icon, Message} from 'semantic-ui-react';

import styles from './GeoLogger.css';
import MainMenu from "../../components/MainMenu/MainMenu";
import MapContainer from "../../components/MapContainer/MapContainer";
import ErrorBox from "../../components/ErrorBox/ErrorBox";
import GeoTracker from "../../lib/geo";
import {
  setGeolocationAvailable,
  setGeolocationEnabled
} from "../../actions/geoLoggerActions";
import {initLogs, loadAllPositions} from "../../actions/logActions";

class GeoLogger extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: false,
      geoAvailableDissmissed: false,
      geoEnabledDissmissed: false,
    }

    this.geoTracker = new GeoTracker()
    this.toggleMenu = this.toggleMenu.bind(this)
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
    if (this.props.token) {
      this.props.dispatch(initLogs())
        .then(() => {
          this.props.dispatch(loadAllPositions())

        })
    }
    console.log('geo token:', this.props.token)
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

  toggleMenu(event) {
    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen
    }))
  }

  render() {
    let {isMenuOpen, geoAvailableDissmissed, geoEnabledDissmissed} = this.state
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
            isMenuOpen ? (
            <Grid.Column mobile={14} tablet={4} computer={4} largeScreen={4} widescreen={4} className={styles.Col}>
              <MainMenu geoTracker={this.geoTracker} />
              <Icon name='close' className={styles.CloseMenuButton} onClick={this.toggleMenu} />
            </Grid.Column>
            ) : (
              <Icon name='sidebar' className={styles.OpenMenuButton} onClick={this.toggleMenu} />
            )
          }
          <Grid.Column width={isMenuOpen ? 12 : 16} className={styles.Col}>
            <MapContainer />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

GeoLogger.propTypes = {};

const mapStateToProps = state => {
  return {
    isGeolocationEnabled: state.geoSettings.isGeolocationEnabled,
    isGeolocationAvailable: state.geoSettings.isGeolocationAvailable,
    token: state.token
  }
}

const GeoLoggerContainer = connect(mapStateToProps)(GeoLogger)

export default GeoLoggerContainer
