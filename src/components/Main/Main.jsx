import React, { useContext } from 'react';
import './Main.css';

import { Context } from "../../Context/context"; // Correct path

import { assets } from "../../assets/assets/gemini-clone-assets/assets/assets.js";

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span> Hello, Dev</span>
              </p>
              <p> How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p> Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card">
                <p> Briefly summarize this concept: urban planning </p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
              <div className="card">
                <p> Text inviting friend to a wedding</p>
                <img src={assets.message_icon} alt="Message Icon" />
              </div>
              <div className="card">
                <p> Give Python code</p>
                <img src={assets.code_icon} alt="Code Icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
          <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' && input.trim() !== '') {
        onSent(input); // Trigger on Enter key press
      }
    }}
    placeholder="Type a message..."
  />
           
        <div>
  <img src={assets.gallery_icon} alt="Gallery Icon" />
  <img src={assets.mic_icon} alt="Mic Icon" />

  {/* Send button logic */}
  {input ? (
    <img
      onClick={() => onSent(input)}
      src={assets.send_icon}
      alt="Send Icon"
    />
  ) : (
    <img
      src={assets.send_icon}
      alt="Send Icon"
      onClick={() => onSent(input)} // Ensures the button also works on click
    />
  )}

  {/* Input field */}
 
</div>


          </div>
          <p className="bottom-info">Gemini can make mistakes. Check important info.</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
