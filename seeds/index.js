const mongoose = require('mongoose')
const Campground = require('c:/Users/Jacob/OneDrive/Documents/Coding/YelpCamp/models/campground.js')

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


const seedDB = async () => {
    const c = new Campground({ title: ' purple field' })
    await c.save()
    console.log(c)
}

seedDB()