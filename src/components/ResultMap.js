import React from "react";
import { connect } from "react-redux";
import { MapContainer, TileLayer, Popup, Polyline } from 'react-leaflet'
import agent from "../agent";

const mapDispatchToProps = dispatch => ({})
const mapStateToProps = state => ({})

class ResultMap extends React.Component {
	constructor() {
		super()
		this.state = {
			tracks: []
		}
	}
	componentDidMount() {
		agent.Tracks.getAll()
			.then(res => {
				this.setState({
					tracks: res
				})
			})
	}
	latlngsForTrack(track) {
		return track.geometry.points.map(point => {
			return [point.y, point.x]
		})
	}
	render() {
		return (
			<div>
				<MapContainer
					center={[-39, 175]}
					zoom={6}
					style={{ height: '100vh', width: '100vw' }}
				>
					<TileLayer
						url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					/>
					{this.state.tracks.map(track =>
						<Polyline
							key={track.ID}
							color="red"
							positions={this.latlngsForTrack(track)}
							smoothFactor={1}
							opacity={0.5}
							weight={4}
						>
							<Popup>
								{track.description}
							</Popup>
						</Polyline>
					)}
				</MapContainer>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultMap);