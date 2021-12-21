const express = require('express');
const path = require('path');
const bodyParser= require('body-parser');

const cors = require('cors')
const app = express();
//const renters = require('./routes/renters');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://mikias:mikias@meanstack.4rgsh.mongodb.net/Trial?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology:true,
});

mongoose.connection.on('connected', ()=> {
    console.log('Database Connected to  '+ 'mongodb://localhost:27017/houseRent')})

app.use(cors());
    
// Body parser Middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use( express.static(path.join(__dirname, 'public')));





const RenterSchema = mongoose.Schema({

    username:{
        type: String,
        required: true
    },
    

})

const Renter = mongoose.model('Renter', RenterSchema);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})


app.post('/post', (req,res) => {

    let username = req.body.username

    console.log(username)
    let newRenter = new Renter({
    username:username
});
newRenter.save();
res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(port, ()=> {
    console.log('Server Connected')
})