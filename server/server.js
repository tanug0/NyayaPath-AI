import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRouter);

// Root healthcheck
app.get('/', (req, res) => {
  res.json({
    message: 'NyayaPath AI Server is running',
    health: '/api/health',
    endpoints: {
      analyze: 'POST /api/analyze',
      generateDocument: 'POST /api/generate-document'
    }
  });
});

// Start listening
app.listen(PORT, () => {
  console.log(`[NyayaPath AI Server] Listening on https://nyayapath-ai-backend.onrender.com:${PORT}`);
});
