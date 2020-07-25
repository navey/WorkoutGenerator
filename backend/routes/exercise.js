const express = require('express');
const router = express.Router();

const dbConnection = require('../db.js');

// Query All Exercise Objects
router.get("/", (req, res) => {
    let queryString = "SELECT * FROM Exercise";
    dbConnection.query(queryString, (error, rows, fields) => {
        if(error){
            res.sendStatus(404);
            return
        }
        res.json(rows);
    })
});

// Query specific Exercise given ID
router.get("/:id", (req, res) => {
    let queryString = "SELECT * FROM Exercise WHERE exercise_id = ?";
    dbConnection.query(queryString, [req.params.id], (error, rows, fields) => {
        if(error){
            res.sendStatus(500);
            return
        }
        res.json(rows);
    })
});

module.exports = router;