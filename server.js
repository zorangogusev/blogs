import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import expressLayouts from 'express-ejs-layouts'
import mongoose from 'mongoose'
import connectDB from './database/connection.js'
import session from 'express-session'
import flash from 'connect-flash'
import passport from 'passport'

import webRoutes from './routes/webRoutes.js'

/** Load dotenv file with enviromental data */
dotenv.config({ path: './config/config.env' })

/** Connect to database */
connectDB()

/** Implement express framework */
const app = express()

/** Passport config */
import './library/passport.js'

/** Implement morgan */
if (process.env.NODE_ENV === 'development') 
    app.use(morgan('dev'))

/** Implement ejs */
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('layout', 'layout');
/** Body parser */
app.use(express.urlencoded({ extended: false }))

/** Implement Express Session */
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }))

/** Passport Middleware */
app.use(passport.initialize());
app.use(passport.session());

/** Implement Connect Flash */
app.use(flash())

/** Create Global Vars */
app.use((req, res, next) => {
    res.locals.success_message = req.flash('success_message')
    res.locals.error = req.flash('error');
    next()
})

/** Load assets */
app.use('/css', express.static(path.resolve('assets/css')))
app.use('/js', express.static(path.resolve('assets/js')))
app.use('/bootstrap', express.static(path.resolve('assets/bootstrap')))
app.use('/fontawesome', express.static(path.resolve('assets/fontawesome')))

/** Import Routes */
app.use('/', webRoutes)
app.use('/bloger', webRoutes)

/** Create Server */
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`...Server started on port ${PORT}...`.yellow.bold))
