// navigation home

import { createStackNavigator } from 'react-navigation-stack';
import { defaultOpts } from './common';
import { trans } from '../helper';
import HomePage from "../pages/Home/HomePage";


export default createStackNavigator(
  {
      Home: {
        screen: HomePage,
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


