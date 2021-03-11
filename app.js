const express = require('express')
const { set } = require('mongoose')
const morgan = require('morgan')

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

app.get('/', (req, res) => {
    res.render('pages/auth/signup', {title: 'Create a new account'})

    res.json({
        message: 'hello JavaScript world'
    })
})

const PORT = process.env.PORT || 2727
app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`)
})