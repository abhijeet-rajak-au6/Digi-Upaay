// const mongoose = require("mongoose");
const mongoose = require("mongoose");

const dbConnnect = async () => {
  const db = process.env.MONGODB_URL;

  const dbcon = await mongoose.connect(
    db.replace("<password>", process.env.MONGODB_PASSWORD),
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );

  if (dbcon){
    console.log("Database is connected sucessfully !!")
  };
};

dbConnnect();