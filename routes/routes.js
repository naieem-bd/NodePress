const authRoute = require('./authRoute')
const dashboardRoute = require('./dashboardRoute')
const playgroundRoute = require('../playground/play')
const uploadRoute = require('./uploadRoutes')
const postRoute = require('./postRoute')
const exploreRoute = require('./exploreRoute')
const searchRoute = require('./searchRoute')

const apiRoutes = require('../api/routes/apiRoutes')

const routes = [
    {
        path: '/auth',
        handler: authRoute
    },
    {
        path: '/dashboard',
        handler: dashboardRoute
    },
    {
        path: '/uploads',
        handler: uploadRoute
    },
    {
        path: '/posts',
        handler: postRoute
    },
    {
        path: '/explorer',
        handler: exploreRoute
    },
    {
        path: '/search',
        handler: searchRoute
    },
    {
        path: '/api',
        handler: apiRoutes
    },
    {
        path: '/playground',
        handler: playgroundRoute
    },
    {
        path: '/',
        handler: (req, res) => {
            res.json({
                message: 'hello JavaScript world'
            })
        }
    }
]

module.exports = app => {
    routes.forEach(r => {
        if(r.path === '/') {
            app.get(r.path, r.handler)
        } else {
            app.use(r.path, r.handler)
        }
    })
}