const { model, Schema } = require('mongoose')

const userSchema = new Schema({
	login: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true,
		minLength: 6
	},
	google: {
		id: Number,
		name: String
	},
	facebook: {
		id: Number,
		name: String
	},
	vk: {
		id: Number,
		name: String
	}
})

module.exports = model('users', userSchema)