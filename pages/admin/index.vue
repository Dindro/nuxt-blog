<template>
	<h1>Welcome to admin page</h1>
</template>

<script>
export default {
	// Название layout куда рендерить данную страницу
	layout: 'admin',
	middleware: ['admin-auth']
}
</script>
