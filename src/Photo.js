import React from "react";
import { useRef } from "react";

const Photo = ({ urls, likes, user }) => {
  const { regular } = urls;
  const {
    name,
    portfolio_url,
    profile_image: { medium },
  } = user;

  const photoInfoRef = useRef();

  const hoverHandler = () => {
    photoInfoRef.current.style.transform = "translateY(-60px)";
  };

  const nonHoverHandler = () => {
    photoInfoRef.current.style.transform = "translateY(0px)";
  };

  return (
    <article
      className="photo"
      onMouseOver={hoverHandler}
      onMouseOut={nonHoverHandler}
    >
      <img src={regular} alt="" />
      <div className="photo-info" ref={photoInfoRef}>
        <div>
          <h4>{name}</h4>
          <p>{likes} Likes</p>
        </div>
        <a href={portfolio_url} target="_blank" rel="noreferrer">
          <img src={medium} alt={name} className="user-img" />
        </a>
      </div>
    </article>
  );
};

export default Photo;
