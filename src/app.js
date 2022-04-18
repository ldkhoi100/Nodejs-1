const axios = require('axios')
const hbs = require('hbs')
const express = require('express')
const chalk = require('chalk')
const path = require('path')
const geocode = require('../../weather-app/utils/geocode')
const forecast = require('../../weather-app/utils/forecast')

const app = express()

// Define paths for ExpresscConfig
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../views')
const partialPath = path.join(__dirname, '../views/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath) // Đăng ký template partial dùng mọi nơi

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Page',
        name: 'Khoi'
    })
})

app.get('/helper', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Khoi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Khoi'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    let address = req.query.address

    geocode.geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) return res.send({error})

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) return res.send({error})
            return res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address,
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: "You must provide a search term"
        })
    }

    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.send("Help article not found")
})

app.get('*', (req, res) => {
    res.render('errors/404', {
        title: '404 Page',
        errorMessage: "Page not found "
    })
})

app.listen(3000, () => console.log(chalk.bgGreen('Server is up on port 3000')))
