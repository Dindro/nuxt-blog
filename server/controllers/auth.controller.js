const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')

const keys = require('../keys')
const User = require('../models/user.model')

module.exports.login = async (req, res) => {
	const candidate = await User.findOne({ login: req.body.login })
	
	if (candidate) {
		const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password)

		if (isPasswordCorrect) {

			// В объект передаем поля которые хотим зашифровать
			// 2 параметр - секретный ключ
			// 3 параметр - время жизни токена (60 * 60) = 1 час
			const token = jwt.sign({
				login: candidate.login,
				userId: candidate._id
			}, keys.JWT, { expiresIn: 60 * 60 })

			res.json({ token })
		} else {
			res.status(401).json({ message: 'Пароль неверен' })
		}
	} else {
		res.status(404).json({ message: 'Пользователь не найден' })
	}
}

module.exports.createUser = async (req, res) => {
	const candidate = await User.findOne({ login: req.body.login })

	if (candidate) {
		res.status(409).json({ message: 'Такой login уже занят' })
	} else {
		const salt = bcrypt.genSaltSync(10)
		const user = new User({
			login: req.body.login,
			password: bcrypt.hashSync(req.body.password, salt)
		})

		await user.save()

		// Статус 201 - когда что то создается успешно
		// user - уже с уникальным id
		res.status(201).json(user)
	}
}