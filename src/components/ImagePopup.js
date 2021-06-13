function ImagePopup() {
  return (
    <article className="page__popup popup popup_type_image popup_bg-opacity_high">
      <div className="image-popup">
        <figure className="image-popup__container">
          <img className="image-popup__photo" src="#" alt="картинка" />
          <figcaption className="image-popup__title"></figcaption>
        </figure>
        <button type="button" className="popup__close-button" value="закрыть окно просмотра" name="close-window" title="закрыть"></button>
      </div>
    </article>
  );
}

export default ImagePopup;
