import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Button from '@material-ui/core/Button';
import useSupercluster from "use-supercluster";
import RoomIcon from '@material-ui/icons/Room';
import MAPS_API_KEY from './config'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const handleApiLoaded = (map, maps) => {
	let url = "https://raw.githubusercontent.com/alexanderjpowell/bourdain-destinations-react/master/src/latlng.csv";
	fetch(url).then(response => response.text()).then(text => {
		let lines = text.split('\n');
		for (let i = 0; i < lines.length; i++) {
			let row = lines[i].replace(/['"]+/g, '');
			if (row !== 'NA') {
				let latlng = row.split(',');
				let lat = parseFloat(latlng[0]);
				let lng = parseFloat(latlng[1]);
				let position = { lat: lat, lng: lng };
				let marker = new maps.Marker({
					position: position,
					map,
					title: 'test'
				});
				var infowindow = new maps.InfoWindow({
					content: '<div><h3>Info</h3></div>'
				});
				marker.addListener('click', function() {
					infowindow.open(map, marker);
				});
			}
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
        </GoogleMapReact>
      </div>
    </div>
    );
  }
}

export default SimpleMap;
