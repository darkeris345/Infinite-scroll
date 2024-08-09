import { useState, useEffect, useRef } from 'react';
import Button from '../buttons/Button';
import configAPI from '../../config.json';

const { imageUrl } = configAPI;

function Card({ id, title, secret, server, ownername, setLikedItems, likedItems }) {
  const [isInfoShown, setIsInfoShown] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef();
  const imgSrc = `${imageUrl}${server}/${id}_${secret}.jpg`;
  const isLiked = likedItems.includes(id);

  useEffect(() => {
    const handleScroll = () => {
      if (imgRef.current && imgRef.current.getBoundingClientRect().top < window.innerHeight) {
        setIsLoaded(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleLike() {
    setLikedItems((prev) =>
      isLiked ? prev.filter((item) => item !== id) : [...new Set([...prev, id])]
    );
  }

  return (
    <li
      className="card"
      onMouseEnter={() => setIsInfoShown(true)}
      onMouseLeave={() => setIsInfoShown(false)}
      ref={imgRef}
    >
      <div
        className="media"
        style={{ backgroundImage: isLoaded ? `url(${imgSrc})` : 'none' }}
      />
      {isLiked && (
        <div className="star">
          <i>&#10084;</i>
        </div>
      )}
      {isInfoShown && (
        <section className="content">
          <strong title={title}>{title}</strong>
          <hr />
          <p>{ownername}</p>
          <Button
            handleLike={handleLike}
            label={isLiked ? 'Dislike' : 'Like'}
            isActive={isLiked}
          />
        </section>
      )}
    </li>
  );
}

export default Card;