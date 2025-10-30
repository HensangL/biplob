import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// In-memory data stores (temporary - replace with DB later)
const artists = [
  {
    name: 'Dhankuta District',
    desc: 'Pop rock band with a unique sound that blends alternative and folk influences.',
    img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1350&q=80',
  },
  {
    name: 'Luna May',
    desc: 'Soulful singer-songwriter with powerful vocals and heartfelt lyrics.',
    img: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&w=1350&q=80',
  },
  {
    name: 'Midnight Drive',
    desc: 'Electronic duo creating atmospheric beats and immersive soundscapes.',
    img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1350&q=80',
  },
  {
    name: 'The Velvet Notes',
    desc: 'Jazz ensemble bringing classic sounds with a modern twist.',
    img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1350&q=80',
  },
];

const merch = [
  {
    name: 'Echo District T-Shirt',
    desc: 'Limited edition band t-shirt with original artwork.',
    price: '$25.00',
    img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1350&q=80',
  },
  {
    name: 'MusicHub Beanie',
    desc: 'Warm, stylish beanie with MusicHub logo.',
    price: '$18.00',
    img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1350&q=80',
  },
  {
    name: 'Vinyl Record Collection',
    desc: 'Limited edition vinyl from our featured artists.',
    price: '$30.00',
    img: 'https://images.unsplash.com/photo-1584670747417-594a9412fba5?auto=format&fit=crop&w=1350&q=80',
  },
  {
    name: 'Artist Sticker Pack',
    desc: 'Set of 10 unique stickers from local artists.',
    price: '$12.00',
    img: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=1350&q=80',
  },
];

const events = [
  { poster: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1350&q=80', day: '15', month: 'June', title: 'Summer Music Festival', desc: 'Join us for a day of amazing local music, food trucks, and art installations.', location: '📍 Central Park - 6:00 PM' },
  { poster: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1350&q=80', day: '22', month: 'June', title: 'Echo District Album Release', desc: "Celebrate the release of Echo District's new album with a live performance.", location: '📍 The Velvet Room - 8:00 PM' },
  { poster: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&w=1350&q=80', day: '05', month: 'July', title: 'Acoustic Sessions', desc: 'Intimate acoustic performances by Luna May and special guests.', location: '📍 The Listening Cafe - 7:30 PM' },
];

const socialfeed = [
  {
    img: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1350&q=80',
    text: 'New concert in 5 days! Who else is excited? 🎸🎤',
    user: '@musiclover23',
    time: '2 hours ago',
  },
  {
    img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1350&q=80',
    text: "Can't wait for the Summer Music Festival! Who else is going? 🎵",
    user: '@festivalfan',
    time: '1 day ago',
  },
  {
    img: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&w=1350&q=80',
    text: "Luna May's new single is everything! Stream it now on all platforms.",
    user: '@newmusicfinder',
    time: '100 days ago',
  },
];

// GET endpoints
app.get('/api/artists', (req, res) => {
  res.json(artists);
});

app.get('/api/merch', (req, res) => {
  res.json(merch);
});

app.get('/api/events', (req, res) => {
  res.json(events);
});

// GET single event by index
app.get('/api/events/:index', (req, res) => {
  const i = parseInt(req.params.index, 10);
  if (Number.isNaN(i) || i < 0 || i >= events.length) return res.status(404).json({ error: 'Event not found' });
  return res.json(events[i]);
});

app.get('/api/socialfeed', (req, res) => {
  res.json(socialfeed);
});

// POST to create an event (temporary in-memory persistence)
app.post('/api/events', (req, res) => {
  const { poster = '', day, month, title, desc, location, ticket = '' } = req.body;
  if (!day || !month || !title) {
    return res.status(400).json({ error: 'day, month and title are required' });
  }
  const newEvent = { poster, day, month, title, desc, location, ticket };
  events.push(newEvent);
  return res.status(201).json(newEvent);
});

// DELETE endpoints (temporary, index-based)
app.delete('/api/artists/:index', (req, res) => {
  const i = parseInt(req.params.index, 10);
  if (Number.isNaN(i) || i < 0 || i >= artists.length) return res.status(404).json({ error: 'Artist not found' });
  const removed = artists.splice(i, 1)[0];
  return res.json({ success: true, removed });
});

app.delete('/api/merch/:index', (req, res) => {
  const i = parseInt(req.params.index, 10);
  if (Number.isNaN(i) || i < 0 || i >= merch.length) return res.status(404).json({ error: 'Merch not found' });
  const removed = merch.splice(i, 1)[0];
  return res.json({ success: true, removed });
});

app.delete('/api/events/:index', (req, res) => {
  const i = parseInt(req.params.index, 10);
  if (Number.isNaN(i) || i < 0 || i >= events.length) return res.status(404).json({ error: 'Event not found' });
  const removed = events.splice(i, 1)[0];
  return res.json({ success: true, removed });
});

app.delete('/api/socialfeed/:index', (req, res) => {
  const i = parseInt(req.params.index, 10);
  if (Number.isNaN(i) || i < 0 || i >= socialfeed.length) return res.status(404).json({ error: 'Feed item not found' });
  const removed = socialfeed.splice(i, 1)[0];
  return res.json({ success: true, removed });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
