const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require("multer");

const Travel = require('../models/Travel');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });


router.get('/', (req, res, next) => {
  Travel.find().exec().then(docs => {
    const response = {
        count: docs.length
    }
    res.status(200).json(docs);
    
  })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

router.post('/', upload.array("image", 10), (req, res, next) => {

    console.log("BODY:", req.body);
    console.log("FILE:", req.files);
    const imagePaths = req.files.map(
        file => `/uploads/${file.filename}`
    );
    if (!req.files) {
        return res.status(400).json({
            message: "No image uploaded"
        });
    }

    const travel = new Travel({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        country: req.body.country,
        date: req.body.date,
        description: req.body.description,
        image: imagePaths
    });
    travel.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling POST requests to /Travels',
            CreatedTravel: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.get('/:travelId', (req, res, next) => {
    const id = req.params.travelId;
    Travel.findById(id).exec().then(doc => {
        console.log("From database", doc);
        if(doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'No valid entry found for provided ID'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

router.patch('/:travelId', upload.array("image", 10), async(req, res, next) => {
    console.log("PATCH ROUTE REACHED");
    try {
            console.log("BODY:", req.body);
            console.log("FILES:", req.files);
            const updateData = {
                title: req.body.title,
                country: req.body.country,
                date: req.body.date,
                description: req.body.description
            };

            if (req.files && req.files.length > 0) {
                updateData.image = req.files.map(
                    file => `/uploads/${file.filename}`
                );
            }

            const updatedTravel = await Travel.findByIdAndUpdate(
                req.params.travelId,
                updateData,
                { new: true }
            );

            if (!updatedTravel) {
                return res.status(404).json({
                    message: "Travel not found"
                });
            }

            res.status(200).json({
                message: "Travel updated",
                updatedTravel
            });

        } catch (err) {
            console.error(err);

            res.status(500).json({
                error: err.message
            });
        }
    /*const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Travel.updateOne({ _id: id}, { $set: updateOps}).exec().then(result => {
        console.log(result);
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });*/
});

router.delete('/:travelId', (req, res, next) => {
    const id = req.params.travelId;
    Travel.deleteOne({ _id: id}).exec().then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});
module.exports = router;