import { useState, useRef, useEffect } from "react";
import "./Card.scss";
import Button from "../buttons/Button";
import API from "../../config.json";

const { imageUrl } = API;

const Card = ({
  id,
  title,
  secret,
  server,
  owner,
  setLikedItems,
  likedItems,
}) => {
  const [isInfoShown, setIsInfoShown] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const imageSource = `${imageUrl}${server}/${id}_${secret}.png`;
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
      { threshold: 0.5 }
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
      className="imageCard"
      onMouseEnter={() => setIsInfoShown(true)}
      onMouseLeave={() => setIsInfoShown(false)}
    >
      <div
        className="media"
        ref={imgRef}
        style={{
          backgroundImage: isVisible ? `url(${imageSource})` : "none",
        }}
        onLoad={() => setIsLoaded(true)}
      />
      <div className="like">{isLiked ? <p>&#10084;</p> : ""}</div>
      {isInfoShown && (
        <div className="text">
          <h1 title={title}>{title}</h1>
          <hr />
          <p>{owner}</p>
          <Button
            handleLike={handleLike}
            label={isLiked ? "Unlike" : "Like"}
            isActive={isLiked}
          />
        </div>
      )}
    </li>
  );
};

export default Card;
