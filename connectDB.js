const MongoClient = require("mongodb").MongoClient
require("dotenv").config()

module.exports = async function () {
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
    console.log("connected to db")

    // Return Client to close connection and the Database object
    return {
      client,
      db,
    }
  } catch (err) {
    console.log(err.stack)
    throw new Error("connectDB failed")
  }
}
