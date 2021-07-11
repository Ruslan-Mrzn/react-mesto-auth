import React from "react";

function InfoTooltip() {

  return (
    <>
      <article className={`page__popup popup popup_type_tooltip popup_bg-opacity_medium`}>
        <div className="popup__container popup__container_type_tooltip">
          <form className="form" name={`success-tooltip-form`}>
            <p className="form__info">Вы успешно зарегистрировались!</p>
          </form>
          <button type="button" className="popup__close-button" value="закрыть форму" name="close-form" title="закрыть форму"></button>
        </div>
      </article>

      <article className={`page__popup popup popup_type_tooltip popup_bg-opacity_medium`}>
        <div className="popup__container popup__container_type_tooltip">
          <form className="form" name={`fail-tooltip-form`}>
            <p className="form__info">Что-то пошло не так! Попробуйте ещё раз.</p>
          </form>
          <button type="button" className="popup__close-button" value="закрыть форму" name="close-form" title="закрыть форму"></button>
        </div>
      </article>
    </>
  );
}

export default InfoTooltip;
