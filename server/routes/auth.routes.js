const { Router } = require('express')
const passport = require('passport')
const { login, createUser } = require('../controllers/auth.controller')

const router = Router()

// /api/auth/admin/login
router.post('/admin/login', login)

// /api/auth/admin/create
router.post(
	'/admin/create',
	
	// Проверяется на наличии и валидности токена
	// 		1 параметр - стратегия к которой относитя
	// 		2 параметр - { session: false } отключаем поддержку сессии
	passport.authenticate('jwt', { session: false }),
	createUser
)

module.exports = router