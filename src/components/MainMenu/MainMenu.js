import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styles from './MainMenu.css';

import {Menu, Icon, Modal} from 'semantic-ui-react';
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
    console.log(event.target.value)
  }

  filteredLogs() {
    const searchValue = this.state.searchValue.toLowerCase().trim()
    return this.props.logs.filter(log => (
      log.name.toLowerCase().includes(searchValue)
    ))
  }

  render() {
    const { activeItem } = this.props

    return (
      <div className={styles.Menu}>
        <Menu fluid inverted vertical className={styles.infoMenu}>
          <Menu.Item>
            hello there
            <br/>
            <br/>
            <br/>
            <br/>
            Nice
          </Menu.Item>
          <Menu.Item>
            <LogFilter onChange={this.handleSearchChange} value={this.state.searchValue} />
          </Menu.Item>
          <NewLog onSave={this.props.handleAddNewLog}/>
        </Menu>
        <LogMenu activeItem={activeItem} logs={this.filteredLogs()} onClick={this.props.handleItemClick}/>
      </div>
    )
  }
}

MainMenu.propTypes = {

};

export default MainMenu;
