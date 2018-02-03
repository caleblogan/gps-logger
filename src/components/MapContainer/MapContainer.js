import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

// import '../../../node_modules/leaflet/dist/leaflet.css';
import styles from './MapContainer.css'

const position = [51.505, -0.09]

class MapContainer extends Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className={styles.MapContainer}>
       {/*<div id="map" style={{width: '100%', height: '100vh'}}/>*/}
       <Map className={styles.Map} center={position} zoom={13}>
         <TileLayer
           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
           attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
         />
         <Marker position={position}>
          <Popup>
            <span>
              A pretty CSS3 popup. <br /> Easily customizable.
            </span>
          </Popup>
        </Marker>
       </Map>
      </div>
    );
  }
}

MapContainer.propTypes = {};

export default MapContainer;
