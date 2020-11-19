const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UsersDb = require("./userModel");
const TrucksDb = require("../trucks/trucksModel");
const restricted = require("./restrict-middleware");
const role = require("../users/users-access");
const {roleChecker} = require("../users/users-access");


router.post("/register", async (req, res) => {
  const { username, password, email, role} = req.body;
  try {
    if (!username || !password || !email || !role) {
      res
        .status(400)
        .json({ message: "please make sure you specified all credentials" });
    } else {
      const [existingUser] = await UsersDb.findBy({
        username: req.body.username,
      });
      const [existingEmail] = await UsersDb.findBy({ email: req.body.email });
      if (existingUser || existingEmail) {
        // console.log(existingUser);
        res
          .status(400)
          .json({ message: "The username or email is already taken" });
      }

      const hash = bcrypt.hashSync(req.body.password, 14);
      const parsedRole = await parseInt(req.body.role)
      const newUser = {
        username: req.body.username,
        password: hash,
        email: req.body.email,
        role: parsedRole
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
      res
        .status(400)
        .json({ message: "please make sure you specified all credentials" });
    }
    const [user] = await UsersDb.findBy({ username: req.body.username });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = makeToken(user);
      res
        .status(200)
        .json({ message: `Welcome ${user.username}!, have a token...`, token, user_id: user.user_id });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// create a new truck for a user
router.post("/:user_id/trucks/" , async (req, res) => {
  const { truckName, truckImg, cuisineType_id} = req.body;


  try{
    if(!truckName || !truckImg || cuisineType_id) {
      res.status(400).json({ message: "Make sure you have truckName, truckImg, and cuisineType, selected and filled."})
    }
 
   const newTruck = {
       user_id: req.params.user_id,
       truckName: truckName,
       truckImg: truckImg,
       cuisineType_id: parseInt(cuisineType_id)
   }
      const [truck] = await TrucksDb.create(newTruck)
      if(truck){
       res.status(200).json(truck)
      } else {
          res.status(400).json({message: "oops truck not created!"})
      }
        } catch(error){
            console.log(error.message)
            res.status(500).json({message: "Something went wrong retrieving menu items pls contact dev"})
        }
})

// update a truck's properties 

router.put("/:user_id/trucks/:truck_id" , async (req, res) => {
  const { truckName, truckImg, cuisineType_id} = req.body;
    

  try{
    if(!truckName || !truckImg || cuisineType_id) {
      res.status(400).json({ message: "Make sure you have truckName, truckImg, and cuisineType, selected and filled."})
    }
 
   const updatedTruck = {
       user_id: req.params.user_id,
       truckName: truckName,
       truckImg: truckImg,
       cuisineType_id: parseInt(cuisineType_id)
   }
      const truck = await TrucksDb.update(req.params.truck_id, updatedTruck)
      if(truck){
       res.status(200).json(truck)
      } else {
          res.status(400).json({message: "oops truck not created!"})
      }
        } catch(error){
            console.log(error.message)
            res.status(500).json({message: "Something went wrong retrieving menu items pls contact dev"})
        }
})

// delete a truck based on the user_id and truck id
router.delete("/:user_id/trucks/:truck_id" , async (req, res) => {
    
    const truck = await TrucksDb.findUserTrucks(req.params.user_id)
  try{
    if(!truck || !truck.length) {
      res.status(400).json({ message: "Oops truck not found!"})
    }
    
       await TrucksDb.remove(req.params.truck_id)
       res.status(204).json({message: "Truck is now deleted!"})
    
        } catch(error){
            console.log(error.message)
            res.status(500).json({message: "Something went wrong retrieving menu items pls contact dev"})
        }
})

router.get("/", async (req, res) => {
  try {
    const users = await UsersDb.getAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ errorMessage: "something went wrong!" });
  }
});

// find the trucks that an operator own with roleChecker (2) which is operator
router.get("/:id/trucks", restricted, roleChecker(2), async (req, res) => {
  const trucks = await TrucksDb.findUserTrucks(req.params.id);
  try {
    if (!trucks.length || !trucks) {
      res
        .status(404)
        .json({ message: "oops, no trucks found pls create one!" });
    } else {
      res.status(200).json(trucks);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, pls contact the cool devs" });
  }
});

function makeToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role
  };

  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
