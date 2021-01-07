import { Strategy } from 'passport-local'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import passport from 'passport'

passport.use(new Strategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return done(null, false, { message: 'Credientials not correct' })
            } 

            bcrypt.compare(password, user.password, (err, isMatch) => {
                console.log('bcrypt-compare here')
                if (err) {
                    throw err
                }
                if (isMatch) {
                    return done(null, user)
                } else {
                    return done(null, false, { message: 'Credientials not correct' })
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
    })

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})
