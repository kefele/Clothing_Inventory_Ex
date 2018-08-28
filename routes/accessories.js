"use strict"
//include express in app
const express = require("express");
const accessories = express.Router();
//create array with an object
const accessoriesList = [{
    type: "Belt",
    size: "large",
    price: 30,
    id: 0

},];
//set idCount to length of array
let idCount = accessoriesList.length;
// getter that sends array
accessories.get("/accessories", (req, res) => {
    res.send(accessoriesList);
});

accessories.post("/accessories", (req, res) => {
    accessoriesList.push({
        type: req.body.type,
        size: req.body.size,
        price: req.body.price,
        id: idCount++
    });
    res.send(accessoriesList);
});
accessories.put("/accessories/:id", (req, res) => {
    let count = 0;
    for (let accessory of accessoriesList) {
        if (accessory.id == req.params.id) {
            let updatedAcc = {
                type: req.body.type,
                size: req.body.size,
                price: req.body.price,
                id: Number(req.params.id)
            }
            accessoriesList.splice(count, 1, updatedAcc);
        }
        count++;
    }
    res.send(accessoriesList);
});

accessories.delete("/accessories/:id", (req, res) => {
    let count = 0;
    for (let accessory of accessoriesList) {
        if (accessory.id == req.params.id) {
            accessoriesList.splice(count, 1);
        }
        count++;
    }
    res.send(accessoriesList);

});
module.exports = accessories;