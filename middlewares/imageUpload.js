const multer = require('multer')

const fileStorageEngine = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const memoryStorage = multer.memoryStorage()

const upload = multer({ storage: memoryStorage })

module.exports = upload