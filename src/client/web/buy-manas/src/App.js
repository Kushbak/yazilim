import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer'
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import Profile from './components/Profile/Profile';
import { Route } from 'react-router-dom';

const App = (props) => {

    return (
        <div className="appWrapper">
            <HeaderContainer />
            <Route exact path='/' render={() => <Main />} />
            <Route exact path='/profile' render={() => <Profile />} />            
            <Footer />
        </div>
    );
}

export default App;
