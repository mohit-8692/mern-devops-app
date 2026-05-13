import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    axios.get('api/data').then(res => setItems(res.data));
  }, []);

  const handleSubmit = () => {
    axios.post('api/data', { name: input }).then(res => {
      setItems([...items, res.data]);
      setInput('');
    });
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>MERN Full Setup</h2>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSubmit}>Save to DB</button>
      <ul>
        {items.map((item, i) => <li key={i}>{item.name}</li>)}
      </ul>
    </div>
  );
}
export default App;