import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log(`...MongoDB connected: ${conn.connection.host}...`.cyan.underline.bold)
    } catch (err) {
        console.log(err)
        process.exit()
    }
}

export default connectDB
