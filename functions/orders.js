// Require
const MongoClient = require("mongodb").MongoClient
const assert = require("assert")
const connectDB = require("../connectDB")

exports.handler = async (event) => {
  console.log("event :", event)
  if (event.httpMethod === "POST") {
    // Connect to database
    const { client, db } = await connectDB()

    // Create obj to send
    const body = JSON.parse(event.body)
    const order = {
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      offer: body.offer,
      desc: body.desc,
      date: new Date(),
    }
    try {
      // Insert a single document
      let r = await db.collection("orders").insertOne(order)
      assert.strictEqual(1, r.insertedCount)
      client.close()
    } catch (e) {
      // Error
      client.close()
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "bad",
          error: true,
        }),
      }
    }

    // Success
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "good",
        error: false,
      }),
      error: null,
    }
  }
}
