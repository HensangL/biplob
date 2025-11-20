Backend MongoDB migration

Steps to run locally:

1. Install dependencies inside `backend`:

```pwsh
cd backend
npm install
```

2. Create `.env` file in `backend/` (copy `.env.example`) and set `MONGODB_URI` to your MongoDB connection string.

3. Start backend:

```pwsh
npm run dev
# or
npm start
```

4. API endpoints:
- GET /api/events
- GET /api/events/:id
- POST /api/events
- DELETE /api/events/:id

- GET /api/artists
- POST /api/artists
- DELETE /api/artists/:id

- GET /api/merch
- POST /api/merch
- DELETE /api/merch/:id

- GET /api/socialfeed
- POST /api/socialfeed
- DELETE /api/socialfeed/:id

Notes:
- This uses Mongoose for schemas and persistence.
- If you previously relied on index-based IDs (numeric), the frontend has been updated to use resource IDs (MongoDB _id).
- For migrating existing in-memory sample data, you can write a small script to read the arrays and insert into the DB. This was intentionally left out to avoid accidental duplicates.
