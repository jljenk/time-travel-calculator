import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import calculateRouter from './routes/calculate.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api', calculateRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  // From /app/backend, go up one level to /app, then into frontend
  const frontendPath = join(__dirname, '..', 'frontend');
  app.use(express.static(frontendPath));
  
  app.get('*', (req, res) => {
    res.sendFile(join(frontendPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

