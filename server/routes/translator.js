const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const rapidApiKey = process.env.TRANSLATOR_API_KEY;
const apiUrl = 'https://text-translator2.p.rapidapi.com/translate';

// Route for language detection
router.post('/detect-language', async (req, res) => {
  try {
    const textToDetect = req.body.text;

    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': rapidApiKey,
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
    };

    const encodedParams = new URLSearchParams();
    encodedParams.set('q', textToDetect);

    const options = {
      method: 'POST',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/detect',
      headers: headers,
      data: encodedParams,
    };

    const response = await axios.request(options);

    const detectedLanguage = response.data.data.detections[0][0].language; // Extract detected language

    res.json({ detectedLanguage });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while detecting the language.' });
  }
});

// Route for translation
router.post('/translate', async (req, res) => {
  try {
    const textToTranslate = req.body.text;
    const sourceLanguage = req.body.source_language;
    const targetLanguage = req.body.target_language;

    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': rapidApiKey,
      'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
    };

    const encodedParams = new URLSearchParams();
    encodedParams.set('source_language', sourceLanguage);
    encodedParams.set('target_language', targetLanguage);
    encodedParams.set('text', textToTranslate);

    const options = {
      method: 'POST',
      url: apiUrl,
      headers: headers,
      data: encodedParams,
    };

    const response = await axios.request(options);

    const translatedText = response.data.translatedText;

    res.json({ translatedText });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while translating the text.' });
  }
});

module.exports = router;
