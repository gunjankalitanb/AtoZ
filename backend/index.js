const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log('Before route import');
const inspirationRoutes = require('./routes/inspirationRoutes');
console.log('After route import');

app.use('/api', inspirationRoutes);
app.use('/api/auth', authRoutes);


app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});
