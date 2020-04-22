import React from 'react';
import styles from './Header.module.css';
import logo from './../../assets/images/logo.png'
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Modal from '../common/Modal/Modal';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import {useDispatch} from 'react-redux';
import { setPostByTitle } from '../../actions/posts';

const Header = (props) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    function changeLang(lang = 'kg') {
        i18n.changeLanguage(lang)
    } 
    
    const onRegisterSubmit = (formData) =>{ 
        props.register(formData) 
    }
    const onLoginSubmit = (formData) =>{
        props.login(formData)
    }

    return (
        <div className={styles.appHeader}>

            <div className={styles.logoBlock}>
                <NavLink to='/'> <img src={logo} onClick={()=>dispatch(setPostByTitle(''))} alt="logo" /></NavLink>
                <div className={styles.slogan}>
                    <p>Buy-Manas</p>
                    <p>{t('logo_text')}</p>
                </div>
            </div>
            <div>

                {props.isAuth 
                    ? <div className={styles.username}><NavLink to='/profile'> {props.username} </NavLink> - <button onClick={props.logout}>logout</button></div>
                    : <button className={styles.auth} onClick={props.toggleModalWindowAuth}>{t('auth')}</button>
                }
                
                <div className={styles.changeLangBlock}>
                    <label> <input type="radio" name="a1" onClick={() => changeLang('kg')} /> <span>KG</span> </label>
                    <label> <input type="radio" name="a1" onClick={() => changeLang('ru')} /> <span>RU</span> </label>
                    <label> <input type="radio" name="a1" onClick={() => changeLang('tr')} /> <span>TR</span> </label>
                    <label> <input type="radio" name="a1" onClick={() => changeLang('en')} /> <span>EN</span> </label>
                </div>
            </div>

            {
                props.isModalOpen &&
                <Modal onClose={props.toggleModalWindowAuth}>
                    {
                        props.wannaLogin ?
                            <LoginForm toggleModalLoginAuth={props.toggleModalLoginAuth} onSubmit={onLoginSubmit} />
                            :
                            <RegisterForm toggleModalLoginAuth={props.toggleModalLoginAuth} onSubmit={onRegisterSubmit} faculties={props.faculties} />
                    }
                </Modal>
            }
        </div>
    )
}

export default Header;