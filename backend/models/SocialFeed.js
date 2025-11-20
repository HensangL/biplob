import mongoose from 'mongoose';

const { Schema } = mongoose;

const SocialFeedSchema = new Schema({
  img: { type: String, default: '' },
  text: { type: String, default: '' },
  user: { type: String, default: '' },
  time: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('SocialFeed', SocialFeedSchema);
