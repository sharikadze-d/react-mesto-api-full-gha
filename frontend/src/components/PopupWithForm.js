export default function PopupWithForm({ name, title, children, isOpen, onClose, buttonText, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <button type="button" className="popup__close-btn opacity" onClick={onClose}></button>
          <form className="popup__form" name={`${name}-input-form`} noValidate onSubmit={onSubmit}>
            <h3 className="popup__title">{title}</h3>
            {children}
            <button type="submit" className="popup__save-btn button-opacity"
              data-button-loading-text="Сохранение..." data-button-text="Сохранить">{buttonText}</button>
          </form>
        </div>
      </div>
  );
}