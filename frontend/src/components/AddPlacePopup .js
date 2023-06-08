import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const nameRef = React.useRef(),
        linkRef = React.useRef();

  //Обработчик отправки формы
  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ name: nameRef.current.value,
                 link: linkRef.current.value });
  }

  return (
    <PopupWithForm 
          name="card"
          title="Новое место"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          buttonText="Создать">
              <input required id="place" placeholder="Название" type="text"
                     name="name" className="popup__item" minLength="2" maxLength="30"
                     ref={nameRef} />
              <span className="place-error popup__error"></span>
              <input required id="url" placeholder="Ссылка на картинку" type="url"
                     name="link" className="popup__item" ref={linkRef} />
              <span className="url-error popup__error"></span>
        </PopupWithForm>
  );
}