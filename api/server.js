const express = require('express');
const helmet = require("helmet")
const cors = require("cors");
const authRouter = require('../auth/authRouter');
const trucksRouter = require('../trucks/trucksRouter');
const dotenv = require('dotenv').config()



const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/api/users", authRouter);
app.use("/api/trucks", trucksRouter);

app.get("/", (req,res) => {
    res.send(`api is up and running :+1:`)
})

module.exports = app