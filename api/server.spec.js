const server = require("./server");
const request = require("supertest")


describe("Server works!", () => {
    describe("getting the API up and running", () => {
        it("getting the API status", async () => {

           const res = await request(server).get("/")
           expect(res.status).toBe(200)
           expect(res.body).toMatchObject({ api: "up" })
           expect(res.type).toBe("application/json")

        })


    })
})