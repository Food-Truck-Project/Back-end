const router = require("express").Router();
const TrucksDb = require("./trucksModel");
const restricted = require("../auth/restrict-middleware");
const { roleChecker } = require("../users/users-access");

// get all trucks in general
router.get("/", restricted, async (req, res) => {
   try{
   const trucks = await TrucksDb.getAll()
   res.status(200).json({data: trucks})
    } catch(error){
        console.log(error.message)
        res.status(500).json({message: "Something went wrong retrieving trucks pls contact dev"})
    }
   
})
// get a single truck based on the truck id
router.get("/:truck_id", restricted, async (req, res) => {
    try{
   const [truck] = await TrucksDb.getSingleTruck(req.params.truck_id)
    res.status(200).json(truck)
     } catch(error){
         console.log(error.message)
         res.status(500).json({message: "Something went wrong retrieving trucks pls contact dev"})
     }
    
 })



 //Get a trucks's location based on the truck_id

 router.get("/:truck_id/location", restricted, async (req, res) => {
    try{
   const [truckLocation] = await TrucksDb.getTruckLocation(req.params.truck_id)
   if(truckLocation){
    res.status(200).json(truckLocation)
   } else {
       res.status(404).json({message: "oops truck location not found!"})
   }
     } catch(error){
         console.log(error.message)
         res.status(500).json({message: "Something went wrong retrieving menuitems pls contact dev"})
     }
 })


 //Get a trucks's menuItem with customer rating

 router.get("/:truck_id/menuitems", restricted, async (req, res) => {
    try{
   const truck = await TrucksDb.getTruckMenuItems(req.params.truck_id)
   if(truck){
    res.status(200).json(truck)
   } else {
       res.status(404).json({message: "oops truck not found!"})
   }
     } catch(error){
         console.log(error.message)
         res.status(500).json({message: "Something went wrong retrieving menuitems pls contact dev"})
     }
 })

//create a truck's location
 router.post("/:truck_id/location/" , async(req, res) => {
     const {location, departureTime} = req.body;

     
    try{
        if(!location || !departureTime) {
            res.status(400).json({ message: "You have to specify a location and departure time for a truck!"})
         }
         const truckLocation = {
             location: location,
             departureTime: departureTime,
             truck_id: req.params.truck_id
         }
        const [truck] = await TrucksDb.createLocation(truckLocation)

        if(truck){
         res.status(200).json(truck)
        } else {
            res.status(404).json({message: "oops could not insert the location!"})
        }
          } catch(error){
              console.log(error.message)
              res.status(500).json({message: "Something went wrong retrieving menu items pls contact dev"})
          }
})


// create a truck's menu item
router.post("/:truck_id/menuitems/" , async(req, res) => {
    const {itemName, itemDescription, itemImg, itemPrice} = req.body;
    
  
    try{
    const truck = await TrucksDb.findTruckByTruckId(req.params.truck_id)
    const isItemExisting = await TrucksDb.findMenuItem(itemName)
     
    if(isItemExisting){
        res.status(400).json({ message: "Item with this name already exists for this truck"})
    }

    if(!truck){
        res.status(404).json({ message: "Truck with the specified id can't be found."})
    }

    if(!itemName || !itemDescription || !itemImg || !itemPrice){
        res.status(400).json({message: "You are missing either, itemName, itemDescription, itemImg or itemPrice"})
    }
        const newMenuItem = {
            itemName: itemName,
            itemDescription: itemDescription,
            itemImg: itemImg,
            itemPrice: parseInt(itemPrice),
            truck_id: req.params.truck_id
        }
        const [truckItem] = await TrucksDb.createMenuItem(newMenuItem)
        if(truckItem){
         res.status(201).json(truckItem)
        } else {
            res.status(404).json({message: "oops item can't be created"})
        }
          } catch(error){
              console.log(error.message)
              res.status(500).json({message: "Something went wrong retrieving menu items pls contact dev"})
          }
})





module.exports = router;