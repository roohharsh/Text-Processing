import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../css/home.css';

const Home = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const maxCharacters = 500;

  const outputTextareaRef = useRef(null);

  const handleInputChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxCharacters) {
      setInputText(text);
    }
  };

  const paraphraseText = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/apikey/generate', { text: inputText });
      console.log(response);
      console.log(response.data);

      // Assuming the API response contains a 'paraphrasedText' property
      setOutputText(response.data.paraphrasedText.rewrite);
    } catch (error) {
      console.error('Error:', error);
      // Handle error or display an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (outputTextareaRef.current) {
      outputTextareaRef.current.select();
      document.execCommand('copy');
    }
  };

  return (
    <div className="textArea">
      <div className="heading">
        Paraphraser
      </div>
      <hr />
      <div className="areas">
        <div className="firstArea">
          <textarea
            name="firstArea"
            id="firstArea"
            cols="30"
            rows="10"
            value={inputText}
            onChange={handleInputChange}
            placeholder='To rewrite text, enter or paste it here and press "Paraphrase."'
          ></textarea>
          <div className="paraphraseButton">
            <button className="button">
              Upload Doc
            </button>
            <button className="button" onClick={paraphraseText} disabled={isLoading}>
              Paraphrase
            </button>
            {isLoading && <span>Loading...</span>}
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
            ref={outputTextareaRef}
          ></textarea>
          <div className="copyButton">
            <button onClick={copyToClipboard}>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
