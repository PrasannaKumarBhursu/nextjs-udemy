import mongoose from "mongoose";

// Function to connect to the database
export default function connectToDB() {
  return mongoose
    .connect(process.env.MONGO_URL!)
    .then(() => {
      console.log("Connected to MongoDB successfully!");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
}
