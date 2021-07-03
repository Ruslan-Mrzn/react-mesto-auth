import React from "react";

function ImagePopup({card, onClose}) {

  const handleEscClose = React.useCallback( (evt) => {
    if (evt.key ==='Escape') {
      onClose();
    }
  }, [onClose])

  const handleOverlayClose = React.useCallback( (evt) => {

    if (evt.target.classList.contains('popup_opened')) {
      onClose();
    }
  }, [onClose])

  React.useEffect(() => {
    if (card.name) {
      window.addEventListener('keydown', handleEscClose);
      window.addEventListener('click', handleOverlayClose);
    }

    return () => {
      window.removeEventListener('keydown', handleEscClose);
      window.removeEventListener('click', handleOverlayClose);
    }
  }, [card, handleEscClose, handleOverlayClose])

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
