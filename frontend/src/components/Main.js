import api from '../utils/api.js'
import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Main({ 
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelele,
  cards }) {

  const user = React.useContext(CurrentUserContext);

  return (
  <main className="content">
    <section className="profile">
      <div className="profile__inner">
        <div className="profile__avatar-wrapper" onClick={onEditAvatar}>
          <img src={user.avatar} alt="Аватар профиля" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <div className="profile__name-wrapper">
            <h1 className="profile__name">{user.name}</h1>
            <button type="button" className="profile__edit-button opacity" onClick={onEditProfile}></button>
          </div>
          <p className="profile__description">{user.about}</p>
        </div>
      </div>
      <button type="button" className="profile__add-button opacity" onClick={onAddPlace}></button>
    </section>

    <section className="elements">{
      cards.map((card) => { //Рендер карточек из массива с сервера
        return(
        <Card card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelele={onCardDelele} />)
      })
    }</section>
  </main>
  );}