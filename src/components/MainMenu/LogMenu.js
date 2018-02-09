import React from 'react';
import PropTypes from 'prop-types';

import {Menu} from 'semantic-ui-react';

import styles from './LogMenu.css';

class LogMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cursor: 0
    }

    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleKeyPress(event) {
    if (event.key === 'Tab' && event.shiftKey) {
      const targetLog = this.props.logs[event.target.tabIndex-1] || this.props.logs[event.target.tabIndex]
      this.props.onClick(event, targetLog.id)
    } else if (event.key === 'Tab') {
      const targetLog = this.props.logs[event.target.tabIndex+1] || this.props.logs[event.target.tabIndex]
      this.props.onClick(event, targetLog.id)
    }
  }

  render() {
    const {activeItem, logs, onClick}= this.props
    return (
      <Menu fluid inverted vertical className={styles.LogMenu}>
        {
          logs.map((log, idx) => (
            <Menu.Item
              key={log.id} id={log.id} name={log.name} active={activeItem === log.id}
              onClick={(e, elem) => onClick(e, elem.id)}
              onKeyDown={this.handleKeyPress}
              tabIndex={idx}
            />
          ))
        }
      </Menu>
    )
  }
}



LogMenu.propTypes = {

};

export default LogMenu;

