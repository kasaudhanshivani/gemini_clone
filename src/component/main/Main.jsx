import React, { useContext } from 'react';
import './Main.css';
import { Context } from '../../context/context';

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src="/src/assets/assets.js/user_icon.png" alt="User Icon" />
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
                <img src="/src/assets/assets.js/compass_icon.png" alt="" />
              </div>
              <div className="card">
                <p> Briefly summarize this concept: urban planning </p>
                <img src="/src/assets/assets.js/bulb_icon.png" alt="" />
              </div>
              <div className="card">
                <p> Text inviting friend to a wedding</p>
                <img src="/src/assets/assets.js/message_icon.png" alt="" />
              </div>
              <div className="card">
                <p> Give Python code</p>
                <img src="/src/assets/assets.js/code_icon.png" alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src="/src/assets/assets.js/user_icon.png" alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src="/src/assets/assets.js/gemini_icon.png" alt="" />
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
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Search"
            />
            <div>
              <img src="/src/assets/assets.js/gallery_icon.png" alt="" />
              <img src="/src/assets/assets.js/mic_icon.png" alt="" />
              {input ? <img onClick={() => onSent()} src="/src/assets/assets.js/send_icon.png" alt="" />
                : null}                        </div>
          </div>
          <p className="bottom-info">Gemini can make mistakes. Check important info.</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
