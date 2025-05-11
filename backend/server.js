const express = require('express');
const cors = require('cors');
const inspirationRoutes = require('./routes/inspirationRoutes');
const prisma = require('./utils/prismaClient');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Routes
app.use('/api', inspirationRoutes);

// Health check
app.get('/', (req, res) => res.send('API is running'));

app.use('/screenshots', express.static(path.join(__dirname, 'screenshots')));



const PORT = process.env.PORT || 5000;

// Start server only if DB is connected
async function startServer() {
  try {
  
    await prisma.$connect();
    console.log('✅ Connected to MongoDB via Prisma');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  }
}

startServer();
