import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { connectDB } from './db.js';
import Event from './models/Event.js';
import Artist from './models/Artist.js';
import Merch from './models/Merch.js';
import SocialFeed from './models/SocialFeed.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Serve uploaded files
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

// Multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || '';
    cb(null, `${unique}${ext}`);
  },
});
const upload = multer({ storage });

// Upload endpoint (POST multipart/form-data) -> returns { url }
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  // Return a URL that the frontend can use to fetch the uploaded file
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

// Connect to MongoDB
connectDB().catch((err) => {
  console.error('Failed to connect to DB, exiting', err);
  process.exit(1);
});

// Events
app.get('/api/events', async (req, res) => {
  try {
    const items = await Event.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/events/:id', async (req, res) => {
  try {
    const item = await Event.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Event not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const { poster = '', day, month, title, desc = '', location = '', ticket = '' } = req.body;
    if (!day || !month || !title) return res.status(400).json({ error: 'day, month and title are required' });
    const newEvent = await Event.create({ poster, day, month, title, desc, location, ticket });
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    const removed = await Event.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Event not found' });
    res.json({ success: true, removed });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Artists
app.get('/api/artists', async (req, res) => {
  try {
    const items = await Artist.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/artists', async (req, res) => {
  try {
    const { name, desc = '', img = '' } = req.body;
    if (!name) return res.status(400).json({ error: 'name is required' });
    const newItem = await Artist.create({ name, desc, img });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/artists/:id', async (req, res) => {
  try {
    const removed = await Artist.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Artist not found' });
    res.json({ success: true, removed });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Merch
app.get('/api/merch', async (req, res) => {
  try {
    const items = await Merch.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/merch', async (req, res) => {
  try {
    const { name, desc = '', price = '', img = '' } = req.body;
    if (!name) return res.status(400).json({ error: 'name is required' });
    const newItem = await Merch.create({ name, desc, price, img });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/merch/:id', async (req, res) => {
  try {
    const removed = await Merch.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Merch not found' });
    res.json({ success: true, removed });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Social feed
app.get('/api/socialfeed', async (req, res) => {
  try {
    const items = await SocialFeed.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/socialfeed', async (req, res) => {
  try {
    const { img = '', text = '', user = '', time = '' } = req.body;
    const newItem = await SocialFeed.create({ img, text, user, time });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/socialfeed/:id', async (req, res) => {
  try {
    const removed = await SocialFeed.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Feed item not found' });
    res.json({ success: true, removed });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
