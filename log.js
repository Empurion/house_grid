const { ObjectId, MongoClient } = require('mongodb');
require('dotenv').config()

module.exports = function(message){
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    let formatA = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
    // prints date in YYYY-MM-DD format
    let formatB = year + "-" + month + "-" + date
    console.log(formatA + " | HA-C : " + message)
}