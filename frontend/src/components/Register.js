import { Link } from 'react-router-dom';
import { useRef } from 'react';

export default function Register ({ handleRegister }) {
  const emailRef = useRef(),
        passwordRef = useRef();

  //Обработчик отправки формы
  function handleSubmit (evt) {
    evt.preventDefault();
    const email = emailRef.current.value,
          password = passwordRef.current.value;

    handleRegister(email, password);
  }

  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h3 className="auth-form__title">Регистрация</h3>
        <input required id="email" placeholder="Email" type="email" name="email" className="auth-form__input" ref={emailRef} />
        <input required id="password" placeholder="Пароль" type="password" name="password" className="auth-form__input" ref={passwordRef} />
        <button type="submit" className="auth-form__submit-btn button-opacity">Зарегистрироваться</button>
        <Link to="/sign-in" className="auth-form__link opacity">Уже зарегистрированы? Войти</Link>
      </form>

      
    </> 
  );
}