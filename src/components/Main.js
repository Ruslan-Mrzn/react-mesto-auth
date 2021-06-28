import React from "react";
import {api} from '../utils/api';
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

  const currentUser = React.useContext(CurrentUserContext);
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    api.getInitialCards()
      .then((initialCards) => {
      setCards(initialCards);
    })
    .catch((err) => console.error(err))
  }, [])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.error(err));

    // if (isLiked) {
    //   api.unlikeCard(card._id)
    //     .then((newCard) => {
    //       setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    //   });
    // } else {
    //   api.likeCard(card._id)
    //     .then((newCard) => {
    //       setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    //   });
    // }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
  }

  return (
    <main className="page__content content">
      <section className="page__profile profile">
        <div className="profile__avatar" onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt="Аватар пользователя" className="profile__img" />
        </div>
        <div className="profile__info">
          <div className="profile__edit">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" onClick={onEditProfile} type="button" value="редактировать профиль"></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" onClick={onAddPlace} type="button" value="добавить фотографию"></button>
      </section>

      <section className="page__photo-gallery photo-gallery">
        <ul className="photo-gallery__list">
          {cards.map((card, i) => (
            <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
