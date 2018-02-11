import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import {CircleMarker, Map, Marker, Polyline, Popup, TileLayer, ZoomControl} from 'react-leaflet'

import styles from './MapContainer.css'

const viewCenter = [51.505, -0.09];
const zoom = 2;

class MapContainer extends Component {

  getPositions(log) {
    return log.positions && log.positions.map(position => {
      let {latitude, longitude} = position
      return [latitude, longitude]
    })
  }

  render() {
    const positions = this.getPositions(this.props.log) || []
    return (
      <div className={styles.MapContainer}>
       <Map className={styles.Map} center={viewCenter} zoom={zoom} zoomControl={false}>
         <TileLayer
           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
           attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
         />
         <Polyline color="lime" positions={positions} />
         {positions.length > 0 &&
         <CircleMarker center={positions[0]} color="red" radius={8}>
           <Popup>
             <span>Start</span>
           </Popup>
         </CircleMarker>
         }
         {positions.length > 1 &&
         <CircleMarker center={positions.slice(-1)[0]} color="green" radius={8}>
           <Popup>
             <span>End</span>
           </Popup>
         </CircleMarker>
         }
         <ZoomControl position="topright" />
       </Map>
      </div>
    );
  }
}

MapContainer.propTypes = {};

function getActiveLog(activeLogID, logs) {
  for (let log of logs) {
    if (log.id === activeLogID) {
      return log
    }
  }
}

const mapStateToProps = state => {
  return {
    log: getActiveLog(state.geoLogger.activeLogID, state.logs) || {}
  }
}

const Container = connect(mapStateToProps)(MapContainer)

export default Container;
