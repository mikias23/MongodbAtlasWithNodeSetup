const mongoose = require("mongoose");

const  RenterSchema= new mongoose.Schema({
         username:{
             type:String,
              required:true
         }
});

const Renter = mongoose.model("Renter", RenterSchema);

module.exports = Renter;
