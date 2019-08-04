const { Strategy } = require('passport-facebook')

const keys = require('../keys')
const User = require('../models/user.model')

const options = {
	clientID: keys.FACEBOOK.CLIENT_ID,
	clientSecret: keys.FACEBOOK.CLIENT_SECRET,
	callbackURL: keys.FACEBOOK.CALLBACK_URL,
	profileFields: ['id', 'emails', 'name'] 
}

module.exports = new Strategy(options, async (request, accessToken, refreshToken, profile, done) => {
	try {
		console.log(profile)
		if (profile.emails[0].value == 'dindrophone@gmail.com') {

			const candidate = await User.findOne({ login: 'admin' })
			const isExist = !!candidate.facebook.id
			console.log(isExist)
			if (!isExist) {
				const $set = {
					facebook: {
						id: profile.id,
						name: profile.name.familyName + ' '+ profile.name.givenName
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