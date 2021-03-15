const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

// imports routes
const authRoute = require('./routes/authRoute')

// playground routes
const validatorRoute = require('./playground/validator')  // should be remove later

const app = express()

// setup view engine
app.set('view engine', 'ejs')
app.set('views', 'views')

// middleware array
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended:true }),
    express.json()
]

app.use(middleware)

app.use('/auth', authRoute)

app.use('/playground', validatorRoute) // should be remove later

app.get('/', (req, res) => {
    res.json({
        message: 'hello JavaScript world'
    })
})

const PORT = process.env.PORT || 2727
mongoose
    .connect('mongodb+srv://naieem:nai123456@cluster0.lsnb1.mongodb.net/NodePress?retryWrites=true&w=majority', {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('database connected')
        app.listen(PORT, () => {
            console.log(`server is running on PORT ${PORT}`)
        })
    })
    .catch(e => {
        return console.log(e)
    })