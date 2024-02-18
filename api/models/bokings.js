import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
   checkin: { type: Date, required: true },
   checkout: { type: Date, required: true },
   noOfGuste: { type: Number, required: true },
   name: { type: String, required: true },
   phone: { type: String, required: true },
   place: { type: String, required: true },
   price: { type: Number, required: true },
   user: {type:mongoose.Schema.Types.ObjectId}
});

const bookingsModel = mongoose.model('booking', bookingSchema);

export default bookingsModel;
