function ImagePopup({card, onClose}) {
  return (
    <article className={`page__popup popup popup_type_image popup_bg-opacity_high ${card.name ? 'popup_opened' : ''}`}>
      <div className="image-popup">
        <figure className="image-popup__container">
          <img className="image-popup__photo" src={card.link} alt="картинка" />
          <figcaption className="image-popup__title">{card.name}</figcaption>
        </figure>
        <button type="button" onClick={onClose} className="popup__close-button" value="закрыть окно просмотра" name="close-window" title="закрыть"></button>
      </div>
    </article>
  );
}

export default ImagePopup;
