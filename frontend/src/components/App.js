import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import Header from './Header';
import Main from './Main.js';
import Footer from './Footer.js';
import api from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup';
import React, { useState } from 'react';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup .js';
import { Routes, Route, useNavigate} from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import { getUserData, authorize, register } from '../utils/auth.js';
import InfoTooltip from './InfoTooltip.js';

function App() {
  //State-переменные
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false),
        [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false),
        [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false),
        [isImagePopupOpen, setIsImagePopupOpen] = useState(false),
        [selectedCard, setSelectedCard] = useState(null),
        [currentUser, setCurrentUser] = useState({}),
        [cards, setCards] = useState([]),
        [loggedIn, setLoggedIn] = useState(false),
        [userEmail, setUserEmail] = useState(''),
        [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false),
        [isRegistred, setIsRegistred] = useState(false);

  const navigate = useNavigate();

  //Обработчик кнопки лайка
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
          
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
      .catch(() => { console.log(new Error('Ошибка загрузки')); })
      }

  //Обработчик кнопки удаления
  function handleDeleteCard(card) {
    api.deleteCard(card)
      .then(deletedCard => {
        const newCardsArr = cards.filter(card => card._id !== deletedCard._id)
        setCards(newCardsArr);
      })
      .catch(() => { console.log(new Error('Ошибка загрузки')); })
  }

  //Обаботчик обновления автара
  function handleUpdateAvatar(link) {
    api.setAvatar(link)
      .then(() => { setCurrentUser({...currentUser, avatar: link}); })
      .then(() => { closeAllPopups(); })
      .catch(() => { console.log(new Error('Ошибка загрузки')); })
  }

  //Обработчик обновления данных пользователя
  function handleUpdateUser({ name, about}) {
    api.setUserData({ name, about })
      .then(() => { setCurrentUser({...currentUser, name, about}); })
      .then(() => { closeAllPopups(); })
      .catch(() => { console.log(new Error('Ошибка загрузки')); })
  }

  //Обработчик добавления нового места
  function handleAddPlace({ name, link }) {
    api.setCardData({ name, link })
      .then((newCard) => { setCards([newCard, ...cards])})
      .then(() => { closeAllPopups(); })
      .catch(() => { console.log(new Error('Ошибка загрузки')); })
  }
  
  //Обработчики кликов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard(null);
  }

  //Наполнение страницы при загрузке
  React.useEffect(() => {
    tokenCheck();
    const token = localStorage.getItem('jwt');
    if (loggedIn && userEmail) {
      Promise.all([getUserData(token), api.getInitialCardsData(token)])
        .then(res => {
          setCurrentUser(res[0]);
          setCards(res[1].reverse());
        })
        .then(() => {
          loggedIn ? navigate('/', {replace: true}) : navigate('/sign-up', {replace: true});
        })
        .catch(() => {
          console.log(new Error('Ошибка загрузки'));
        })
    }
    
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ loggedIn, userEmail ])

  function handleAuthorization(email, password) {
    authorize(email, password)
      .then((res) => { 
        localStorage.setItem('jwt', res.jwt);
        getUserData(res.jwt)
          .then((res) => {
            handleLogIn(res.email);
            navigate('/');
          })
       })
      .catch(err => { console.log(new Error(err)) })
  }

  function handleRegister(email, password) {
    register(email, password)
    .then(() => { setIsRegistred(true) })
    .catch(() => { setIsRegistred(false) })
    .finally(() => { openInfoTooltip() })
  }

  //Проверка токена
  function tokenCheck() {
    const token = localStorage.getItem('jwt');
    if (!token) {
      return;
    }
    getUserData(token)
      .then(res => { 
        if (res) {
          handleLogIn(res.email);
          navigate('/');
        }
       })
       .catch(err => { console.log(new Error(`Ошибка: ${err}`)) })
  }

  //Обработчик входа
  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt')
  }

  //Обработчик выхода
  function handleLogIn(email) {
    setLoggedIn (true);
    setUserEmail(email);
  }

    //Открыть уведомление
  function openInfoTooltip() {
    setIsInfoPopupOpen(true);
  }

  //Закрыть уведомление
  function closeInfoTooltip() {
    setIsInfoPopupOpen(false);
    isRegistred && navigate('/sign-in', {replace: true});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__inner">
        <Routes>
          <Route path="/" element={
            <>
              <ProtectedRoute 
                element={Header}
                loggedIn={loggedIn}
                userMail={userEmail}
                onExitClick={handleLogOut}
              />
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelele={handleDeleteCard}
              />
            </>
            }/>
      
          <Route path="/sign-up" element={
            <>
              <Header
                loggedIn={loggedIn}
                buttonText={"Войти"}
                buttonLink={"/sign-in"}/>
              <Register 
                handleRegister={handleRegister}
              />
            </>} />
          <Route path="/sign-in" element={
            <>
              <Header 
                loggedIn={loggedIn}
                buttonText={"Зарегистрироваться"}
                buttonLink={"/sign-up"}/>
              <Login 
                handleAuthorization={handleAuthorization}
              />
            </>} />
        </Routes>
        <Footer />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen}
        />
        <InfoTooltip 
          isRegistred={isRegistred}
          isOpen={isInfoPopupOpen}
          onClose={closeInfoTooltip} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;