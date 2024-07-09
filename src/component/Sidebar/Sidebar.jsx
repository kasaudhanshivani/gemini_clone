
import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { Context } from '../../context/context';

const Sidebar = () => {


  const [extended, setExtended] = useState(false)
  const { onSent, prevPrompts, setRecentPrompts } = useContext(Context)
  const loadPrompt =async(prompt)=>{
    setRecentPrompt(prompt)
     await onSent(prompt)
  }
  return (
    <div className='sidebar'>
      <div className="top">
        <img onClick={() => setExtended(prev => !prev)} className='menu' src="/src\assets\assets.js\menu_icon.png" alt="Menu Icon" />
        <div className="new-chat">
          <img src="src\assets\assets.js\plus_icon.png" alt="plus_icon" />
          {extended ? <p> New Chat </p> : null}
        </div>
        {extended ?
          <div className="recent">
            <p className="recent-title">  Recent</p>
            {
              prevPrompts.map((item, index) => {
                return (
                  <div  onClick={()=>loadPrompt()}className="recent-entry">
                    <img src="src\assets\assets.js\message_icon.png" alt="" />
                    <p> {item.slice(0,18)}.....</p>
                  </div>)


              })
            }
           
          </div> : null
        }
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src="src\assets\assets.js\question_icon.png" alt="" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src="src\assets\assets.js\history_icon.png" alt="" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src="src\assets\assets.js\setting_icon.png" alt="" />
          {extended ? <p>Setting</p> : null}
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
