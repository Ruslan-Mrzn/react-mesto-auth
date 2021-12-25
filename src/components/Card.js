import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const handleClick = () => {
    onCardClick(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleCardDelete = () => {
    onCardDelete(card);
  }
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `photo-gallery__delete-item-button ${isOwn ? 'photo-gallery__delete-item-button_available' : ''}`
  );
  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `photo-card__like-button ${isLiked ? 'photo-card__like-button_type_active' : ''}`
  );


  return (
    <li className="photo-gallery__item">
      <article className="photo-card">
        <div className="photo-card__img-container">
          <img src={card.link} alt={card.name} className="photo-card__img" onClick={handleClick} />
        </div>
        <div className="photo-card__text-container">
          <h2 className="photo-card__title">{card.name}</h2>
          <div className="photo-card__likes-container">
            <button type="button" className={cardLikeButtonClassName} aria-label="лайкнуть фото" onClick={handleLikeClick}></button>
            <span className="photo-card__likes-counter">{card.likes.length}</span>
          </div>
        </div>
      </article>
      <button type="button" className={cardDeleteButtonClassName} aria-label="удалить фото" onClick={handleCardDelete}></button>
    </li>
  );
}

export default Card;
