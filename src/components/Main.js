import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);


  return (
    <main className="page__content content">
      <section className="page__profile profile">
        <div className="profile__avatar" onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt="Аватар пользователя" className="profile__img" />
        </div>
        <div className="profile__info">
          <div className="profile__edit">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" onClick={onEditProfile} type="button" value="редактировать профиль" title="редактировать профиль"></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" onClick={onAddPlace} type="button" value="добавить фотографию" title="добавить фотографию"></button>
      </section>

      <section className="page__photo-gallery photo-gallery">
        <ul className="photo-gallery__list">
          {cards.map((card, i) => (
            <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
