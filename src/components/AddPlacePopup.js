import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({popupName, formName, onAddPlace, formTitle, submitButtonValue, isOpen, onClose, isLoadingApiRequest}) {

  const [titleRefIsValid, setTitleRefIsValid] = React.useState(true);
  const [urlRefIsValid, setUrlRefIsValid] = React.useState(true);
  const [titleRefError, setTitleRefError] = React.useState('');
  const [urlRefError, setUrlRefError] = React.useState('');
  const [formIsValid, setFormIsValid] = React.useState(false);

  const titleRef = React.useRef();
  const urlRef = React.useRef();

  const checkTitleRefValidity = () => {
    setTitleRefIsValid(titleRef.current.validity.valid);
    setTitleRefError(titleRef.current.validationMessage);
  }

  const checkUrlRefValidity = () => {
    setUrlRefIsValid(urlRef.current.validity.valid);
    setUrlRefError(urlRef.current.validationMessage);
  }


  const handleSubmit = (evt) => {
    evt.preventDefault();

    onAddPlace({
      name: `${titleRef.current.value}`,
      link: `${urlRef.current.value}`,
    })

    titleRef.current.value = '';
    urlRef.current.value = '';
  }

  const handleCloseButton = () => {
    onClose();
    titleRef.current.value = '';
    urlRef.current.value = '';
    setTitleRefIsValid(titleRef.current.validity.valid || titleRef.current.value === '');
    setUrlRefIsValid(urlRef.current.validity.valid || urlRef.current.value === '')
  }

  React.useEffect(() => {
    setFormIsValid(titleRefIsValid && urlRefIsValid && titleRef.current.value !== '' && urlRef.current.value !== '');
  }, [titleRefIsValid, urlRefIsValid, isOpen]);

  return (
    <PopupWithForm loadingApiRequestText={"Сохраняю ..."} isLoadingApiRequest={isLoadingApiRequest} popupName={popupName} formName={formName} formIsValid={formIsValid}  formTitle={formTitle} submitButtonValue={submitButtonValue} isOpen={isOpen} onClose={handleCloseButton} onSubmit={handleSubmit}>
      <input ref={titleRef} autoComplete="off" type="text" onPaste={checkTitleRefValidity} onChange={checkTitleRefValidity} className={`form__text-input ${titleRefIsValid ? '' : 'form__text-input_type_error'}`} name="title" placeholder="Название" required minLength="2" maxLength="30" />
      <span className={`form__error ${titleRefIsValid ? '' : 'form__error_visible'}`}>{titleRefError}</span>
      <input ref={urlRef} autoComplete="off" type="url" onPaste={checkUrlRefValidity} onChange={checkUrlRefValidity} className={`form__text-input ${urlRefIsValid ? '' : 'form__text-input_type_error'}`} name="url" placeholder="Ссылка на картинку" required />
      <span className={`form__error ${urlRefIsValid ? '' : 'form__error_visible'}`}>{urlRefError}</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
