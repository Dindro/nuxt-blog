export default function ({ store, redirect }) {

	// Если пользователь не залогинен
	if (!store.getters['auth/isAuthenticated']) {
		redirect('/admin/login?message=login')
	}
}