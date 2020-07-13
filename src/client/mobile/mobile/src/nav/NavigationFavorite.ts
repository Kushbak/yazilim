// navigation favorite

import { createStackNavigator } from 'react-navigation-stack';
import { defaultOpts } from './common';
import { trans } from '../helper';
import FavoritePage from "../pages/Favorite/FavoritePage";


export default createStackNavigator(
    {
        Favorite: {
            screen: FavoritePage,
            navigationOptions: {
                headerShown: false,
            },
        },
    },
    {
        defaultNavigationOptions: {
            ...defaultOpts
        }
        //headerMode: 'none',
    }
);


