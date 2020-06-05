const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

// Connect Database
connectDB();

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Init Middleware
app.use(express.json({ extended: false }));

//For jelastic ssl use
app.enable('trust proxy');

//For local dev disable https conenction
//Only enable when delpolying to git and jelastic
app.use((req, res, next) => {
  if (req.secure) {
    // request was via https, so do no special handling
    next();
  } else {
    // request was via http, so redirect to https
    res.redirect('https://' + req.headers.host + req.url);
  }
});

// Static Folder
//app.use(express.static('./client/public'));

// Define Routes
app.use('/api/organizations', require('./routes/api/organizations'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/animals', require('./routes/api/animals'));

// Serve Static assets in production
// Set Static Folder
app.use(express.static('client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
