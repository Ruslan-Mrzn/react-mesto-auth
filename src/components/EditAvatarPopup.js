import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({popupName, formName, onUpdateAvatar, formTitle, submitButtonValue, isOpen, onClose, isLoadingApiRequest}) {

  const [avatarUrl, setAvatarUrl] = React.useState('');
  const [avatarUrlIsValid, setAvatarUrlIsValid] = React.useState(true);
  const [avatarUrlError, setAvatarUrlError] = React.useState('');
  const [formIsValid, setFormIsValid] = React.useState(false);

  const handleAvatarUrlChange = (evt) => {
    setAvatarUrl(evt.target.value);
    setAvatarUrlIsValid(evt.target.validity.valid);
    setAvatarUrlError(evt.target.validationMessage);
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarUrl,
    });

    setAvatarUrl('');
  }

  const handleCloseButton = () => {
    onClose();
    setAvatarUrl('');
    setAvatarUrlIsValid(true);
    setFormIsValid(false);
  }

  React.useEffect(() => {
    setFormIsValid(avatarUrlIsValid && avatarUrl !== '');
  }, [avatarUrlIsValid, avatarUrl, isOpen]);

  return (
    <PopupWithForm loadingApiRequestText={"Сохраняю ..."} isLoadingApiRequest={isLoadingApiRequest} popupName={popupName} formName={formName} formIsValid={formIsValid} formTitle={formTitle} submitButtonValue={submitButtonValue} isOpen={isOpen} onClose={handleCloseButton} onSubmit={handleSubmit}>
      <input autoComplete="off" value={avatarUrl || ''} onChange={handleAvatarUrlChange} type="url" className={`form__text-input ${avatarUrlIsValid ? '' : 'form__text-input_type_error'}`} name="avatar" placeholder="Ссылка на аватарку" required />
      <span className={`form__error avatar-error ${avatarUrlIsValid ? '' : 'form__error_visible'}`}>{avatarUrlError}</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
