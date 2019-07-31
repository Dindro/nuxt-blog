const { Strategy, ExtractJwt } = require('passport-jwt')

const keys = require('../keys')
const User = require('../models/user.model')

const options = {
	// jwtFromRequest - каким образом будем считывать JWT токен
	//   	fromAuthHeaderAsBearerToken() - позволяет считать с фронтенда токен с header
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

	// Секретный ключ который передавали для генерации токена
	secretOrKey: keys.JWT
}

// 2 параметр - функция которая проверяет, есть ли пользователь с таким токеном.
// (Функция async, потомучто будем делать запрос в БД и будем ожидать через await)
// 		1 парметр - payload хранит в себе данные зашифрованные в токен.
//		(В нашем случае - login, userId)
module.exports = new Strategy(options, async (payload, done) => {
	try {
		
		// payload.userId - id пользователя зашифровали под свойством userId
		// select('id') - забираем только ID
		const candidate = await User.findById(payload.userId).select('id')

		if(candidate) {
			// Токен валидный
			done(null, candidate)
		} else {
			// false - значит что запрещаем вход для необходимого роута
			done(null, false)
		}
	} catch (e) {
		console.error(e);
	}
})