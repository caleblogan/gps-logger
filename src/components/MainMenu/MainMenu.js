import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import styles from './MainMenu.css';

import {Menu, Icon, Modal, Button} from 'semantic-ui-react';
import LogMenu from "./LogMenu";
import LogFilter from "./LogFilter";
import NewLog from "./NewLog";
import {addLog, addLogPosition} from "../../actions/logActions";
import {setActiveLog, setCurrentLocation} from "../../actions/geoLoggerActions";
import {loadUser} from '../../actions/userActions';
import {logout} from '../../actions/authActions';
import UserDetail from "./UserDetail";
import LogInfo from "./LogInfo";

class MainMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
    }

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleLogItemClick = this.handleLogItemClick.bind(this);
    this.handleAddNewLog = this.handleAddNewLog.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(loadUser())
  }

  handleSearchChange(event) {
    this.setState({searchValue: event.target.value})
  }

  filteredLogs() {
    const searchValue = this.state.searchValue.toLowerCase().trim()
    const filteredIDS = Object.keys(this.props.logs).filter(logID => (
      this.props.logs[logID].name.toLowerCase().includes(searchValue)
    ))
    return filteredIDS.map(logID => this.props.logs[logID])
  }

  startRecording() {
    this.props.geoTracker.startWatching(position => {
      const newPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      }
      this.props.dispatch(addLogPosition(this.props.activeLogID, newPosition));
      this.props.dispatch(setCurrentLocation(position.coords.latitude, position.coords.longitude))
    })
  }

  stopRecording() {
    this.props.geoTracker.stopWatching()
  }

  handleLogItemClick(e, logID) {
    this.props.dispatch(setActiveLog(logID))
  }

  handleAddNewLog(name) {
    this.props.dispatch(addLog(name))
  }

  handleDeleteLog(event) {
    event.preventDefault()
  }

  handleEditLog(event) {
    event.preventDefault();
  }

  handleLogout(event) {
    event.preventDefault()
    this.props.dispatch(logout())
  }

  render() {
    const { activeLog = {}, currentLocation, token, user, logsLoading } = this.props
    return (
      <div className={styles.Menu}>
        <Menu fluid inverted vertical className={styles.infoMenu}>
          <UserDetail isAuthenticated={!!token} user={user} handleLogout={this.handleLogout}/>
          <LogInfo
            log={activeLog}
            currentLocation={currentLocation}
            startRecording={this.startRecording}
            stopRecording={this.stopRecording}
            onDeleteLog={this.handleDeleteLog}
            onEditLog={this.handleEditLog}
          />
          <NewLog onSave={this.handleAddNewLog}/>
          <LogFilter onChange={this.handleSearchChange} value={this.state.searchValue} />
        </Menu>
        <LogMenu isLoading={logsLoading} activeItem={activeLog.id} logs={this.filteredLogs()} onClick={this.handleLogItemClick}/>
      </div>
    )
  }
}

MainMenu.propTypes = {
};

function getActiveLog(activeLogID, logs) {
  for (let log of logs) {
    if (log.id === activeLogID) {
      return log
    }
  }
}
const mapStateToProps = state => {
  return {
    logs: state.logs,
    activeLogID: state.geoLogger.activeLogID,
    activeLog: getActiveLog(state.geoLogger.activeLogID, state.logs),
    currentLocation: state.geoLogger.currentLocation,
    token: state.token,
    user: state.user,
    logsLoading: state.geoLogger.logsLoading
  }
}

const MainMenuContainer = connect(mapStateToProps)(MainMenu)

export default MainMenuContainer;
