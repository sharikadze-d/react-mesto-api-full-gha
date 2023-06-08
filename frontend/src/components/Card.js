import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from 'react';

export default function Card({card, onCardClick, onCardLike, onCardDelele}) {

  const user = React.useContext(CurrentUserContext);

  const isOwn = user._id === card.owner._id;
  const isLiked = card.likes.some(like => like._id === user._id);

  const cardLikeButtonClassName = ( 
    `element__like-btn ${isLiked && 'element__like-btn_active'}` 
  );

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteCard() {
    onCardDelele(card)
  }

  //Обработка клика с передачей данных карточки
  function handleClick() { 
    onCardClick(card);
  }

  return (
    <article className="element">
      {isOwn && <button type="button" className="element__delete-btn opacity" onClick={handleDeleteCard}></button>}
      <img src={card ? card.link : '#'} alt={card ? card.name : ''} className="element__image" onClick={handleClick}/>
      <div className="element__caption">
        <h2 className="element__title">{card ? card.name : ''}</h2>
        <div className="element__inner">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="element__like-counter">{card ? card.likes.length : 0}</p>
        </div>
      </div>
    </article>
  );
}