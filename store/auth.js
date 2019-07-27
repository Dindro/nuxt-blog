// Для парсинга
import Cookie from 'cookie'

// Для действий с куки
import Cookies from 'js-cookie'

import jwtDecode from 'jwt-decode'

export const state = () => ({
	token: null
})

export const mutations = {
	setToken(state, token) {
		state.token = token;
	},

	clearToken(state) {
		state.token = null;
	}
}

export const actions = {
	async login({ commit, dispatch }, formData) {
		try {
			const { token } = await this.$axios.$post('/api/auth/admin/login', formData)
			dispatch('setToken', token);
		} catch (e) {

			// root: true - передаем данные в store.index.js
			commit('setError', e, { root: true })
			throw e
		}
	},

	setToken({ commit }, token) {
		// Установка токена глобально
		this.$axios.setToken(token, 'Bearer')
		commit('setToken', token)
		Cookies.set('jwt-token', token)
	},

	logout({ commit }) {
		// Удаление токена глобально
		this.$axios.setToken(false)
		commit('clearToken');
		Cookies.remove('jwt-token')
	},

	async createUser({ commit }, formData) {
		try {
			await this.$axios.$post('/api/auth/admin/create', formData)
		} catch (e) {
			commit('setError', e, { root: true })
			throw e
		}
	},

	// Реализации поддержании сессии
	autoLogin({ dispatch }) {
		// Если находимся на клиенте
		const cookieStr = process.browser
			? document.cookie
			: this.app.context.req.headers.cookie

		const cookies = Cookie.parse(cookieStr || '') || {}
		const token = cookies['jwt-token']

		if (isJWTValid(token)) {
			dispatch('setToken', token)
		} else {
			dispatch('logout')
		}
	}
}

export const getters = {
	isAuthenticated: state => Boolean(state.token),
	token: state => state.token
}

function isJWTValid(token) {
	if (!token) {
		return false;
	}

	const jwtData = jwtDecode(token) || {}
	const expires = jwtData.exp || 0

	return (new Date().getTime() / 1000) < expires
}