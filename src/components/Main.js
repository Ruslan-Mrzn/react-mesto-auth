import React from "react";
import {api} from '../utils/api'

function Main({onEditProfile, onAddPlace, onEditAvatar}) {

  const [userName, setUserName] = React.useState()
  const [userDescription, setUserDescription] = React.useState()
  const [userAvatar, setUserAvatar] = React.useState()


  React.useEffect(() => {
    api.getUserInfo()
      .then((user) => {
        console.log(user);
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <main className="page__content content">
      <section className="page__profile profile">
        <div className="profile__avatar" onClick={onEditAvatar}>
          <img src={userAvatar} alt="Аватар пользователя" className="profile__img" />
        </div>
        <div className="profile__info">
          <div className="profile__edit">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__edit-button" onClick={onEditProfile} type="button" value="редактировать профиль"></button>
          </div>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button className="profile__add-button" onClick={onAddPlace} type="button" value="добавить фотографию"></button>
      </section>

      <section className="page__photo-gallery photo-gallery">
        <ul className="photo-gallery__list">

        </ul>
      </section>
    </main>
  );
}

export default Main;
