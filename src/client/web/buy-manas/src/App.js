import React from 'react';
import './App.css';
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar';

const App = (props) => {
   


    return (
        <div className="appWrapper">
            <Header />
            <Navbar />
            <div className="appContentWrapper">
                
            </div>
        </div>
    );
}

export default App;
