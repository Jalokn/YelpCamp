const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const app = express()


const Campground = require('./models/campground')
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedtopology: true,
})
    .then(() => {
        console.log('connection open')
    })
    .catch((err) => {
        console.log(err)
    })

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({ title: 'My Backyard', description: 'Cheap Camping' })
    await camp.save()
    res.send(camp)
})



app.listen(3000, () => {
    console.log('Listening')
})