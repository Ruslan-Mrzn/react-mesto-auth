import React from "react";

function InfoTooltip({isSuccessOpened, isFailOpened, onClose}) {

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
    if (isSuccessOpened) {
      window.addEventListener('keydown', handleEscClose);
      window.addEventListener('click', handleOverlayClose);
    }

    return () => {
      window.removeEventListener('keydown', handleEscClose);
      window.removeEventListener('click', handleOverlayClose);
    }
  }, [isSuccessOpened, handleEscClose, handleOverlayClose])

  React.useEffect(() => {
    if (isFailOpened) {
      window.addEventListener('keydown', handleEscClose);
      window.addEventListener('click', handleOverlayClose);
    }

    return () => {
      window.removeEventListener('keydown', handleEscClose);
      window.removeEventListener('click', handleOverlayClose);
    }
  }, [isFailOpened, handleEscClose, handleOverlayClose])


  return (
    <>
      <article className={`page__popup popup popup_type_tooltip ${isSuccessOpened ? 'popup_opened' : ''} popup_bg-opacity_medium`}>
        <div className="popup__container popup__container_type_tooltip">
          <form className="form" name={`success-tooltip-form`}>
            <p className="form__info">Вы успешно зарегистрировались!</p>
          </form>
          <button type="button" onClick={onClose} className="popup__close-button" value="закрыть форму" name="close-form" title="закрыть"></button>
        </div>
      </article>

      <article className={`page__popup popup popup_type_tooltip ${isFailOpened ? 'popup_opened' : ''} popup_bg-opacity_medium`}>
        <div className="popup__container popup__container_type_tooltip">
          <form className="form" name={`fail-tooltip-form`}>
            <p className="form__info">Что-то пошло не так! Попробуйте ещё раз.</p>
          </form>
          <button type="button" onClick={onClose} className="popup__close-button" value="закрыть форму" name="close-form" title="закрыть"></button>
        </div>
      </article>
    </>
  );
}

export default InfoTooltip;
