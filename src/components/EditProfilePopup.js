import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({popupName, formName, onUpdateUser, formTitle, submitButtonValue, isOpen, onClose, isLoadingApiRequest}) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);
  const [nameIsValid, setNameIsValid] = React.useState(true);
  const [descriptionIsValid, setDescriptionIsValid] = React.useState(true);
  const [formIsValid, setFormIsValid] = React.useState(true);
  const [nameError, setNameError] = React.useState('');
  const [descriptionError, setDescriptionError] = React.useState('');


  const handleNameInputChange = (evt) => {
    setName(evt.target.value);
    setNameIsValid(evt.target.validity.valid);
    setNameError(evt.target.validationMessage);
  }

  const handleDescriptionInputChange = (evt) => {
    setDescription(evt.target.value);
    setDescriptionIsValid(evt.target.validity.valid);
    setDescriptionError(evt.target.validationMessage);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    })
  }

  React.useEffect(() => {
    setFormIsValid(nameIsValid && descriptionIsValid && name !== '' && description !== '');
  }, [nameIsValid, descriptionIsValid, isOpen, name, description]);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);


  return (
    <PopupWithForm loadingApiRequestText={"Сохраняю ..."} isLoadingApiRequest={isLoadingApiRequest} popupName={popupName} formName={formName} formTitle={formTitle} formIsValid={formIsValid} submitButtonValue={submitButtonValue} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input type="text" onInput={handleNameInputChange} className={`form__text-input ${nameIsValid ? '' : 'form__text-input_type_error'}`} defaultValue={name} onChange={handleNameInputChange} name="name" placeholder="Имя" required minLength="2" maxLength="40" />
      <span className={`form__error name-error ${nameIsValid ? '' : 'form__error_visible'} `}>{nameError}</span>
      <input type="text" onInput={handleDescriptionInputChange} className={`form__text-input ${descriptionIsValid ? '' : 'form__text-input_type_error'}`} defaultValue={description} onChange={handleDescriptionInputChange} name="description" placeholder="Расскажите о себе" required minLength="2" maxLength="200" />
      <span className={`form__error about-error ${descriptionIsValid ? '' : 'form__error_visible'}`}>{descriptionError}</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
