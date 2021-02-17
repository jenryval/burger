const burger = require('../models/burger');
const express = require('express');
 
const router = express.Router();


// GET method 
router.get('/', (req, res) => {
    burger.selectAll(function(data){
        let hbsObject = {
            burger: data
        };
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function (req, res) {
    burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, 0], function (result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
  });
  
  router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    burger.updateOne(
      {
        devoured: req.body.devoured
      },
      condition,
      function (result) {
        if (result.changedRows === 0) {
  
          return res.status(500).end();
        }
        res.status(200).end();
  
      }
    );
  });

module.exports = router