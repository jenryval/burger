const burger = require('../models/burger');
const express = require('express');
 
const router = express.Router();


// GET method 
router.get('/', (req, res) => {
    burger.all(function(data){
        let food = {
            burger: data
        };
        res.render("index", food);
    });
});

// POST method
router.post('/api/burger', (req,res) => {
    burger.create()
})



// UPDATE method



module.exports = router