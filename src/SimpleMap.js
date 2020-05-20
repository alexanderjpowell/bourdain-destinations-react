import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MAPS_API_KEY from './config';

const LegendStyle = {
	margin: 10,
	padding: 8,
	background: '#ededed'
};

const ChipStyle = {
	margin: 2,
	background: 'white'
};

class SimpleMap extends Component {

	constructor(props) {
		super(props);
		this.state = {
			markers: [],
			map: null,
			noReservations: true,
			theLayover: true,
			partsUnknown: true,
		};
	}

	handleApiLoaded = (map, maps) => {
		this.setState({ map: map });
		var legend = document.getElementById('legend');
		map.controls[maps.ControlPosition.BOTTOM_CENTER].push(legend);
		let url = "https://raw.githubusercontent.com/alexanderjpowell/bourdain-destinations-react/master/src/all.json";
		fetch(url).then(response => response.json()).then(json => {
			var marker;
			var markers = [];
			var infowindow = new maps.InfoWindow();
			for (let i = 0; i < json.length; i++) {
				let coords = json[i].coordinates.split(',');
				let position = { lat: parseFloat(coords[0]), lng: parseFloat(coords[1]) };
				marker = new maps.Marker({
					position: position,
					map,
					show: json[i].show,
				});
				maps.event.addListener(marker, 'click', (function(marker, i) {
					return function() {
						let showNameAndEpisode = json[i].show + ' Season ' + json[i].season + ', Episode ' + json[i].ep;
						let title = json[i].title;
						let state = (json[i].state === 'NA') ? '' : ', ' + json[i].state;
						let location = json[i].city_or_area + state + ', ' + json[i].country;
						let content = '<div><a href="' + json[i].source + '" target="_blank">' + showNameAndEpisode + ': ' + title + '</a></div>'
								+ '<div>' + location + '</div>';
						infowindow.setContent(content);
						infowindow.open(map, marker);
					}
				})(marker, i));
				markers.push(marker);
			}
			this.setState({ markers: markers });
		}).catch(error => {alert(error);});
	};

	static defaultProps = {
		center: {
			lat: 27.84,
			lng: 11.11
		},
		zoom: 1
	};

	handleNoReservationsClick = () => {
		if (this.state.noReservations) {
			for (let i = 0; i < this.state.markers.length; i++) {
				if (this.state.markers[i].show === 'No Reservations') {
					this.state.markers[i].setMap(null);
				}
			}
		} else {
			for (let i = 0; i < this.state.markers.length; i++) {
				if (this.state.markers[i].show === 'No Reservations') {
					this.state.markers[i].setMap(this.state.map);
				}
			}
		}
		this.setState({ noReservations: !this.state.noReservations });
	};

	handleTheLayoverClick = () => {
		if (this.state.theLayover) {
			for (let i = 0; i < this.state.markers.length; i++) {
				if (this.state.markers[i].show === 'The Layover') {
					this.state.markers[i].setMap(null);
				}
			}
		} else {
			for (let i = 0; i < this.state.markers.length; i++) {
				if (this.state.markers[i].show === 'The Layover') {
					this.state.markers[i].setMap(this.state.map);
				}
			}
		}
		this.setState({ theLayover: !this.state.theLayover });
	};

	handlePartsUnknownClick = () => {
		if (this.state.partsUnknown) {
			for (let i = 0; i < this.state.markers.length; i++) {
				if (this.state.markers[i].show === 'Parts Unknown') {
					this.state.markers[i].setMap(null);
				}
			}
		} else {
			for (let i = 0; i < this.state.markers.length; i++) {
				if (this.state.markers[i].show === 'Parts Unknown') {
					this.state.markers[i].setMap(this.state.map);
				}
			}
		}
		this.setState({ partsUnknown: !this.state.partsUnknown });
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
					onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
				>
				</GoogleMapReact>
				<div id="legend">
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Paper elevation={3} style={LegendStyle}>
								{/*<Chip label="A Cook's Tour" variant="outlined" style={ChipStyle} onClick={this.handleClick}/>*/}
								<Chip label="No Reservations" variant="outlined" style={ChipStyle} onClick={this.handleNoReservationsClick}/>
								<Chip label="The Layover" variant="outlined" style={ChipStyle} onClick={this.handleTheLayoverClick}/>
								<Chip label="Parts Unknown" variant="outlined" style={ChipStyle} onClick={this.handlePartsUnknownClick}/>
							</Paper>
						</Grid>
					</Grid>
				</div>
			</div>
		</div>
    );
  }
}

export default SimpleMap;