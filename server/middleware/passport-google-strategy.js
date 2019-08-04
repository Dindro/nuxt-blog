const { OAuth2Strategy } = require('passport-google-oauth')

const keys = require('../keys')
const User = require('../models/user.model')

const options = {
	clientID: keys.GOOGLE.CLIENT_ID,
	clientSecret: keys.GOOGLE.CLIENT_SECRET,
	callbackURL: keys.GOOGLE.CALLBACK_URL
}

module.exports = new OAuth2Strategy(options, async (request, accessToken, refreshToken, profile, done) => {
	try {
		if (profile.emails[0].value == 'dindrophone@gmail.com') {

			const candidate = await User.findOne({ login: 'admin' })
			const isExist = !!candidate.google.id

			if (!isExist) {
				const $set = {
					google: {
						id: profile.id,
						name: profile.displayName
					}
				}
				User.findOneAndUpdate({ login: 'admin' }, $set);
			}

			const user = candidate._id;
			return done(null, user)
		} else {
			return done(null, false)
		}
	} catch (e) {
		console.error(e);
	}
})