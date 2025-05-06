// src/Context/context.jsx
import React, { createContext, useState } from 'react';
import runChat from '../config/gemini'; // Ensure path is correct

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [recentPrompt, setRecentPrompt] = useState("");
  const [resultData, setResultData] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const onSent = async (prompt) => {
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(prompt);
    setPrevPrompts((prev) => [...prev, prompt]);
    setInput("");

    try {
      const response = await runChat(prompt); // Gemini API Call
      setResultData(response);
    } catch (error) {
      setResultData("❌ Failed to fetch response. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Context.Provider value={{
      onSent,
      prevPrompts,
      setRecentPrompt,
      setInput,
      input,
      recentPrompt,
      resultData,
      loading,
      showResult,
    }}>
      {children}
    </Context.Provider>
  );
};
