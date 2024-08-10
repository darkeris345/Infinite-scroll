import { useState, useEffect } from 'react';
import List from './components/List';
import './App.scss';

function App() {
  const [likedItems, setLikedItems] = useState(() => {
    const saved = localStorage.getItem('likedItems');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('likedItems', JSON.stringify(likedItems));
  }, [likedItems]);

  return (
    <div className="infApp">
      <List likedItems={likedItems} setLikedItems={setLikedItems} />
    </div>
  );
}

export default App;