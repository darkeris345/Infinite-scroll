import { useState, useEffect } from "react";
import List from "./components/List";
import "./App.scss";

const App = () => {
  const [likedItems, setLikedItems] = useState(() => {
    const saved = localStorage.getItem("likedItems");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("likedItems", JSON.stringify(likedItems));
  }, [likedItems]);

  return <List likedItems={likedItems} setLikedItems={setLikedItems} />;
};

export default App;
