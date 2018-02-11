import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react'

import styles from './UserDetail.css'




const UserDetail = ({isAuthenticated, user, handleLogout}) => {
  const handleChange = event => {
    if (event.target.innerHTML === 'logout') {
      handleLogout(event)
    }
  }
  const options = [
    {
      text: 'logout',
      value: 'logout',
    }
  ]
  return (
    <div className={styles.UserDetail}>
      {isAuthenticated ? (
        <Dropdown
          inline text={user.username} header={user.username}
          options={options} defaultValue='' onChange={handleChange}
        />
      ) : (
        <Link to='/login/'>login</Link>
      )}
    </div>
  );
};

UserDetail.propTypes = {
  user: PropTypes.object
};

export default UserDetail;
