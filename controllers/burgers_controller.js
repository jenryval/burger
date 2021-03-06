const burger = require('../models/burger.js');
const express = require('express');
 
const router = express.Router();


router.get("/", function (req, res) {
  burger.selectAll(function (data) {
    const food = {
      burgers: data
    };
    // console.log(hbsObject);
    res.render("index", food);
  });
});

router.post("/api/burgers", function (req, res) {
  // console.log(req.body)
  burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, 0], function (result) {
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function (req, res) {
  const condition = "id = " + req.params.id;

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

module.exports = router;