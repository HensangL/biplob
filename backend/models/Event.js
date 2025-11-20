import mongoose from 'mongoose';

const { Schema } = mongoose;

const EventSchema = new Schema({
  poster: { type: String, default: '' },
  day: { type: String, required: true },
  month: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, default: '' },
  location: { type: String, default: '' },
  ticket: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Event', EventSchema);
