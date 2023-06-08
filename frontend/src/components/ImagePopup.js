export default function ImagePopup({ card, onClose, isOpen }) {
  return (
    <div className={`popup popup_type_picture ${isOpen ? 'popup_opened' : ''}`}>
      <figure className="popup__image-container">
        <button type="button" className="popup__close-btn opacity" onClick={onClose}></button>
        <img src={card ? card.link : '#'} alt={card ? card.name : ''} className="popup__image" />
        <figcaption className="popup__description">{card ? card.name : ''}</figcaption>
      </figure>
    </div>
  );
}