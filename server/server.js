const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const Donor = require("./models/Donor");

const app = express();


// MIDDLEWARE
app.use(express.json());

app.use(cors());


// CREATE DONOR
app.post("/donors", async (req, res) => {

    try {

        const donor = await Donor.create(req.body);

        res.status(201).json(donor);

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
});


// GET ALL DONORS
app.get("/donors", async (req, res) => {

    try {

        const donors = await Donor.find();

        res.json(donors);

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
});

app.get("/donors/blood/:group", async (req, res) => {

    try {

        const donors = await Donor.find({

            bloodGroup: req.params.group
        });

        res.json(donors);

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
});

// DELETE DONOR
app.delete("/donors/:id", async (req, res) => {

    try {

        await Donor.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Donor Deleted"
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
});


// UPDATE DONOR
app.put("/donors/:id", async (req, res) => {

    try {

        const updatedDonor =
        await Donor.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }
        );

        res.json(updatedDonor);

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
});


// MONGODB CONNECTION
mongoose.connect(
   "mongodb+srv://Abhinand:Abhinand2005@cluster0.inzfoyq.mongodb.net/bloodDonationDB?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => {

   console.log("MongoDB Connected");

})
.catch((err) => {

   console.log(err);
});


// TEST ROUTE
app.get("/", (req, res) => {

   res.send("Server Running");
});


// SERVER
app.listen(3000, () => {

   console.log("Server Started");
});