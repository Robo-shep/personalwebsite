import React, { useState, useRef, useEffect } from 'react';
import './Terminal.css';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to the terminal. Type "help" to see available commands.' }
  ]);
  
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when history updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Keep focus on the hidden input when clicking anywhere in the terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const processCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let outputText = '';

    switch (trimmedCmd) {
      case 'help':
        outputText = 'Available commands: about, skills, clear, echo [text]';
        break;
      case 'about':
        outputText = 'Software Engineer currently focused on building and optimizing AI architectures.';
        break;
      case 'skills':
        outputText = 'Languages/Frameworks: React, Node.js, Express.js, JavaScript \nConcepts: Neural Networks (LSTM, PPO), Multi-threading, GPU Optimization';
        break;
      case 'clear':
        setHistory([]);
        return;
      case '':
        outputText = '';
        break;
      default:
        if (trimmedCmd.startsWith('echo ')) {
          outputText = cmd.substring(5);
        } else {
          outputText = `Command not found: ${cmd}. Type "help" for a list of commands.`;
        }
    }

    // Append the user's input and the system's output to the history
    setHistory((prev) => [
      ...prev,
      { type: 'input', text: `visitor@portfolio:~$ ${cmd}` },
      ...(outputText ? [{ type: 'output', text: outputText }] : [])
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      processCommand(input);
      setInput('');
    }
  };

  return (
    <div className="terminal-container" onClick={handleTerminalClick}>
      <div className="terminal-history">
        {history.map((line, index) => (
          <div 
            key={index} 
            className={`terminal-line ${line.type === 'input' ? 'terminal-input-line' : 'terminal-output-line'}`}
          >
            {/* Using pre-wrap to respect newline characters in our output strings */}
            <span style={{ whiteSpace: 'pre-wrap' }}>{line.text}</span>
          </div>
        ))}
      </div>
      
      <div className="terminal-prompt">
        <span className="prompt-label">visitor@portfolio:~$ </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck="false"
          autoComplete="off"
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default Terminal;