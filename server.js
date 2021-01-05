import express from 'express'

import webRoutes from './routes/web/webRoutes.js'

const app = express()

// Import Routes
app.use('/', webRoutes)


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`...Server started on port ${PORT}...`))
