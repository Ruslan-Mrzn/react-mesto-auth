import React from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup({popupName, formName, onUpdateAvatar, formTitle, submitButtonValue, isOpen, onClose}) {

  const avatarRef = React.useRef();

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
  }

  return (
    <PopupWithForm popupName={popupName} formName={formName} formTitle={formTitle} submitButtonValue={submitButtonValue} isOpen={isOpen} onClose={handleCloseButton} onSubmit={handleSubmit}>
      <input ref={avatarRef} type="url" className="form__text-input" name="avatar" placeholder="Ссылка на аватарку" required />
      <span className="form__error avatar-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;