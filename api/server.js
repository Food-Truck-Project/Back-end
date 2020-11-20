const express = require('express');
const helmet = require("helmet")
const cors = require("cors");

const authRouter = require('../auth/authRouter');
const trucksRouter = require('../trucks/trucksRouter');
// const dotenv = require('dotenv').config()



const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use("/api/users", authRouter);
app.use("/api/trucks", trucksRouter);

app.get("/", (req,res) => {
    res.status(200).json({ api: "up" });
    
})

module.exports = app