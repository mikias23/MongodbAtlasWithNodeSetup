const express = require('express');
const path = require('path');
const bodyParser= require('body-parser');

const cors = require('cors')
const app = express();
const Renter = require('./renters');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

 mongoose.connect("mongodb+srv://mikiasaytenfisu:mikiad@meanstack.4rgsh.mongodb.net/Trial?retryWrites=true&w=majority", {
    useNewUrlParser: true,
   
    useUnifiedTopology: true
}) .then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));;



// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://mikiasaytenfisu:mikiad@meanstack.4rgsh.mongodb.net/Trial?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


app.use(cors());
    
// Body parser Middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use( express.static(path.join(__dirname, 'public')));







app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})


app.post('/post', async (req,res) => {

    let username = req.body.username;
    const newrenter = new Renter({username: username});
      
        try {
          await newrenter.save();
          res.sendFile(path.join(__dirname, 'public/index.html'));
        } catch (error) {
          response.status(500).send(error);
        }
    

  
})

app.listen(port, ()=> {
    console.log('Server Connected')
})


//  async function run() {
//     try {
//         await client.connect();
//       const database = client.db("Trial");
//       const haiku = database.collection("renters");
//       // create a document to insert
//       const doc = {
//         username: username
//       }
//       const result = await haiku.insertOne(doc);
//       console.log(`A document was inserted with the _id: ${result.insertedId}`);
//     } finally {
//       await client.close();
//     }
//   }
//   run().catch(console.dir);