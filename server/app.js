const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Import route modules
const apiKeyRoute = require('./routes/apiKey');

// Use the route modules
app.use('/api/apikey', apiKeyRoute);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
