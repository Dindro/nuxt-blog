module.exports = {
	MONGO_URI: `mongodb+srv://dindro:qwertypass@cluster0-sgbea.mongodb.net/test?retryWrites=true&w=majority`,
	JWT: 'dev-jwt-key',
	GOOGLE: {
		CLIENT_ID: '373534940251-3r0qjeu1kr3e7ol0spg0mjbr3jquf836.apps.googleusercontent.com',
		CLIENT_SECRET: 'C3XM8LDWMZ9aepnr5gABv9_i',
		CALLBACK_URL: 'http://localhost:3000/api/auth/google/redirect'
	},
	FACEBOOK: {
		CLIENT_ID: '2105357266432527',
		CLIENT_SECRET: 'add445c05c870e4a3f285daea6abb856',
		CALLBACK_URL: 'http://localhost:3000/api/auth/facebook/redirect'
	}
}