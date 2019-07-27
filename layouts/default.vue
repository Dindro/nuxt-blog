<template>
  <el-container>
    <el-header>
			<app-navigation></app-navigation>		
		</el-header>
    <el-main>
			<nuxt></nuxt>
		</el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
import AppNavigation from '@/components/main/Navigation'

export default {
	components: {
		AppNavigation
	}
}
</script>


<style>
</style>
