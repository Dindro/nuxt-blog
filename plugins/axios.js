// Плагин вызывается на сервере, клиенте

export default function ({ $axios, redirect, store }) {
	// Запишем токен в headers
	// interceptors - позволяют перехватывать запросы и что то делать
	$axios.interceptors.request.use(request => {
		if (store.getters['auth/isAuthenticated'] && !request.headers.common['Authorization']) {
			const token = store.getters['auth/token']
			request.headers.common['Authorization'] = `Bearer ${token}`;
		}
		
		return request;
	})

	// Обработка ошибки
	$axios.onError(error => {
		if (error.message) {

			// Ошибка авторизации
			if (error.response.status === 401) {
				redirect('/admin/login?message=session')
				store.dispatch('auth/logout')
			}

			if (error.response.status === 500) {
				console.error('Server 500 error')
			}
		}
	})
}