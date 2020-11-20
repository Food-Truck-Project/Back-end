const db = require("../database/dbConfig");
const trucksModel = require("../trucks/trucksModel");
beforeEach( async () => {
    await db("trucks").truncate()
})
describe("Truck model works!", () => {
    describe("Adding a truck", () => {
        it("inserting a truck in the db", async () => {
            await trucksModel.create({truckName: "trickytruck", truckImg: "trckimgurls"})
            await trucksModel.create({truckName: "trickytruck", truckImg: "trckimgurls"})
            await trucksModel.create({truckName: "trickytruck", truckImg: "trckimgurls"})
           const database = await db("trucks")
           expect(database).toHaveLength(3)

        })

        it("Deleting a truck", async () => {
            await trucksModel.create({id: 1, truckName: "trickystruck", truckImg: "trckimgurls"})
            const database = await db("trucks")
            expect(database).toHaveLength(1)

             await trucksModel.remove(1)
             const refreshedDb= await db("trucks")
             expect(refreshedDb).toHaveLength(0)

        })



    })
})