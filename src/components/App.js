import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const[currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api.getUserInfo()
      .then((user) => {
        setCurrentUser(user)
      })
      .catch((err) => console.error(err))
  }, [])

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }



  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">

          <Header />

          <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>

          <Footer />
        </div>

        <PopupWithForm popupName={'edit'} formName={'profile-edit'} formTitle={'Редактировать профиль'} submitButtonValue={'Сохранить'} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <input type="text" className="form__text-input"  name="name" placeholder="Имя" required minLength="2" maxLength="40" />
          <span className="form__error name-error"></span>
          <input type="text" className="form__text-input"  name="about" placeholder="Расскажите о себе" required minLength="2" maxLength="200" />
          <span className="form__error about-error"></span>
        </PopupWithForm>

        <PopupWithForm popupName={'add'} formName={'photo-add'} formTitle={'Новое место'} submitButtonValue={'Создать'} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <input type="text" className="form__text-input"  name="title" placeholder="Название" required minLength="2" maxLength="30" />
          <span className="form__error title-error"></span>
          <input type="url" className="form__text-input"  name="url" placeholder="Ссылка на картинку" required />
          <span className="form__error url-error"></span>
        </PopupWithForm>

        <PopupWithForm popupName={'avatar'} formName={'avatar-edit'} formTitle={'Обновить аватар'} submitButtonValue={'Сохранить'} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <input type="url" className="form__text-input"  name="avatar" placeholder="Ссылка на аватарку" required />
          <span className="form__error avatar-error"></span>
        </PopupWithForm>

        <PopupWithForm popupName={'submit'} formName={'act-submit'} formTitle={'Вы уверены?'} submitButtonValue={'Да'} onClose={closeAllPopups}>
          <input type="url" className="form__text-input"  name="avatar" placeholder="Ссылка на аватарку" required />
          <span className="form__error avatar-error"></span>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
