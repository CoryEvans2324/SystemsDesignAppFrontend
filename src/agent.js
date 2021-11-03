import superagentpromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentpromise(_superagent, global.Promise)

const API_ROOT  = 'http://localhost:8000'

// const encode = encodeURIComponent
const responseBody = res => res.body

let token = null
const tokenPlugin = req => {
	if (token) {
		req.set('Authorization', `${token}`)
	}
}

const requests = {
	get: url =>
		superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
	post: (url, body) =>
		superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
	put: (url, body) =>
		superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
}

const Auth = {
	current: () => requests.get('/user/me'),
	login: (username, password) =>
		requests.post('/user/signin', { username, password }),
	register: (username, password) =>
		requests.post('/user/create', { username, password }),
	save: user =>
		requests.put('/user', { user }),
	logout: () => requests.post('/user/signout')
}

const Profile = {
	get: username => 
		requests.get(`/profiles/${username}`),
}


const agent = {
	Profile,
	Auth,
	setToken: _token => {token = _token}
}

export default agent