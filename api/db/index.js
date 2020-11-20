const mongoose = require('mongoose')

mongoose
    .connect('mongodb://nextgen:G0ldThund3r!@ds123796.mlab.com:23796/osnextgendb', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db