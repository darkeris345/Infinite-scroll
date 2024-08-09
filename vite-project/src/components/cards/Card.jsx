import React, { useState, useRef, useEffect } from 'react';
import './Card.scss';
import Button from '../buttons/Button';
import API from '../../config.json';

const { imageUrl } = API;

function Card({ id, title, secret, server, ownername, setLikedItems, likedItems }) {
  const [isInfoShown, setIsInfoShown] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imgSrc = `${imageUrl}${server}/${id}_${secret}.jpg`;
  const isLiked = likedItems.includes(id);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Adjust the threshold as needed
    );
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [imgRef]);

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
    >
      <div
        className="media"
        ref={imgRef}
        style={{ backgroundImage: isVisible ? `url(${imgSrc})` : 'none' }}
        onLoad={() => setIsLoaded(true)}
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
          <em>{ownername}</em>
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