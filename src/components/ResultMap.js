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

		this.map = null
		this.centerStart = [-39.208847057702286, 176.76727294921878]
	}
	componentDidMount() {
		this.getTracks(this.centerStart[0], this.centerStart[1])
	}
	latlngsForTrack(track) {
		return track.geometry.points.map(point => {
			return [point.y, point.x]
		})
	}

	getTracks(lat, lon) {
		agent.Tracks.getAll(lat, lon, 500)
		.then(res => {
			this.setState({
				tracks: res
			})
		})
	}

	onMoveEnd(e) {
		const center = e.target.getCenter()
		this.getTracks(center.lat, center.lng)
	}

	render() {
		return (
			<div >
				<MapContainer
					center={this.centerStart}
					zoom={9}
					style={{ height: `800px`, width: '100vw' }}
					whenCreated={map => {
						this.map = map
						map.on('moveend', event => this.onMoveEnd(event))
					}}
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
				<ul className="max-h-96 max-w-xl mx-auto mt-4 overflow-y-auto">
					{this.state.tracks.map((track, i) => (
						<li key={i}
							onClick={() => {
								this.map.flyTo(this.latlngsForTrack(track)[0], 12)
								window.scrollTo({
									top: 0,
									behavior: 'smooth'
								})
							}}
						>
							<div className="flex justify-between py-1 px-2 my-1 rounded shadow bg-white hover:bg-gray-100 cursor-pointer">
								<span className="capitalize">{track.description.toLowerCase()}</span>
								<div className="flex space-x-1">
									<span className="text-gray-600">{track.distance.toFixed(2)}km</span>
									<span>{track.status}</span>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultMap);