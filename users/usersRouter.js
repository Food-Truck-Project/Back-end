const router = require("express").Router();
const UsersDb = require("../users/userModel");
const TrucksDb = require("../trucks/trucksModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
    try {
  const users = await UsersDb.getAll();
  res.status(200).json(users);
    } catch(err) {
        res.status(500).json({errorMessage: "something went wrong!"})
    }

});

router.get("/:id/trucks", async (req, res) => {
  const trucks = await TrucksDb.findUserTrucks(req.params.id)
try{
  if(!trucks.length || !trucks){
      res.status(404).json({message: "oops, no trucks found pls create one!"})
  } else{
      res.status(200).json(trucks)
  }
 } catch(err){
  res.status(500).json({ message: "Something went wrong, pls contact the cool devs"})
}

})

router.post("/register", async (req, res) => {
  try {
    if (!req.body.username || !req.body.password || !req.body.email) {
      res
        .status(400)
        .json({ message: "please make sure you specified all credentials" });
    } else {
      const [existingUser] = await UsersDb.findBy({
        username: req.body.username,
      });
      const [existingEmail] = await UsersDb.findBy({ email: req.body.email });
         if (existingUser || existingEmail) {
          console.log(existingUser);
          res
          .status(400)
          .json({ message: "The username or email is already taken" });
        }

        const hash = bcrypt.hashSync(req.body.password, 14);
        const newUser = {
        username: req.body.username,
        password: hash,
        email: req.body.email
         };
        const addedUser = await UsersDb.create(newUser);
        res.status(201).json(addedUser);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.status(400).json({ message: "please make sure you specified all credentials" });
    }
    const [user] = await UsersDb.findBy({ username: req.body.username });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = makeToken(user)
      res.status(200).json({ message: `Welcome ${user.username}!, have a token...`, token });
    } else {
            res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id/update", async (req, res) => {   
    try {
        if(!req.body.password || !req.body.username || !req.body.email){
            res.status(400).json({ message: "Pls make sure you have all fields"})
        }
        const hash = bcrypt.hashSync(req.body.password, 14)
        const updatedUser = {
            username: req.body.username,
            password: hash,
            email: req.body.email
        }
      const updatedInfo = await UsersDb.update(req.params.id, updatedUser)
      res.status(201).json({message: "User Updated!"})
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.delete("/:id", async (req, res) => { 
      const user = await UsersDb.findById(req.params.id)  
    try {
      if(!user){
          res.status(404).json({message: "user not found!"})
      } 
          await UsersDb.delete(req.params.id)
          res.status(201).json({message: "User deleted"})
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

function makeToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
