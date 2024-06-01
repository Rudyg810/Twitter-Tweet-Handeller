
const mongoose = require("mongoose");

const dbconnection = mongoose.connect(process.env.dburl)
    .then(() => {
        console.log("connected to database");
    });

module.exports = { dbconnection };
