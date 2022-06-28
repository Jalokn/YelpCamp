const mongoose = require('mongoose')
const Review = require('./review')

const CampgroundSchema = new mongoose.Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
    reviews: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Review'
        }
    ]
})


CampgroundSchema.post('findOneAndDelete', async (doc) => {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema)