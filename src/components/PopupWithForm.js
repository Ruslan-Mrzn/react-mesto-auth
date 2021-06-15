function PopupWithForm({popupName, formName, formTitle, submitButtonValue, children, isOpen, onClose}) {
  return (
    <article className={`page__popup popup popup_type_${popupName} popup_bg-opacity_medium ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <form className="form" name={`${formName}-form`} noValidate>
          <h2 className="form__title">{formTitle}</h2>
          {children}
          <button type="submit" className="form__submit-button" value={submitButtonValue}>{submitButtonValue}</button>
        </form>
        <button type="button" onClick={onClose} className="popup__close-button" value="закрыть форму" name="close-form" title="закрыть форму"></button>
      </div>
    </article>
  );
}

export default PopupWithForm;
