const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const rapidApiKey = process.env.PARAPHRASE_API_KEY;

const apiUrl = 'https://rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com/rewrite';

router.post('/generate', async (req, res) => {
  try {
    const textToParaphrase = req.body.text;

    const headers = {
      'content-type': 'application/json',
      'X-RapidAPI-Key': rapidApiKey,
      'X-RapidAPI-Host': 'rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com',
    };

    const requestData = {
      language: 'en',
      strength: 3,
      text: textToParaphrase,
    };

    const response = await axios.post(apiUrl, requestData, { headers });
    const paraphrasedText = response.data;
    res.json({ paraphrasedText });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while paraphrasing the text.' });
  }
});

module.exports = router;
