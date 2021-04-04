require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')
const config = require('config')

// imports routes
const authRoutes = require('./routes/authRoute')
const dashboardRoutes = require('./routes/dashboardRoute')

// imports middleware
const { bindUserWrithRequest } = require('./middleware/authMiddleware')
const setLocals = require('./middleware/setLocals')

// playground routes
// const validatorRoute = require('./playground/validator')  // should be remove later

const MONGODB_URI = `mongodb+srv://${config.get('db-username')}:${config.get('db-password')}@cluster0.lsnb1.mongodb.net/NodePress?retryWrites=true&w=majority`
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 2
});

const app = express()

// setup view engine
app.set('view engine', 'ejs')
app.set('views', 'views')

// middleware array
const middleware = [
    express.static('public'),
    express.urlencoded({ extended:true }),
    express.json(),
    session({
        secret: config.get('secret'),
        resave: false,
        saveUninitialized: false,
        store: store
    }),
    bindUserWrithRequest(),
    setLocals(),
    flash()
]

app.use(middleware)

app.use('/auth', authRoutes)
app.use('/dashboard', dashboardRoutes)

// app.use('/playground', validatorRoute) // should be remove later

app.get('/', (req, res) => {
    res.json({
        message: 'hello JavaScript world'
    })
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