import React from 'react';
import PropTypes from 'prop-types';

import styles from './ErrorBox.css';

const ErrorBox = ({children}) => {
  return (
    <div className={styles.ErrorBox}>
      {children}
    </div>
  );
};

ErrorBox.propTypes = {

};

export default ErrorBox;
