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
router.get("/:truck_id", async (req, res) => {
    try{
   const [truck] = await TrucksDb.getSingleTruck(req.params.truck_id)
    res.status(200).json(truck)
     } catch(error){
         console.log(error.message)
         res.status(500).json({message: "Something went wrong retrieving trucks pls contact dev"})
     }
    
 })

 //Get a trucks's menuItems

 router.get("/:truck_id/menuitems/", restricted, async (req, res) => {
    try{
   const [truck] = await TrucksDb.getTruckMenuItems(req.params.truck_id)
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

// create a truck's menu item
router.post("/:id/menuitems/" , async(req, res) => {
    try{
        const [truck] = await TrucksDb.createMenuItem(menuitem)
        if(truck){
         res.status(200).json(truck)
        } else {
            res.status(404).json({message: "oops truck not found!"})
        }
          } catch(error){
              console.log(error.message)
              res.status(500).json({message: "Something went wrong retrieving menu items pls contact dev"})
          }
})



router.put("/", (req, res) => {


})

router.delete("/", (req, res) => {


})






module.exports = router;