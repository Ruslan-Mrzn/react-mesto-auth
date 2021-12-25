import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import SubmitPopup from "./SubmitPopup";
import ImagePopup from "./ImagePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Switch} from 'react-router-dom';
import * as auth from '../utils/auth';
import { useHistory } from 'react-router';
import InfoTooltip from "./InfoTooltip";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [cardToDelete, setCardToDelete] = React.useState({});
  const [isLoadingApiRequest, setIsLoadingApiRequest] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [isAuthPopupOpen, setIsAuthPopupOpen] = React.useState(false);
  const [isAuthFail, setIsAuthFail] = React.useState(false);


  const history = useHistory();

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

  const handleCardDelete = (card) => {
    setIsSubmitPopupOpen(true);
    setCardToDelete(card);
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.error(err));
  }

  const handleSubmitCardDelete = (card) => {
    setIsLoadingApiRequest(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoadingApiRequest(false);
      })
  }

  const handleUpdateUser = (userData) => {
    setIsLoadingApiRequest(true);
    api.saveProfileData(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch(err => console.error(`Ошибка при обновлении данных профиля: ${err}`))
      .finally(() => {
        setIsLoadingApiRequest(false);
      })
  }

  const handleUpdateAvatar = (avatarUrl) => {
    setIsLoadingApiRequest(true);
    api.changeAvatar(avatarUrl.avatar)
      .then((newUserAvatarUrl) => {
        setCurrentUser(newUserAvatarUrl);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoadingApiRequest(false);
      })
  }

  const handleAddPlace = (photoData) => {
    setIsLoadingApiRequest(true);
    api.addNewCard(photoData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoadingApiRequest(false);
      })
  }

  const handleRegister = (password, email) => {
    auth.register(password, email)
      .then((res) => {
        if(res) {
          setIsAuthFail(false);
        }
      })
      .catch((err)=> {
        console.error(err);
        setIsAuthFail(true);
      })
      .finally(() => setIsAuthPopupOpen(true))
  }

  const handleLogin = (password, email) => {
    auth.authorize(password, email)
      .then((data) => {
        setLoggedIn(true);
        history.push({
          pathname: '/'
        })
      })
      .catch((err) => {
        console.error(err);
        setIsAuthFail(true);
        setIsAuthPopupOpen(true);
      })
  }

  // управляем закрытием модалки на регистрацию/авторизацию api запроса
  const closeAuthPopup = () => {
    setIsAuthPopupOpen(false);
    if (!isAuthFail) {
      history.push({
        pathname: '/signin'
      })
    }
  }

  const handleLogout = () => {
    auth.logout()
      .then(() => {
        setLoggedIn(false);
        history.push({
          pathname: '/signin'
        })
      })
      .catch((err) => console.error(err));
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsSubmitPopupOpen(false);
    setSelectedCard({});
  }

  const checkToken = React.useCallback(() => {
    auth.getContent()
      .then((data) => {
        if (data) {
          setUserData({...data})
          setLoggedIn(true)
          history.push({
            pathname: '/'
          })
        }
      })
      .catch((err) => console.error(err))
  }, [history]);

  React.useEffect(() => {
    checkToken();
  }, [checkToken, loggedIn])


  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, initialCards]) => {
      setCurrentUser(Object.assign(currentUser, user));
      setCards(initialCards);
    })
    .catch((err) => console.error(err));
  }, [loggedIn, currentUser])

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">

          <Header email={userData.email} onLogout={handleLogout} isLoggedIn={loggedIn}/>

          <EditProfilePopup isLoadingApiRequest={isLoadingApiRequest} popupName={'edit'} formName={'profile-edit'} onUpdateUser={handleUpdateUser} formTitle={'Редактировать профиль'} submitButtonValue={'Сохранить'} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />

          <EditAvatarPopup isLoadingApiRequest={isLoadingApiRequest} popupName={'avatar'} formName={'avatar-edit'} onUpdateAvatar={handleUpdateAvatar} formTitle={'Обновить аватар'} submitButtonValue={'Сохранить'} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}/>

          <AddPlacePopup isLoadingApiRequest={isLoadingApiRequest} popupName={'add'} formName={'photo-add'} onAddPlace={handleAddPlace} formTitle={'Новое место'} submitButtonValue={'Создать'} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>

          <SubmitPopup isLoadingApiRequest={isLoadingApiRequest} popupName={'submit'} card={cardToDelete} formName={'act-submit'} onSubmit={handleSubmitCardDelete} formTitle={'Вы уверены?'} submitButtonValue={'Да'} isOpen={isSubmitPopupOpen} onClose={closeAllPopups}/>

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip onClose={closeAuthPopup} isFail={isAuthFail} isOpen={isAuthPopupOpen} />

          <Switch>

            <Route path="/signup">
              <Register onRegister={handleRegister} />
            </Route>

            <Route path="/signin">
              <Login handleLogin={handleLogin} />
            </Route>

            <ProtectedRoute path={"/"} loggedIn={loggedIn}>
              <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
              <Footer />
            </ProtectedRoute>

          </Switch>
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
