import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Example endpoints for frontend data
app.get('/api/artists', (req, res) => {
  res.json([
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
  ]);
});

app.get('/api/merch', (req, res) => {
  res.json([
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
  ]);
});

app.get('/api/events', (req, res) => {
  res.json([
    { day: '15', month: 'June', title: 'Summer Music Festival', desc: 'Join us for a day of amazing local music, food trucks, and art installations.', location: '📍 Central Park - 6:00 PM' },
    { day: '22', month: 'June', title: 'Echo District Album Release', desc: ",Celebrate the release of Echo District's new album with a live performance.", location: '📍 The Velvet Room - 8:00 PM' },
    { day: '05', month: 'July', title: 'Acoustic Sessions', desc: 'Intimate acoustic performances by Luna May and special guests.', location: '📍 The Listening Cafe - 7:30 PM' },
  ]);
});

app.get('/api/socialfeed', (req, res) => {
  res.json([
    {
      img: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1350&q=80',
      text: 'Just got my Echo District vinyl! The sound quality is amazing. #SupportLocalMusic',
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
  ]);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
