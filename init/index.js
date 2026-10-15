const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initdata = require("./data.js");

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/WanderLust1");
}

const initDB = async () => {
  await Listing.deleteMany({});
  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: "6acd2226433aa77af25b7d13",
  }));
  await Listing.insertMany(initdata.data);
  console.log("sucess");
};

initDB();
