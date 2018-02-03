import React from 'react';
import PropTypes from 'prop-types';

import {Menu} from 'semantic-ui-react';

import styles from './LogMenu.css';

const LogMenu = props => {
  const activeItem = props.activeItem
  return (
    <Menu fluid inverted vertical className={styles.LogMenu}>
      {
        props.logs.map(log => (
          <Menu.Item key={log.id} id={log.id} name={log.name} active={activeItem === log.id} onClick={props.onClick}/>
        ))
      }
    </Menu>
  )
}

LogMenu.propTypes = {

};

export default LogMenu;

