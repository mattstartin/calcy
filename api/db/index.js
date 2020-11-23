const mongoose = require('mongoose')

mongoose
    .connect('SOME_MONGO_CONNECTION', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db