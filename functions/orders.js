// Require
const MongoClient = require("mongodb").MongoClient
const assert = require("assert")
const connectDB = require("../connectDB")

exports.handler = async (event) => {
  if (event.httpMethod === "POST") {
    // Connect to database
    // const { client } = connectDB()

    // Create obj to send
    const body = JSON.parse(event.body)
    //console.log(db)
    const order = {
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      offer: body.offer,
      desc: body.desc,
    }
    //console.log(order)

    // Send to DB
    try {
      // Insert a single document
      /* let r = await db.collection("orders").insertOne(order)
      assert.strictEqual(1, r.insertedCount) */

      // Success
      //client.close()

      connectDB(order)

      return {
        statusCode: 200,
        body: "good",
        error: null,
      }
    } catch (e) {
      // Error
      //client.close()
      return {
        statusCode: 400,
        body: "bad",
        error: {
          message: "Error in API",
        },
      }
    }
  }
}
