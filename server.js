const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('API running'));

// Static Folder
app.use(express.static('./client/public'));

// Define Routes
app.use('/api/organizations', require('./routes/api/organizations'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/animals', require('./routes/api/animals'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
