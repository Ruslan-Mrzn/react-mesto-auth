import React from "react";

function PopupWithForm({popupName, formName, formTitle, submitButtonValue, children, isOpen, onClose, onSubmit, formIsValid, isLoadingApiRequest, loadingApiRequestText}) {

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
    <article className={`page__popup popup popup_type_${popupName} popup_bg-opacity_medium ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <form className="form" name={`${formName}-form`} onSubmit={onSubmit} noValidate>
          <h2 className="form__title">{formTitle}</h2>
          {children}
          <button type="submit" disabled={formIsValid ? false : true} className={`form__submit-button ${formIsValid ? '' : 'form__submit-button_disabled'}`} value={submitButtonValue}>{isLoadingApiRequest ? loadingApiRequestText : submitButtonValue}</button>
        </form>
        <button type="button" onClick={onClose} className="popup__close-button" value="закрыть форму" name="close-form" title="закрыть форму"></button>
      </div>
    </article>
  );
}

export default PopupWithForm;
