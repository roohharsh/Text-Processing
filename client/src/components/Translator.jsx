import React, { useState } from 'react';
import axios from 'axios';
import '../css/translator.css';

const Translator = () => {
    const [sourceLanguage, setSourceLanguage] = useState('en');
    const [targetLanguage, setTargetLanguage] = useState('es');
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSourceLanguageChange = (e) => {
        setSourceLanguage(e.target.value);
    };

    const handleTargetLanguageChange = (e) => {
        setTargetLanguage(e.target.value);
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleTranslate = async () => {
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/api/apikey/translate', {
                source_language: sourceLanguage,
                target_language: targetLanguage,
                text: inputText,
            });

            console.log(response)

            setOutputText(response.data.translatedText);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="textArea">
            <div className="options">
                <div className="source language">
                    <select value={sourceLanguage} onChange={handleSourceLanguageChange}>
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                        {/* Add more language options */}
                    </select>
                </div>
                <hr />
                <div className="target language">
                    <select value={targetLanguage} onChange={handleTargetLanguageChange}>
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                        {/* Add more language options */}
                    </select>
                </div>
            </div>
            <hr />
            <div className="areas">
                <div className="firstArea">
                    <textarea
                        name="firstArea"
                        id="firstArea"
                        cols="30"
                        rows="10"
                        placeholder='Enter text to translate...'
                        value={inputText}
                        onChange={handleInputChange}
                    ></textarea>
                    <div className="translateButton">
                        <button className="button" onClick={handleTranslate} disabled={isLoading}>
                            Translate
                        </button>
                    </div>
                </div>
                <div className="secondArea">
                    <textarea
                        name="secondArea"
                        id="secondArea"
                        cols="30"
                        rows="10"
                        value={outputText}
                        readOnly
                    ></textarea>
                    <div className="copyButton">
                        <button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 448 512"
                            >
                                <path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Translator;
