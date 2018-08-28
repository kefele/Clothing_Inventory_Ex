"use strict";
// must use express in app
const express = require("express");
// variable app initialized to use express methods
const app = express();
// establish required routing/connection to components
const shoes = require("./routes/shoes");
const clothes = require("./routes/clothes");
const accessories = require("./routes/accessories");

// set intial directory to public folder
app.use(express.static("./public"));
//use an express json layout
app.use(express.json());
//not sure y we used api outside of I think we are kinda building 1 for a shop which for now has a shoes, clothes, accessories route
app.use("/api/shop", shoes);
app.use("/api/shop", clothes);
app.use("/api/shop", accessories);

//sets port as 5000
const port = 5000;

//try to connect to the 5000 port and get a response
app.listen(port, () => {
    //if connected print to the console..
    console.log(`Server running on port: ${port}`);
});