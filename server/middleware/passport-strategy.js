const { Strategy, ExtractJwt } = require('passport-jwt')
// Модель для того чтобы получить модель пользователя
// (если конечно они зарегистрированы)
// const { model } = require('mongoose')

const keys = require('../keys')
// const User = model('users')
const User = require('../models/user.model')

const options = {
	// fromAuthHeaderAsBearerToken() - позволяет считать с фронтенда
	// токен с header
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: keys.JWT
}

// payload - хранит в себе данные пользователя
module.exports = new Strategy(options, async (payload, done) => {
	try {
		
		// payload.userId - id пользователя зашифровали под свойством userId
		const candidate = await User.findById(payload.userId).select('id')

		if(candidate) {
			done(null, candidate)
		} else {
			done(null, false)
		}
	} catch (e) {
		console.error(e);
	}
})