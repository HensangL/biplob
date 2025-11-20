import mongoose from 'mongoose';

const { Schema } = mongoose;

const ArtistSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, default: '' },
  img: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Artist', ArtistSchema);
