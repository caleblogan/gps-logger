import React from 'react';
import PropTypes from 'prop-types';

import {Menu} from 'semantic-ui-react';

import {Input} from 'semantic-ui-react';

const LogFilter = ({onChange, value}) => {
  return (
    <Menu.Item>
      <Input
        inverted transparent className='icon'
        icon='search' placeholder='Search Logs...'
        onChange={onChange}
        value={value}
      />
    </Menu.Item>
  );
};

LogFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default LogFilter;
