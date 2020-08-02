const express = require('express');
const router = express.Router();

const dbConnection = require('../db.js');

// Query All Equipment Objects
router.get("/", (req, res) => {
    let queryString = "SELECT * FROM Equipment";
    dbConnection.query(queryString, (error, rows, fields) => {
        if(error){
            res.sendStatus(404);
            return
        }
        res.json(rows);
    })
    console.log('Connected to /equipment');
});

// Query specific Equipment given ID
router.get("/:id", (req, res) => {
    let queryString = "SELECT * FROM Equipment WHERE equipment_id = ?";
    dbConnection.query(queryString, [req.params.id], (error, rows, fields) => {
        if(error){
            res.sendStatus(500);
            return
        }
        res.json(rows);
    })
    console.log(`Connected to /exercises/${req.params.id}`);
});

module.exports = router;