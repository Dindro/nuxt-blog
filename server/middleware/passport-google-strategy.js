const { OAuth2Strategy } = require('passport-google-oauth')

const keys = require('../keys')
const User = require('../models/user.model')

const options = {
	clientID: keys.GOOGLE.CLIENT_ID,
	clientSecret: keys.GOOGLE.CLIENT_SECRET,
	callbackURL: keys.GOOGLE.CALLBACK_URL
}

// 2 параметр - функция которая проверяет, есть ли пользователь с таким токеном.
// (Функция async, потомучто будем делать запрос в БД и будем ожидать через await)
// 		1 парметр - payload хранит в себе данные зашифрованные в токен.
//		(В нашем случае - login, userId)
module.exports = new OAuth2Strategy(options, (request, accessToken, refreshToken, profile, done) => {
	try {
		// TODO: 
		//		Зарегистрировать пользователя в БД
		console.log('Google account', profile);
		
		return done(null, profile)

	} catch (e) {
		console.error(e);
	}
})