import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({popupName, formName, onAddPlace, formTitle, submitButtonValue, isOpen, onClose, isLoadingApiRequest}) {

  const [photoTitle, setPhotoTitle] = React.useState('');
  const [photoUrl, setPhotoUrl] = React.useState('');
  const [photoTitleIsValid, setPhotoTitleIsValid] = React.useState(true);
  const [photoUrlIsValid, setPhotoUrlIsValid] = React.useState(true);
  const [photoTitleError, setPhotoTitleError] = React.useState('');
  const [photoUrlError, setPhotoUrlError] = React.useState('');
  const [formIsValid, setFormIsValid] = React.useState(false);

  const handlePhohoTitleChange = (evt) => {
    setPhotoTitle(evt.target.value)
    setPhotoTitleIsValid(evt.target.validity.valid);
    setPhotoTitleError(evt.target.validationMessage);
  }

  const handlePhotoUrlChange = (evt) => {
    setPhotoUrl(evt.target.value)
    setPhotoUrlIsValid(evt.target.validity.valid);
    setPhotoUrlError(evt.target.validationMessage);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onAddPlace({
      name: photoTitle,
      link: photoUrl,
    })
  }

  // При открытии попапа поля должны быть пустыми, ошибки валидации скрыты, кнопка сабмита недоступна
  React.useEffect(() => {
    setFormIsValid(photoTitleIsValid && photoUrlIsValid && photoTitle !== '' && photoUrl !== '');
  }, [photoTitleIsValid, photoUrlIsValid, photoTitle, photoUrl]);

  React.useEffect(() => {
    setPhotoTitle('');
    setPhotoUrl('');
    setPhotoTitleIsValid(true);
    setPhotoUrlIsValid(true);
  }, [isOpen])

  return (
    <PopupWithForm loadingApiRequestText={"Сохраняю ..."} isLoadingApiRequest={isLoadingApiRequest} popupName={popupName} formName={formName} formIsValid={formIsValid}  formTitle={formTitle} submitButtonValue={submitButtonValue} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input autoComplete="off" type="text" onChange={handlePhohoTitleChange} value={photoTitle || ''} className={`form__text-input ${photoTitleIsValid ? '' : 'form__text-input_type_error'}`} name="title" placeholder="Название" required minLength="2" maxLength="30" />
      <span className={`form__error ${photoTitleIsValid ? '' : 'form__error_visible'}`}>{photoTitleError}</span>
      <input autoComplete="off" type="url" onChange={handlePhotoUrlChange} value={photoUrl || ''} className={`form__text-input ${photoUrlIsValid ? '' : 'form__text-input_type_error'}`} name="url" placeholder="Ссылка на картинку" required />
      <span className={`form__error ${photoUrlIsValid ? '' : 'form__error_visible'}`}>{photoUrlError}</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
