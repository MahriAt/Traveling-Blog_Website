const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');



const authRoutes = require("./routes/auth");
const travelRoutes = require("./routes/travel");
const contactRoutes = require("./routes/contact");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

/*const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);*/

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res,next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use("/uploads", express.static("uploads"));
app.use("/api/travel", travelRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);




app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
        message: error.message
    }
});
});


module.exports = app;