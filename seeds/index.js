const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

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
const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 35) + 25

        const camp = new Campground({
            author: '62bb329d11c02d5cf825ee99',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi omnis voluptatum vitae sequi rerum voluptatibus iure consequuntur dignissimos? In eum molestiae assumenda similique necessitatibus sequi perferendis odit animi sed exercitationem!',
            price
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})