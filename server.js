import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import expressLayouts from 'express-ejs-layouts'

import webRoutes from './routes/webRoutes.js'

/** Load dotenv file with enviromental data */
dotenv.config({ path: './config/config.env' })

const app = express()

/** Implement morgan */
if (process.env.NODE_ENV === 'development') 
    app.use(morgan('dev'))

/** Implement ejs */
app.use(expressLayouts)
app.set('view engine', 'ejs')

/** Load assets */
app.use('/css', express.static(path.resolve('assets/css')))
app.use('/js', express.static(path.resolve('assets/js')))
app.use('/bootstrap', express.static(path.resolve('assets/bootstrap')))
app.use('/fontawesome', express.static(path.resolve('assets/fontawesome')))

/** Import Routes */
app.use('/', webRoutes)

/** Create Server */
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`...Server started on port ${PORT}...`.yellow.bold))
