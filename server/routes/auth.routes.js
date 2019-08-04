const { Router } = require('express')
const passport = require('passport')
const { login, createUser, loginSocial } = require('../controllers/auth.controller')

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

// Роутеры для авторизации соц сетей
router.get(
	'/google/start',
	passport.authenticate('google', { session: false, scope: ['openid', 'profile', 'email'] })
);
router.get(
	'/google/redirect',
	passport.authenticate('google', { session: false }),
	loginSocial
);

router.get(
	'/facebook/start',
	passport.authenticate('facebook', { session: false, scope:'email' })
);
router.get(
	'/facebook/redirect',
	passport.authenticate('facebook', { session: false }),
	loginSocial
);

router.get(
	'/vk/start',
	passport.authenticate('vkontakte', { session: false, scope:'email' })
);
router.get(
	'/vk/redirect',
	passport.authenticate('vkontakte', { session: false }),
	loginSocial
);

module.exports = router