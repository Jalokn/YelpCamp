const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')
const mapBoxToken = process.env.MAPBOX_TOKEN
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const geocoder = mbxGeocoding({
    accessToken: 'pk.eyJ1IjoieWFjb2JpIiwiYSI6ImNsNTA0MGx4djJmNW4za29iaWE0ZXhkem0ifQ.0OMafQb1w7rY3ESBYxC8yQ'
})


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
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi omnis voluptatum vitae sequi rerum voluptatibus iure consequuntur dignissimos? In eum molestiae assumenda similique necessitatibus sequi perferendis odit animi sed exercitationem!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dwwvj2ejn/image/upload/v1656522173/YelpCamp/owj24fliqjvyahj3mepr.jpg',
                    filename: 'YelpCamp/owj24fliqjvyahj3mepr'
                },
                {
                    url: 'https://res.cloudinary.com/dwwvj2ejn/image/upload/v1656522172/YelpCamp/csiyijl0yep4zpjzvgis.jpg',
                    filename: 'YelpCamp/csiyijl0yep4zpjzvgis'
                },
                {
                    url: 'https://res.cloudinary.com/dwwvj2ejn/image/upload/v1656522172/YelpCamp/zlpmpucyuw59zcaku4sx.jpg',
                    filename: 'YelpCamp/zlpmpucyuw59zcaku4sx'
                },
            ]
        })
        const geoData = await geocoder.forwardGeocode({
            query: camp.location,
            limit: 1
        }).send()
        camp.geometry = geoData.body.features[0].geometry
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})