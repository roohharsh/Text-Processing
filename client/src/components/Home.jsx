import React, { useState } from 'react';
import axios from 'axios';
import '../css/home.css';

const Header = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const maxCharacters = 500;

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
      console.log(response)
      console.log(response.data)

      // Assuming the API response contains a 'paraphrasedText' property
      setOutputText(response.data.paraphrasedText.rewrite);
    } catch (error) {
      console.error('Error:', error);
      // Handle error or display an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="textArea">
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
          <button onClick={paraphraseText} disabled={isLoading}>
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
        ></textarea>
      </div>
    </div>
  );
};

export default Header;
