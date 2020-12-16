// Require
const MongoClient = require("mongodb").MongoClient
const assert = require("assert")
const connectDB = require("../connectDB")

exports.handler = async (event) => {
  if (event.httpMethod === "POST") {
    // Connect to database
    const { client, db } = connectDB()

    // Create obj to send
    const body = JSON.parse(event.body)
    console.log(body)
    const order = {
      fullName: body.name,
      email: body.email,
      phone: body.email,
      offer: body.email,
      desc: body.description,
    }

    // Send to DB
    try {
      // Insert a single document
      let r = await db.collection("orders").insertOne(order)
      assert.strictEqual(1, r.insertedCount)

      // Success
      //client.close()
      return {
        statusCode: 200,
        body: {},
        error: null,
      }
    } catch (e) {
      // Error
      //client.close()
      return {
        statusCode: 400,
        body: {},
        error: {
          message: "Error in API",
        },
      }
    }
  }
}
