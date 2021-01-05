import express from 'express'

const router = express.Router()

router.get('/', (req, res) => { res.send('Default Route') })
router.get('/about', (req, res) => { res.send('About Route') })
router.get('/login', (req, res) => { res.send('Login Route') })
router.get('/register', (req, res) => { res.send('Register Route') })

export default router
