const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')

const keys = require('../keys')
const User = require('../models/user.model')

module.exports.login = async (req, res) => {
	const candidate = await User.findOne({ login: req.body.login })

	if (candidate) {
		// 1 параметр - незашифрованный пароль
		const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password)

		if (isPasswordCorrect) {

			// Генерируем токен
			// 1 параметр - передаем поля которые хотим зашифровать, в данном случае login, userId
			// 2 параметр - секретный ключ
			// 3 параметр - время жизни токена (60 * 60) = 1 час
			const token = jwt.sign({
				login: candidate.login,
				userId: candidate._id
			}, keys.JWT, { expiresIn: 60 * 60 })

			// Отправляем токен пользователю
			res.json({ token })
		} else {
			// 401 - ошибка авторизации
			res.status(401).json({ message: 'Пароль неверен' })
		}
	} else {
		// 404 - ошибка "что то не найдено"
		res.status(404).json({ message: 'Пользователь не найден' })
	}
}

module.exports.createUser = async (req, res) => {
	const candidate = await User.findOne({ login: req.body.login })

	// Проверка на наличия пользователя
	if (candidate) {
		res.status(409).json({ message: 'Такой login уже занят' })
	} else {

		// Создаем соль
		const salt = bcrypt.genSaltSync(10)

		const user = new User({
			login: req.body.login,

			// Зашифруем пароль
			password: bcrypt.hashSync(req.body.password, salt)
		})

		// Сохраняем в базе
		await user.save()

		// Статус 201 - когда что то создается успешно
		// user - уже с уникальным id
		res.status(201).json(user)
	}
}

module.exports.loginSocial = (req, res) => {
	// Генерируем токен
	const token = jwt.sign({
		userId: req.user
	}, keys.JWT, { expiresIn: 60 * 60 })

	// Прописываем токен в куки
	res.cookie('jwt-token', token);
	res.redirect('/admin');
}