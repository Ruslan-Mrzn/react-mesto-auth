import React from 'react';
import PopupWithForm from './PopupWithForm';

function SubmitPopup ({popupName, formName, formTitle, submitButtonValue, isOpen, onClose, onSubmit, card, isLoadingApiRequest}) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(card);
  }
  return (
    <PopupWithForm loadingApiRequestText={"Удаляю ..."} isLoadingApiRequest={isLoadingApiRequest} formIsValid={true} popupName={popupName} formName={formName} formTitle={formTitle} submitButtonValue={submitButtonValue} isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose}/>
  )
}

export default SubmitPopup
