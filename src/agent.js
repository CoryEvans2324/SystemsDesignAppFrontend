import superagentpromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentpromise(_superagent, global.Promise)

const API_ROOT  = 'http://localhost:8000'

const responseBody = res => res.body

const Admin = {
	uploadTracks: (f) =>
		superagent.post(`${API_ROOT}/tracks/upload`).attach('file', f).then(responseBody),
}

const Tracks = {
	get: (id) =>
		superagent.get(`${API_ROOT}/tracks/${id}`).then(responseBody),
	getAll: (lat, lon, limit = 1000) =>
		superagent.get(`${API_ROOT}/tracks/?lat=${lat}&lon=${lon}&limit=${limit}`).then(responseBody),
}

const agent = {
	Admin,
	Tracks
}

export default agent