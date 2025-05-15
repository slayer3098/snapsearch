import React, { useState, useEffect } from 'react';

const SearchBar = ({ query, onChange, onSubmit, suggestions }) => {
  const [queryInput, setQueryInput] = useState(query);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    setQueryInput(query); // Sync with parent query
  }, [query]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setQueryInput(input);
    onChange(e);

    if (input) {
      const filtered = suggestions.filter((word) =>
        word.toLowerCase().startsWith(input.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQueryInput(suggestion);
    onChange({ target: { value: suggestion } });

    // Wait for state to sync, then call onSubmit
    setTimeout(() => {
      onSubmit({ preventDefault: () => {} });
    }, 0);

    setFilteredSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit(e);
    }
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Your browser does not support voice recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const voiceQuery = event.results[0][0].transcript;
      setQueryInput(voiceQuery);
      onChange({ target: { value: voiceQuery } });

      // Trigger search
      setTimeout(() => {
        onSubmit({ preventDefault: () => {} });
      }, 0);
    };

    recognition.onerror = (event) => {
      alert('Voice recognition error: ' + event.error);
    };
  };

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        value={queryInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for images..."
        style={{
          width: '300px',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      <button
        type="button"
        onClick={handleVoiceSearch}
        style={{
          marginLeft: '8px',
          padding: '8px 12px',
          border: 'none',
          background: '#007bff',
          color: 'white',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        🎤
      </button>
      {filteredSuggestions.length > 0 && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#fff',
            border: '1px solid #ddd',
            maxHeight: '200px',
            overflowY: 'auto',
            padding: 0,
            margin: 0,
            listStyleType: 'none',
            zIndex: 10,
          }}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              style={{
                padding: '8px',
                cursor: 'pointer',
                background: '#f9f9f9',
              }}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
