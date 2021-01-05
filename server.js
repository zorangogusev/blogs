import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import expressLayouts from 'express-ejs-layouts'

import webRoutes from './routes/webRoutes.js'

/** Load dotenv file witn enviromental data */
dotenv.config({ path: './config/config.env' })

const app = express()

/** Implement morgan */
if (process.env.NODE_ENV === 'development') 
    app.use(morgan('dev'))

/** Implement ejs */
app.use(expressLayouts)
app.set('view engine', 'ejs')

/** Import Routes */
app.use('/', webRoutes)


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`...Server started on port ${PORT}...`))
