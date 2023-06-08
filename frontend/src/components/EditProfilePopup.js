import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'


export default function EditProfilePopup({ isOpen, onClose, onUpdateUser}) {
  const user = React.useContext(CurrentUserContext),
        //Стейт переменные привязанные к полям ввода
        [name, setName] = React.useState(''),
        [description, setDescription] = React.useState('');

  //Заполнение полей попапа
  React.useEffect(() => {
    setName(user.name ? user.name : '');
    setDescription(user.about ? user.about : '');
  }, [user, isOpen]); 

  //Два обработчика изменений в полях ввода
  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  //Обаботчик отправки формы
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ name: name, about: description });
  }

  return (
    <PopupWithForm 
          name="profile"
          title="Редактировать профиль"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          buttonText="Сохранить">
              <input required id="name" type="text" name="name" placeholder="Имя"
                     className="popup__item" minLength="2" maxLength="40"
                     value={name} onChange={handleChangeName} />
              <span className="name-error popup__error"></span>
              <input required id="job" type="text" name="about" placeholder="Профессия"
                     className="popup__item" minLength="2" maxLength="200"
                     value={description} onChange={handleChangeDescription}/>
              <span className="job-error popup__error"></span>
        </PopupWithForm>
  )
}