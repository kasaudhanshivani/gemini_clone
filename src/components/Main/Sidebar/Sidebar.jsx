import React, { useContext, useState, useEffect } from 'react';
import './Sidebar.css';
import { Context } from "../../../Context/context";
import { assets } from '../../../assets/assets/gemini-clone-assets/assets/assets.js';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { onSent, prevPrompts, setRecentPrompts, setRecentPrompt } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newDarkMode = !prev;
      // Toggle dark mode class on body
      document.body.classList.toggle('dark-mode', newDarkMode);
      // Store the dark mode preference in local storage
      localStorage.setItem('darkMode', newDarkMode);
      return newDarkMode;
    });
  };

  // Load the dark mode preference on component mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    document.body.classList.toggle('dark-mode', savedDarkMode);
  }, []);

  return (
    <div className={`sidebar ${isDarkMode ? 'dark' : ''}`}>
      <div className="top">
        <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="Menu Icon" />
        <div className="new-chat">
          <img src={assets.plus_icon} alt="plus_icon" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                <img src={assets.message_icon} alt="Message Icon" />
                <p>{item.slice(0, 18)}.....</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry" onClick={toggleDarkMode}>
          <img src={assets.download} alt="Settings Icon" />
          {extended ? <p>{isDarkMode ? '' : ''}</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Help Icon" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="Activity Icon" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Setting Icon" />
          {extended ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
