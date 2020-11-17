const express = require('express');
const helmet = require("helmet")
const cors = require("cors");
const usersRouter = require('../users/usersRouter');
const trucksRouter = require('../trucks/trucksRouter');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/users", usersRouter);
app.use("/api/trucks", trucksRouter);

app.use("/", (req,res) => {
    res.send(`api is up and running :+1:`)
})

module.exports = app