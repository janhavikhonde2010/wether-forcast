// backend/routes/boardRoutes.js

import express from 'express';

const router = express.Router();

// Example route - you can customize it
router.get('/', (req, res) => {
  res.json({ message: 'Board route is working!' });
});

// Add more routes here as needed
// For example:
// router.post('/', (req, res) => { /* handle POST request */ });

export default router;
