import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CircleMarker, Map, Marker, Polyline, Popup, TileLayer} from 'react-leaflet'

// import '../../../node_modules/leaflet/dist/leaflet.css';
import styles from './MapContainer.css'

const position = [51.505, -0.09]

class MapContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      positions: []
    }
  }

  componentWillReceiveProps(nextProps) {
    let positions = nextProps.coords.map(position => {
      let {latitude, longitude} = position.coords
      return [latitude, longitude]
    })
    this.setState({positions})
  }

  // shouldComponentUpdate(nextProps) {
  //   return nextProps.coords !== this.props.coords;
  // }

  render() {
    console.log('rendering')

    return (
      <div className={styles.MapContainer}>
       <Map className={styles.Map} center={position} zoom={13}>
         <TileLayer
           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
           attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
         />
         <Polyline color="lime" positions={this.state.positions} />
         {this.state.positions.length &&
         <CircleMarker center={this.state.positions[0]} color="red" radius={8}>
           <Popup>
             <span>Start</span>
           </Popup>
         </CircleMarker>
         }
         {this.state.positions.length > 1 &&
         <CircleMarker center={this.state.positions.slice(-1)[0]} color="green" radius={8}>
           <Popup>
             <span>End</span>
           </Popup>
         </CircleMarker>
         }
       </Map>
      </div>
    );
  }
}

MapContainer.propTypes = {};

export default MapContainer;
