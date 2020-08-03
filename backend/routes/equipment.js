const express = require('express');
const router = express.Router();

const dbConnection = require('../db.js');
const bodyParser = require('body-parser');
const { query } = require('express');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : false}));

//GET

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
            return;
        }
        res.json(rows);
    })
    console.log(`Connected to /exercises/${req.params.id}`);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// POST

// Insert new equipment into database
router.post("/create_equipment", (req, res) => {
    let queryString = "INSERT INTO Equipment (equipment_name) VALUES (?);";
    dbConnection.query(queryString, [req.body.equipmentName], (error) => {
        if(error){
            res.sendStatus(500);
            return;
        }
        else{
            console.log(req.body.equipmentName + " was added to the Database");
        }
    });

    res.end();
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Delete

// Delete equipment from database
router.delete("/delete_equipment/:id", (req, res) => {
    let queryString = "DELETE FROM Equipment WHERE equipment_id = ?";
    dbConnection.query(queryString, [req.params.id], (error) => {
        if(error){
            res.sendStatus(500);
            return;
        }
        else{
            console.log(req.params.id + " was deleted from the Database");
        }
    });
    
    res.end();
});

module.exports = router;