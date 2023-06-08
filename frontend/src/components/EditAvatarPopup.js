import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const linkRef = React.useRef();

  //Обработчик отправки формы
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(linkRef.current.value)
  }

  return (
    <PopupWithForm 
    name="avatar"
    title="Обновить аватар"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    buttonText="Сохранить">
        <input required id="link" placeholder="Ссылка на фото" type="url"
               name="link" className="popup__item" ref={linkRef} />
        <span className="link-error popup__error"></span>
  </PopupWithForm>
  );
}