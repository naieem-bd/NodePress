require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const setMiddleware = require('./middleware/middleware')
const setRoutes = require('./routes/routes')

// playground routes
// const validatorRoute = require('./playground/validator')  // should be remove later

const MONGODB_URI = `mongodb+srv://${config.get('db-username')}:${config.get('db-password')}@cluster0.lsnb1.mongodb.net/NodePress?retryWrites=true&w=majority`

const app = express()

// setup view engine
app.set('view engine', 'ejs')
app.set('views', 'views')

// using middleware from middleware directory
setMiddleware(app)

// using routes from route directory
setRoutes(app)

app.use((req, res, next) => {
    let error = new Error('404 Page Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    if(error.status === 404) {
        return res.render('pages/error/404', { flashMessage: {} })
    }
    console.log(error)
    res.render('pages/error/500', { flashMessage: {} })
})

const PORT = process.env.PORT || 2727
mongoose
    .connect(MONGODB_URI, {
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