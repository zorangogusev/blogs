import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

import webRoutes from './routes/web/webRoutes.js'

/** Load dotenv file witn enviromental data */
dotenv.config({ path: './config/config.env' })

const app = express()

if (process.env.NODE_ENV === 'development') 
    app.use(morgan('dev'))

/** Import Routes */
app.use('/', webRoutes)



const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`...Server started on port ${PORT}...`))
