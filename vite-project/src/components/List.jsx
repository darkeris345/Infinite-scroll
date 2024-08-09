import { useState, useEffect } from 'react';
import Card from './cards/Card';
import { fetchImages } from '../services/FetchImages';

const List = ({ likedItems, setLikedItems }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      const newImages = await fetchImages(page);
      setImages((prev) => [...prev, ...newImages]);
      setLoading(false);
    };
    loadImages();
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ul className="imageGrid">
      {images.map((image) => (
        <Card
          key={image.id}
          id={image.id}
          title={image.title}
          secret={image.secret}
          server={image.server}
          description={image.description}
          ownername={image.ownername}
          likedItems={likedItems}
          setLikedItems={setLikedItems}
        />
      ))}
      {loading && <p>Loading...</p>}
    </ul>
  );
};

export default List;