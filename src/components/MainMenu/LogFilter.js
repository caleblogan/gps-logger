import React from 'react';
import PropTypes from 'prop-types';

import {Input} from 'semantic-ui-react';

const LogFilter = ({onChange, value}) => {
  return (
    <Input
      inverted transparent className='icon'
      icon='search' placeholder='Search Logs...'
      onChange={onChange}
      value={value}
    />
  );
};

LogFilter.propTypes = {
  onChange: PropTypes.func,
};

export default LogFilter;
