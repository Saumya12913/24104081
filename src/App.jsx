import React, { useState, useEffect } from 'react';
const QuoteGenerator = () => {
  const [quote, setQuote] = useState({ content: '', author: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://quotable.io');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (data && data.length > 0) {
        setQuote({
          content: data[0].content,
          author: data[0].author
        });
      }
    } catch (err) {
      setError('Failed to fetch a new quote. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchQuote();
  }, []);
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Random Quote Generator</h2>
        {loading && <p style={styles.infoText}>Loading quote...</p>}
        {error && <p style={styles.errorText}>{error}</p>}
        {!loading && !error && (
          <div style={styles.quoteBox}>
            <p style={styles.content}>"{quote.content}"</p>
            <h4 style={styles.author}>— {quote.author || 'Unknown'}</h4>
          </div>
        )}
        <button 
          onClick={fetchQuote} 
          disabled={loading} 
          style={styles.button}
        >
          {loading ? 'Fetching...' : 'New Quote'}
        </button>
      </div>
    </div>
  );
};
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '90%',
    textAlign: 'center',
  },
  title: {
    margin: '0 0 20px 0',
    color: '#333',
  },
  quoteBox: {
    minHeight: '120px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  content: {
    fontSize: '1.2rem',
    fontStyle: 'italic',
    color: '#555',
    lineHeight: '1.5',
  },
  author: {
    textAlign: 'right',
    color: '#777',
    marginTop: '10px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  infoText: {
    color: '#666',
  },
  errorText: {
    color: '#dc3545',
  }
};
export default QuoteGenerator;