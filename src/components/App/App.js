import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Grid} from 'semantic-ui-react';

import styles from './App.css';
import MainMenu from "../MainMenu/MainMenu";
import MapContainer from "../MapContainer/MapContainer";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: true,
      activeItem: 'home',
      logs: [
        {id: 0, name: 'log 0'},
        {id: 1, name: 'log 1'},
        {id: 2, name: 'log 2'},
      ]
    }

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleAddNewLog = this.handleAddNewLog.bind(this);
  }

  handleItemClick(e, info) {
    console.log(info)
    this.setState({ activeItem: info.id})
  }

  handleAddNewLog(log) {
    this.setState(prevState => ({
      logs: [
        ...prevState.logs,
        {
          id: Math.floor(Math.random() * 20000),
          name: log
        }
      ]
    }))
  }

  render() {
    const {isMenuOpen} = this.state
    return (
      <Grid className={styles.Grid}>
        <Grid.Row className={styles.Row}>
          {
            isMenuOpen &&
            <Grid.Column width={4} className={styles.Col}>
              <MainMenu
                activeItem={this.state.activeItem}
                logs={this.state.logs}
                handleItemClick={this.handleItemClick}
                handleAddNewLog={this.handleAddNewLog}
              />
            </Grid.Column>
          }
          <Grid.Column width={isMenuOpen ? 12 : 16} className={styles.Col}>
            <MapContainer/>
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
