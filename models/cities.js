const mongoose = require("mongoose");

const citySchema = mongoose.Schema(
  {
    cityName: {
      type: String,
      required: true,
      trim: true,
    },
    main: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tempMin: {
      type: Number,
      required: true,
    },
    tempMax: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      index: true, // Pour accélérer les recherches par user
    },
  },
  
);

const City = mongoose.model("cities", citySchema);

module.exports = City;
