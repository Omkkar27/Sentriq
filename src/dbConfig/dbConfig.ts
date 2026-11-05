import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!); //always available => !
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("mongoDB connected sucesfully");
    });

    connection.on("error", (err) => {
      console.log(
        "mongoDB connection error.Please make sure your DB is running " + err,
      );
      process.exit();
    });
  } catch (error) {
    console.log("something went wrong");
    console.log(error);
  }
}
