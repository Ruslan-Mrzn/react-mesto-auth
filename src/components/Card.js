function Card({card, onCardClick}) {
  const handleClick = () => {
    onCardClick(card);
  }
  return (
    <li className="photo-gallery__item">
      <article className="photo-card">
        <div className="photo-card__img-container">
          <img src={card.link} alt={card.name} className="photo-card__img" onClick={handleClick} />
        </div>
        <div className="photo-card__text-container">
          <h2 className="photo-card__title">{card.name}</h2>
          <div className="photo-card__likes-container">
            <button type="button" className="photo-card__like-button" aria-label="лайкнуть фото"></button>
            <span className="photo-card__likes-counter">{card.likes.length}</span>
          </div>
        </div>
      </article>
      <button type="button" className="photo-gallery__delete-item-button" aria-label="удалить фото"></button>
    </li>
  );
}

export default Card;
