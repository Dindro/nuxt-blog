const {Schema, model} = require('mongoose')

const postSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	date: {
		type: Date,

		// Date.now - здесь не вызываем, она сама будет вызыватся в момент создания поста
		default: Date.now
	},
	views: {
		type: Number,
		default: 0
	},
	imageUrl: String,
	
	// Массив из idшников
	comments: [
		{
			type: Schema.Types.ObjectId,
			
			// Связывание с схемой
			ref: 'comments'
		}
	]
})

module.exports = model('posts', postSchema)