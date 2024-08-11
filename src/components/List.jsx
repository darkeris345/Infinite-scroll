import { useState, useEffect } from "react";
import Card from "./cards/Card";
import { fetchImages } from "../services/FetchImages";
import "./List.scss";

const List = ({ likedItems, setLikedItems }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        const newImages = await fetchImages(page);
        setImages((prev) => [...prev, ...newImages]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    loadImages();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 250
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <ul className="imageGrid">
        {images.map((image) => (
          <Card
            key={image.id}
            id={image.id}
            title={image.title}
            owner={image.ownername}
            secret={image.secret}
            server={image.server}
            likedItems={likedItems}
            setLikedItems={setLikedItems}
          />
        ))}
      </ul>
      {loading && <p className="loading">Loading...</p>}
    </div>
  );
};

export default List;
