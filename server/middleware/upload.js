const path = require('path')

// Для работы с файлами
const multer = require('multer')

// Для работы с датами
const moment = require('moment')

const storage = multer.diskStorage({
	// Описываем куда положить файл когда он загрузится
	destination(req, file, cb) {
		cb(null, path.resolve(__dirname, '../../', 'static'))
	},
	filename(req, file, cb) {
		// 2 параметр - название файла как будет сохранять (SSS - мс)
		cb(null, `${file.originalname}-${moment().format('DDMMYYYY-HHmmss_SSS')}`)
	}
})

// Валидация файла
const fileFilter = (req, file, cb) => {
	if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
		cb(null, true)
	} else {
		null, false
	}
}

module.exports = multer({
	storage,
	fileFilter,
	limits: {
		// 5мб
		fileSize: 1024 * 1024 * 5
	}
})