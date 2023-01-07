const multer = require('multer')

const fileStorageEngine = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({ storage: fileStorageEngine })

module.exports = upload