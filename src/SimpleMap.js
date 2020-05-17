import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Button from '@material-ui/core/Button';
import useSupercluster from "use-supercluster";
import RoomIcon from '@material-ui/icons/Room';
import MAPS_API_KEY from './config'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const handleApiLoaded = (map, maps) => {
	let url = 'https://raw.githubusercontent.com/underthecurve/bourdain-travel-places/master/bourdain_travel_places.csv';
	fetch(url).then(response => response.text()).then(text => {
		//alert(data.toString());
		let lines = text.split('\n');
		//alert(lines.length);
		for (let i = 1; i < 3; i++) {
			//let rows = lines[i].split(',');
			var rows = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
			//rows = rows || [];
			//alert(rows);
		}
	});
};

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 27.84,
      lng: 11.11
    },
    zoom: 3
  };

  render() {
    return (
    <div>
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{key: MAPS_API_KEY.key }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
        <RoomIcon lat={59.955413} lng={30.337844}/>
        <RoomIcon lat={27.84} lng={11.11}/>
        </GoogleMapReact>
      </div>
    </div>
    );
  }
}

export default SimpleMap;
