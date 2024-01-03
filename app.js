const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();


// Connect to MongoDB
mongoose.connect('mongodb+srv://anassakker803:rC3q7C3tHuTFGoQG@booking.rsryegw.mongodb.net', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.json());

const url = "mongodb+srv://anassakker803:rC3q7C3tHuTFGoQG@booking.rsryegw.mongodb.net/?retryWrites=true&w=majority";

const { MongoClient } = require("mongodb");
const client = new MongoClient(url);
async function run() {
    try {
        await client.connect();
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);
// Import routes
const flightRoutes = require('./routes/flights');
const passengerRoutes = require('./routes/passenger');
const reservationRoutes = require('./routes/reservations');


app.use(bodyParser.json())
app.use(express.static('/public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.json());

// Use routes
app.use('/passenger', passengerRoutes);
app.use('/reservations', reservationRoutes);

app.use('/css', express.static(__dirname + '/public'));
app.use('/img', express.static(__dirname + '/public'));
app.use('/js', express.static(__dirname + '/public'));

app.use("/Flights", flightRoutes);
app.use("/Passenger", passengerRoutes);
app.use("/Reservations", reservationRoutes);

app.get('/', async (req, res) => {
    console.log("Apps Running")
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`); 
});