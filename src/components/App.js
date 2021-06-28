import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    // выполнение запросов получения информации о пользователе и начальных карточек
    Promise.all([api.getUserInfo(), api.getInitialCards()]) // ждем выполнения обоих запросов (порядок важен!)
    .then(([user, initialCards]) => {
      setCurrentUser(user);
      setCards(initialCards);
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

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.error(err));
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
      .catch((err) => console.error(err));
  }

  const handleUpdateUser = (userData) => {
    api.saveProfileData(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка при обновлении данных профиля: ${err}`))
  }

  const handleUpdateAvatar = (avatarUrl) => {
    api.changeAvatar(avatarUrl.avatar)
      .then((newUserAvatarUrl) => {
        setCurrentUser([newUserAvatarUrl]);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  const handleAddPlace = (photoData) => {
    console.log(photoData);
    api.addNewCard(photoData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">

          <Header />

          <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>

          <Footer />
        </div>

        <EditProfilePopup popupName={'edit'} formName={'profile-edit'} onUpdateUser={handleUpdateUser} formTitle={'Редактировать профиль'} submitButtonValue={'Сохранить'} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <EditAvatarPopup popupName={'avatar'} formName={'avatar-edit'} onUpdateAvatar={handleUpdateAvatar} formTitle={'Обновить аватар'} submitButtonValue={'Сохранить'} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}/>
        <AddPlacePopup popupName={'add'} formName={'photo-add'} onAddPlace={handleAddPlace} formTitle={'Новое место'} submitButtonValue={'Создать'} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>

        {/* <PopupWithForm popupName={'edit'} formName={'profile-edit'} formTitle={'Редактировать профиль'} submitButtonValue={'Сохранить'} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <input type="text" className="form__text-input"  name="name" placeholder="Имя" required minLength="2" maxLength="40" />
          <span className="form__error name-error"></span>
          <input type="text" className="form__text-input"  name="about" placeholder="Расскажите о себе" required minLength="2" maxLength="200" />
          <span className="form__error about-error"></span>
        </PopupWithForm> */}


        {/* <PopupWithForm popupName={'add'} formName={'photo-add'} formTitle={'Новое место'} submitButtonValue={'Создать'} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <input type="text" className="form__text-input"  name="title" placeholder="Название" required minLength="2" maxLength="30" />
          <span className="form__error title-error"></span>
          <input type="url" className="form__text-input"  name="url" placeholder="Ссылка на картинку" required />
          <span className="form__error url-error"></span>
        </PopupWithForm> */}

        {/* <PopupWithForm popupName={'avatar'} formName={'avatar-edit'} formTitle={'Обновить аватар'} submitButtonValue={'Сохранить'} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <input type="url" className="form__text-input"  name="avatar" placeholder="Ссылка на аватарку" required />
          <span className="form__error avatar-error"></span>
        </PopupWithForm> */}

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
