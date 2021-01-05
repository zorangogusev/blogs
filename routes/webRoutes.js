import express from 'express'
import HomeController from '../controller/HomeController.js'

const router = express.Router()

router.get('/', HomeController.home)
router.get('/about', HomeController.about)
router.get('/login', HomeController.login)
router.get('/register', HomeController.register)

export default router
