import mongoose from 'mongoose';

const { Schema } = mongoose;

const MerchSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, default: '' },
  price: { type: String, default: '' },
  img: { type: String, default: '' },
  images: { type: [String], default: [] },
}, { timestamps: true });

export default mongoose.model('Merch', MerchSchema);
