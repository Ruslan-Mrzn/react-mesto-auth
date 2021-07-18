import React from "react";

function InfoTooltip({isFail, isOpen , onClose}) {

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
    if (isOpen) {
      window.addEventListener('keydown', handleEscClose);
      window.addEventListener('click', handleOverlayClose);
    }

    return () => {
      window.removeEventListener('keydown', handleEscClose);
      window.removeEventListener('click', handleOverlayClose);
    }
  }, [isOpen, handleEscClose, handleOverlayClose])


  return (
    <>
      <article className={`page__popup popup popup_type_tooltip ${isOpen ? 'popup_opened' : ''} popup_bg-opacity_medium`}>
        <div className="popup__container popup__container_type_tooltip">
          <div className="form" name={`${isFail ? 'fail-tooltip-form' : 'success-tooltip-form'}`}>
            <p className="form__info">{isFail ? 'Что-то пошло не так! Попробуйте ещё раз.' : 'Вы успешно зарегистрировались!'}</p>
          </div>
          <button type="button" onClick={onClose} className="popup__close-button" value="закрыть форму" name="close-form" title="закрыть"></button>
        </div>
      </article>
    </>
  );
}

export default InfoTooltip;
