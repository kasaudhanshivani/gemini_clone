import React, { useContext, useState, useEffect } from 'react';
import './Sidebar.css';

import { Context } from "../../Context/context";

// Import assets directly
import menu_icon from '../../assets/menu_icon.png';
import plus_icon from '../../assets/plus_icon.png';
import message_icon from '../../assets/message_icon.png';
import download from '../../assets/download.png';
import question_icon from '../../assets/question_icon.png';
import history_icon from '../../assets/history_icon.png';
import setting_icon from '../../assets/setting_icon.png';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newDarkMode = !prev;
      document.body.classList.toggle('dark-mode', newDarkMode);
      localStorage.setItem('darkMode', newDarkMode);
      return newDarkMode;
    });
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    document.body.classList.toggle('dark-mode', savedDarkMode);
  }, []);

  return (
    <div className={`sidebar ${isDarkMode ? 'dark' : ''}`}>
      <div className="top">
        <img onClick={() => setExtended(prev => !prev)} className='menu' src={menu_icon} alt="Menu Icon" />
        <div className="new-chat">
          <img src={plus_icon} alt="plus_icon" />
          {extended && <p>New Chat</p>}
        </div>
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                <img src={message_icon} alt="Message Icon" />
                <p>{item.slice(0, 18)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry" onClick={toggleDarkMode}>
          <img src={download} alt="Settings Icon" />
          {extended && <p>{isDarkMode ? '' : ''}</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={question_icon} alt="Help Icon" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={history_icon} alt="Activity Icon" />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={setting_icon} alt="Setting Icon" />
          {extended && <p>Setting</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
