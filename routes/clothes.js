"use strict";
const express = require("express");
const clothes = express.Router();

const clothingList = [{
    type: "spring",
    size: 10,
    color: ["White", "Red", "Blue"],
    gender: "Male",
    price: 50,
    id: 0
}, {
    type: "Summer",
    size: 12,
    color: ["Orange", "Red"],
    gender: "Female",
    id: 1
}];
let idCount = clothingList.length;

clothes.get("/clothes", (req, res) => {
    res.send(clothingList);
});

clothes.post("/clothes", (req, res) => {
    clothingList.push({
        type: req.body.type,
        size: req.body.size,
        color: req.body.color,
        gender: req.body.gender,
        id: idCount++
    });
    res.send(clothingList);
});
clothes.put("/clothes/:id", (req, res) => {
    let count = 0;
    console.log(req.params.id);
    console.log(req.body);
    for (let clothes of clothingList) {
        if (clothes.id == req.params.id) {
            let updatedClothing = {
                type: req.body.type,
                size: req.body.size,
                color: req.body.color,
                gender: req.body.gender,
                id: Number(req.params.id)
            }
            clothingList.splice(count, 1, updatedClothing);
        }
        count++;
    }
    res.send(clothingList);
});

clothes.delete("/clothes/:id", (req, res) => {
    // req.params = the param added to the url
    let count = 0;
    for (let clothing of clothingList) {
        if (clothing.id == req.params.id) {
            clothingList.splice(count, 1);
        }
        count++;
    }
    res.send(clothingList);
});

module.exports = clothes;