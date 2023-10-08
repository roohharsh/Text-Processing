const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Import route modules
const paraphraseRoute = require('./routes/paraphrase');
const translateRoute = require('./routes/translator');

// Use the route modules
app.use('/api/apikey', paraphraseRoute);
app.use('/api/apikey', translateRoute);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
