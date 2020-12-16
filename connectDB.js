const MongoClient = require("mongodb").MongoClient
const assert = require("assert")

module.exports = async function () {
  // Connection URL
  const url = process.env.MONGODB_URL
  // Database Name
  const dbName = process.env.DB_Name
  const client = new MongoClient(url, { useNewUrlParser: true })

  try {
    // Use connect method to connect to the Server
    await client.connect()
    const db = client.db(dbName)
  } catch (err) {
    console.log(err.stack)
    throw new Error("connectDB failed")
  }

  return {
    client,
    db,
  }
}

// process.env.MONGODB_URL
