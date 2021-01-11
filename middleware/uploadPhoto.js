import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: './assets/photos/blog-photos/',
    filename: function(req, file, callback) {
        console.log('here 1')
        req.body.photo = (file.fieldname) ? Date.now()  + '-' + file.originalname : 'no-image'
        callback(null, req.body.photo)
    }
})

/**
 * size limit of upload photo is 1000000 Bytes - 1 MB 
 */
export const uploadPhoto = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, callback) {
        checkFileType(req, file, callback)
    }
}).single('photo')

function checkFileType(req, file, callback) {
    /** Allowed ext */
    const filetypes = /jpeg|jpg|png|gif/
    /** Check ext */
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    /** Check mime */
    const mimetype = filetypes.test(file.mimetype)
   
    if(mimetype && extname) {
        return callback(null, true)
    } else {
        req.fileValidationError = 'Error, Please upload only images';
        callback()
    }
}
