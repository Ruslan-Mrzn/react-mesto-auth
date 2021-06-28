import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({popupName, formName, onAddPlace, formTitle, submitButtonValue, isOpen, onClose}) {

  const titleRef = React.useRef();
  const urlRef = React.useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onAddPlace({
      name: `${titleRef.current.value}`,
      link: `${urlRef.current.value}`,
    })
    let photoData = {
      name: `${titleRef.current.value}`,
      link: `${urlRef.current.value}`,
    }
    console.log(photoData)

    titleRef.current.value ='';
    urlRef.current.value = '';
  }

  const handleCloseButton = () => {
    onClose();

    titleRef.current.value ='';
    urlRef.current.value = '';
  }

  return (
    <PopupWithForm popupName={popupName} formName={formName} formTitle={formTitle} submitButtonValue={submitButtonValue} isOpen={isOpen} onClose={handleCloseButton} onSubmit={handleSubmit}>
      <input ref={titleRef} type="text" className="form__text-input" name="title" placeholder="Название" required minLength="2" maxLength="30" />
      <span className="form__error title-error"></span>
      <input ref={urlRef} type="url" className="form__text-input" name="url" placeholder="Ссылка на картинку" required />
      <span className="form__error url-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
