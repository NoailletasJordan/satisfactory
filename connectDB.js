const MongoClient = require("mongodb").MongoClient
const assert = require("assert")
require("dotenv").config()

module.exports = async function (order) {
  // Connection URL
  const url = process.env.MONGODB_URL

  try {
    // Database Name
    const dbName = process.env.DB_NAME
    const client = new MongoClient(url, {
      useNewUrlParser: true,
    })

    // Use connect method to connect to the Server
    await client.connect()
    const db = client.db(dbName)

    console.log("1")

    let r = await db.collection("orders").insertOne(order)
    console.log("2")
    assert.strictEqual(1, r.insertedCount)
    console.log("3")
    client.close()
    console.log("connected to db")
    return {
      client,
    }
  } catch (err) {
    console.log(err.stack)
    throw new Error("connectDB failed")
  }
}
