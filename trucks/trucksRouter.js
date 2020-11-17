const router = require("express").Router();
const TrucksDb = require("./trucksModel");
const restricted = require("../auth/restrict-middleware");

router.get("/", restricted, async (req, res) => {
   try{
   const trucks = await TrucksDb.getAll()
   res.status(200).json({data: trucks})
    } catch(error){
        console.log(error.message)
        res.status(500).json({message: "Something went wrong retrieving trucks pls contact dev"})
    }
   
})


router.post("/", (req, res) => {


})


router.put("/", (req, res) => {


})

router.delete("/", (req, res) => {


})






module.exports = router;