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
      this.props.dispatch(addLogPosition(position, this.props.activeLogID));
      this.props.dispatch(setCurrentLocation(position.coords))
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
    const { activeLog = {}, currentLocation, token, user } = this.props
    if (token) {
      console.log('user:', user)
    }
    return (
      <div className={styles.Menu}>
        <Menu fluid inverted vertical className={styles.infoMenu}>
          <UserDetail isAuthenticated={!!token} user={user} handleLogout={this.handleLogout}/>
          <Menu.Item>
            {activeLog && activeLog.name ? (
              <div>
                log: {activeLog.name}
                <br />
                <br />
                <p>
                  Current Location: <br /> {currentLocation.latitude}, {currentLocation.longitude}
                </p>
                <br />
                <Button.Group>

                  <Button positive onClick={this.startRecording}>start</Button>
                  <Button onClick={this.stopRecording}>stop</Button>
                </Button.Group>
                <br />
                <br />
                <a href='#' onClick={this.handleDeleteLog}>delete</a>{' '}
                <a href='#' onClick={this.handleEditLog}>edit</a>
              </div>
            ) : (
              <div>No log selected</div>
            )
            }
          </Menu.Item>
          <NewLog onSave={this.handleAddNewLog}/>
          <Menu.Item>
            <LogFilter onChange={this.handleSearchChange} value={this.state.searchValue} />
          </Menu.Item>
        </Menu>
        <LogMenu activeItem={activeLog.id} logs={this.filteredLogs()} onClick={this.handleLogItemClick}/>
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
    user: state.user
  }
}

const MainMenuContainer = connect(mapStateToProps)(MainMenu)

export default MainMenuContainer;
