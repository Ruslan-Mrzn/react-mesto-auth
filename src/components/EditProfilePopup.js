import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({popupName, formName, onUpdateUser, formTitle, submitButtonValue, isOpen, onClose}) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  const handleNameInputChange = (evt) => {
    setName(evt.target.value)
  }

  const handleDescriptionInputChange = (evt) => {
    setDescription(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    })
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);


  return (
    <PopupWithForm popupName={popupName} formName={formName} formTitle={formTitle} submitButtonValue={submitButtonValue} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input type="text" className="form__text-input" defaultValue={name} onChange={handleNameInputChange} name="name" placeholder="Имя" required minLength="2" maxLength="40" />
      <span className="form__error name-error"></span>
      <input type="text" className="form__text-input" defaultValue={description} onChange={handleDescriptionInputChange} name="description" placeholder="Расскажите о себе" required minLength="2" maxLength="200" />
      <span className="form__error about-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
