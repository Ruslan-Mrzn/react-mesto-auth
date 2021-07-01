import React from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup({popupName, formName, onUpdateAvatar, formTitle, submitButtonValue, isOpen, onClose, isLoadingApiRequest}) {

  const avatarRef = React.useRef();
  const [avatarRefIsValid, setAvatarRefIsValid] = React.useState(true);
  const [avatarRefError, setAvatarRefError] = React.useState('');
  const [formIsValid, setFormIsValid] = React.useState(false);

  const checkAvatarRefValidity = () => {
    setAvatarRefIsValid(avatarRef.current.validity.valid);
    setAvatarRefError(avatarRef.current.validationMessage);
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });

    avatarRef.current.value = '';
  }

  const handleCloseButton = () => {
    onClose();
    avatarRef.current.value = '';
    setAvatarRefIsValid(avatarRef.current.validity.valid || avatarRef.current.value === '')
  }

  React.useEffect(() => {
    setFormIsValid(avatarRefIsValid && avatarRef.current.value !== '');
  }, [avatarRefIsValid, isOpen]);


  return (
    <PopupWithForm loadingApiRequestText={"Сохраняю ..."} isLoadingApiRequest={isLoadingApiRequest} popupName={popupName} formName={formName} formIsValid={formIsValid} formTitle={formTitle} submitButtonValue={submitButtonValue} isOpen={isOpen} onClose={handleCloseButton} onSubmit={handleSubmit}>
      <input ref={avatarRef} autoComplete="off" onPaste={checkAvatarRefValidity} onChange={checkAvatarRefValidity} type="url" className={`form__text-input ${avatarRefIsValid ? '' : 'form__text-input_type_error'}`} name="avatar" placeholder="Ссылка на аватарку" required />
      <span className={`form__error avatar-error ${avatarRefIsValid ? '' : 'form__error_visible'}`}>{avatarRefError}</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
