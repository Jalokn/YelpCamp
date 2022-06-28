const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
const campgrounds = require('../controllers/campgrounds')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(upload.array('campground[image]'), (req, res) => {
        console.log(req.body, req.files)
        return res.send('it worked')
    })
// .post(validateCampground, isLoggedIn, catchAsync(campgrounds.createCampground))


router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))

    .put(validateCampground, isLoggedIn, isAuthor, catchAsync(campgrounds.updateCampground))

    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))


module.exports = router