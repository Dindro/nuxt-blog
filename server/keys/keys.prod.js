module.exports = {
	// process.env.ХХХХХХ - ХХХХХХХ будем брать передавая из консоли или из файла конфигурации

	MONGO_URI: process.env.MONGO_URI,
	JWT: process.env.JWT,
	GOOGLE: {
		CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		CALLBACK_URL: ''
	},
	FACEBOOK: {
		CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
		CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
		CALLBACK_URL: ''
	},
	VK: {
		CLIENT_ID: process.env.VK_CLIENT_ID,
		CLIENT_SECRET: process.env.VK_CLIENT_SECRET,
		CALLBACK_URL: ''
	}
}