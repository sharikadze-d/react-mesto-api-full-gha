import regOK from '../images/reg-ok.svg';
import regError from '../images/reg-error.svg';

export default function InfoTooltip({ isRegistred, isOpen, onClose }) {
  return (
    <div className={`popup popup_type_info ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <button type="button" className="popup__close-btn opacity" onClick={onClose}></button>
          <img className="popup__reg-image"
            src={isRegistred ? regOK : regError} 
            alt={isRegistred ? 'Успешная регистрация' : 'Ошибка'}
          />
          <h3 className="popup__title popup__title_info">
            {isRegistred ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </h3>
        </div>
      </div>
  );
}