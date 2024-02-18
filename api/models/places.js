import mongoose from "mongoose";

const placesSchema = new mongoose.Schema({
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   title: String,
   address: String,
   image: [[String]],
   description: String,
   features: [String],
   extrainfo: String,
   checkin: Number,
   checkout: Number,
   maxguest: Number,
   price: Number
});

const placeModel = mongoose.model('Place', placesSchema);

export default placeModel;
