const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



    //res.json({message:"Api Used"});


//const uri = process.env.ATLAS_URI;
mongoose.connect("mongodb://localhost:27017/cse299", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
})
.then(() => {
  console.log("Database Connected!");
})
.catch((err) => {
  console.log("Error connecting to database: " + err.message);
});

//const tenantRouter = require('./routes/tenants');
//const ownerRouter = require('./routes/owners');

//app.use("/tenants",require("./routes/tenants.js"));
//app.use("/owners",require("./routes/owners.js"));
app.use("/tenantUser",require("./routes/tenantsRoutes.js"));
app.use("/ownerUser",require("./routes/ownersRoutes.js"));
app.use("/Add",require("./routes/addListRoutes.js"))

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
