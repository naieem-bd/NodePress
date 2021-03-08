const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.json({
        message: 'hello JavaScript world'
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`)
})