import React from 'react';
import PropTypes from 'prop-types';

import {Menu, Button} from 'semantic-ui-react';


const LogInfo = ({
  log,
  currentLocation,
  startRecording,
  stopRecording,
  onDeleteLog,
  onEditLog
}) => {
  return (
    <Menu.Item>
    {log && log.name ? (
      <div>
        log: {log.name}
        <br />
        <br />
        <p>
          Current Location: <br /> {currentLocation.latitude}, {currentLocation.longitude}
        </p>
        <br />
        <Button.Group>
          <Button positive onClick={startRecording}>start</Button>
          <Button onClick={stopRecording}>stop</Button>
        </Button.Group>
        {/*<br />*/}
        {/*<br />*/}
        {/*<a href='#' onClick={onDeleteLog}>delete</a>{' '}*/}
        {/*<a href='#' onClick={onEditLog}>edit</a>*/}
      </div>
    ) : (
      <div>No log selected</div>
    )
    }
    </Menu.Item>
  )
}

LogInfo.propTypes = {

};

export default LogInfo;
