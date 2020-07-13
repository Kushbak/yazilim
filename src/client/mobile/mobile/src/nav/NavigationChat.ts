// navigation post

import { createStackNavigator } from 'react-navigation-stack';
import { defaultOpts } from './common';
import { trans } from '../helper';
import ChatPage from '../pages/Chat/ChatPage';



export default createStackNavigator(
    {
        Chat: {
            screen: ChatPage,
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


