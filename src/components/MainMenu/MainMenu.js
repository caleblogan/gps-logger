import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styles from './MainMenu.css';

import {Menu, Icon, Modal, Button} from 'semantic-ui-react';
import LogMenu from "./LogMenu";
import LogFilter from "./LogFilter";
import NewLog from "./NewLog";

class MainMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
    }

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(event) {
    this.setState({searchValue: event.target.value})
  }

  filteredLogs() {
    const searchValue = this.state.searchValue.toLowerCase().trim()
    return this.props.logs.filter(log => (
      log.name.toLowerCase().includes(searchValue)
    ))
  }

  handleDeleteLog(event) {
    event.preventDefault()
  }

  render() {
    const { activeLog, currentLocation } = this.props
    return (
      <div className={styles.Menu}>
        <Menu fluid inverted vertical className={styles.infoMenu}>
          <Menu.Item>
            {activeLog.name ? (
              <div>
                log: {activeLog.name}
                <br />
                <br />
                <p>
                  Current Location: <br /> {currentLocation.latitude}, {currentLocation.longitude}
                </p>
                <br />
                <Button.Group>

                  <Button positive onClick={this.props.startRecording}>start</Button>
                  <Button onClick={this.props.stopRecording}>stop</Button>
                </Button.Group>
                <br />
                <br />
                <a href='#' onClick={this.handleDeleteLog}>delete</a>{' '}
                <a href='#'>edit</a>
              </div>
            ) : (
              <div>No log selected</div>
            )
            }
          </Menu.Item>
          <NewLog onSave={this.props.handleAddNewLog}/>
          <Menu.Item>
            <LogFilter onChange={this.handleSearchChange} value={this.state.searchValue} />
          </Menu.Item>
        </Menu>
        <LogMenu activeItem={activeLog.id} logs={this.filteredLogs()} onClick={this.props.handleItemClick}/>
      </div>
    )
  }
}



MainMenu.propTypes = {
};

export default MainMenu;
