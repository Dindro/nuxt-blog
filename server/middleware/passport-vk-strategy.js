const { Strategy } = require('passport-vkontakte')

const keys = require('../keys')
const User = require('../models/user.model')

const options = {
	clientID: keys.VK.CLIENT_ID,
	clientSecret: keys.VK.CLIENT_SECRET,
	callbackURL: keys.VK.CALLBACK_URL,
}

module.exports = new Strategy(options, async (accessToken, refreshToken, params, profile, done) => {
	try {
		if (params.email == 'dindrophone@gmail.com') {

			const candidate = await User.findOne({ login: 'admin' })
			const isExist = !!candidate.vk.id

			if (!isExist) {
				const $set = {
					vk: {
						id: profile.id,
					}
				}
				await User.findOneAndUpdate({ login: 'admin' }, $set);
			}
			const user = candidate._id;
			console.log(user);
			return done(null, user)
		} else {
			return done(null, false)
		}
	} catch (e) {
		console.error(e);
	}
})