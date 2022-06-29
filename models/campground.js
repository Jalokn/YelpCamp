const mongoose = require('mongoose')
const Review = require('./review')

const ImageSchema = new mongoose.Schema({
    url: String,
    filename: String,
})
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
})
const CampgroundSchema = new mongoose.Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],

        },
    },
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