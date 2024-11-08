const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
.then(()=>{
    console.log('mongoDB Connected...');
}).catch((err)=>{
    console.log('mongoDB Connection Error: ',err);
})