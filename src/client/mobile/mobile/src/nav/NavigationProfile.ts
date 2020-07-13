// navigation post

import { createStackNavigator } from 'react-navigation-stack';
import { defaultOpts } from './common';
import { trans } from '../helper';
import HomePage from "../pages/Home/HomePage";
import ProfilePage from "../pages/Profile/ProfilePage";
import RegistrationPage from '../pages/Profile/RegistrationPage';


export default createStackNavigator(
    {
        Profile: {
            screen: ProfilePage,
            navigationOptions: {
                headerShown: false,
            },
        },
        RegistrationPage: {
            screen: RegistrationPage,
            navigationOptions: {
                headerShown: true,
                title:"Регистрация"
            }
        }
    },
    {
        defaultNavigationOptions: {
            ...defaultOpts
        }
        //headerMode: 'none',
    }
);


