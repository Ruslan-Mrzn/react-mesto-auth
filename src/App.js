import logo from './images/header__logo.svg'
function App() {
  return (
    <div className="root" id="root">
      <body className="page">
      <div className="page__container">
        <header className="page__header header">
          <img className="header__logo" src={logo} alt="логотип место" />
        </header>
        <main className="page__content content">
          <section className="page__profile profile">
            <div className="profile__avatar">
              <img src="#" alt="Аватар пользователя" className="profile__img" />
            </div>
            <div className="profile__info">
              <div className="profile__edit">
                <h1 className="profile__name"></h1>
                <button className="profile__edit-button" type="button" value="редактировать профиль"></button>
              </div>
              <p className="profile__description"></p>
            </div>
            <button className="profile__add-button" type="button" value="добавить фотографию"></button>
          </section>

          <section className="page__photo-gallery photo-gallery">
            <ul className="photo-gallery__list">

            </ul>
          </section>
        </main>

        <footer className="page__footer footer">
          <p className="footer__copyright">&copy; 2020 Mesto Russia</p>
        </footer>
      </div>

      <article className="page__popup popup popup_type_edit popup_bg-opacity_medium">
        <div className="popup__container">
          <form className="form" name="profile-edit-form" novalidate>
            <h2 className="form__title">Редактировать профиль</h2>
            <input type="text" className="form__text-input" value="" name="name" required minlength="2" maxlength="40" />
            <span className="form__error name-error"></span>
            <input type="text" className="form__text-input" value="" name="about" required minlength="2" maxlength="200" />
            <span className="form__error about-error"></span>
            <button type="submit" className="form__submit-button" name="profile-submit" value="Сохранить">Сохранить</button>
          </form>
          <button type="button" className="popup__close-button" value="закрыть форму" name="close-form" title="закрыть форму"></button>
        </div>
      </article>

      <article className="page__popup popup popup_type_add popup_bg-opacity_medium">
        <div className="popup__container">
          <form className="form" name="photo-add-form" novalidate>
            <h2 className="form__title">Новое место</h2>
            <input type="text" className="form__text-input" value="" name="title" placeholder="Название" required minlength="2" maxlength="30" />
            <span className="form__error title-error"></span>
            <input type="url" className="form__text-input" value="" name="url" placeholder="Ссылка на картинку" required />
            <span className="form__error url-error"></span>
            <button type="submit" className="form__submit-button" name="new-photo-submit" value="Создать">Создать</button>
          </form>
          <button type="button" className="popup__close-button" value="закрыть форму" name="close-form" title="закрыть форму"></button>
        </div>
      </article>

      <article className="page__popup popup popup_type_avatar popup_bg-opacity_medium">
        <div className="popup__container">
          <form className="form" name="avatar-edit-form" novalidate>
            <h2 className="form__title">Обновить аватар</h2>
            <input type="url" className="form__text-input" value="" name="avatar" placeholder="Ссылка на аватарку" required />
            <span className="form__error avatar-error"></span>
            <button type="submit" className="form__submit-button" name="edit-avatar-submit" value="Сохранить">Сохранить</button>
          </form>
          <button type="button" className="popup__close-button" value="закрыть форму" name="close-form" title="закрыть форму"></button>
        </div>
      </article>

      <article className="page__popup popup popup_type_submit popup_bg-opacity_medium">
        <div className="popup__container">
          <form className="form" name="act-submit-form" novalidate>
            <h2 className="form__title">Вы уверены?</h2>
            <button type="submit" className="form__submit-button" name="act-submit" value="Да">Да</button>
          </form>
          <button type="button" className="popup__close-button" value="закрыть форму" name="close-form" title="закрыть форму"></button>
        </div>
      </article>

      <article className="page__popup popup popup_type_image popup_bg-opacity_high">
        <div className="image-popup">
          <figure className="image-popup__container">
            <img className="image-popup__photo" src="#" alt="картинка" />
            <figcaption className="image-popup__title"></figcaption>
          </figure>
          <button type="button" className="popup__close-button" value="закрыть окно просмотра" name="close-window" title="закрыть"></button>
        </div>
      </article>

      <template className="template-photo-card">
        <li className="photo-gallery__item">
          <article className="photo-card">
            <div className="photo-card__img-container">
              <img src="#" alt="картинка" className="photo-card__img" />
            </div>
            <div className="photo-card__text-container">
              <h2 className="photo-card__title"></h2>
              <div className="photo-card__likes-container">
                <button type="button" className="photo-card__like-button" aria-label="лайкнуть фото"></button>
                <span className="photo-card__likes-counter"></span>
              </div>
            </div>
          </article>
          <button type="button" className="photo-gallery__delete-item-button" aria-label="удалить фото"></button>
        </li>
      </template>
    </body>
    </div>
  );
}

export default App;
