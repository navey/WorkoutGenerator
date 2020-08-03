const express = require('express');
const router = express.Router();

const dbConnection = require('../db.js');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : false}));

// GET

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
    console.log('Connected to /exercises');
});

// Query Exercises from specific Muscle Group
router.get("/search", (req, res) => {
    let queryString = "SELECT * FROM Exercise WHERE muscle_group = ? ";
    dbConnection.query(queryString, [req.query.muscleGroup], (error, rows, fields) => {
        if(error){
            res.sendStatus(500);
            return
        }
        res.json(rows);
    })
    console.log(`Connected to /exercises/${req.query.muscleGroup}`);
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
    console.log(`Connected to /exercises/${[req.params.id]}`);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// POST

// Insert new exercise into database
router.post("/create_exercise", (req, res) => {
    console.log("Exercise Name: " + req.body.exerciseName);
    console.log("Muscle Group: " + req.body.muscleGroup);
    console.log("First Equipment: " + req.body.equipFirst);
    console.log("Second Equipment: " + req.body.equipSecond);
    console.log("Third Equipment: " + req.body.equipThird);
    
    res.end();
});

module.exports = router;