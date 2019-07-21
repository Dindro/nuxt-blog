export const state = () => ({
	token: true
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
			const token = await new Promise((resolve, reject) => {
				setTimeout(() => resolve('mock-token'), 2000)
			})

			dispatch('setToken', token);
		} catch (e) {

			// root: true - передаем данные в store.index.js
			commit('setError', e, { root: true })
			throw e
		}
	},

	setToken({ commit }, token) {
		commit('setToken', token)
	},

	logout({ commit }) {
		commit('clearToken');
	},

	async createUser({ commit }, formData) {
		try {
			console.log("create")
		} catch (e) {

		}
	}
}

export const getters = {
	isAuthenticated: state => Boolean(state.token)
}