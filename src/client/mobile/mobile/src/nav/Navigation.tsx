// Navigation

import React from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { trans } from '../helper';
import NavBottomTabIcon from "./NavBottomTabIcon";
import NavigationHome from "./NavigationHome";
import NavigationFavorite from "./NavigationFavorite";
import NavigationPost from "./NavigationPost";
import NavigationChat from "./NavigationChat";
import NavigationProfile from "./NavigationProfile";

const RootStack = createBottomTabNavigator(
    {
      Home: NavigationHome,
      Favorite: NavigationFavorite,
      Post: {
          screen: NavigationPost, 
          navigationOptions: {
            tabBarVisible: false
          }
        },
      Chat: NavigationChat,
      Profile: NavigationProfile
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            //create button icons
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const { routeName } = navigation.state;
                return (
                    <NavBottomTabIcon
                        tintColor={tintColor}
                        routeName={routeName as any}
                        screenProps={(navigation as any).getScreenProps()}
                />);
            },
            //do localize of title pages
            title: trans('title_'+navigation.state.routeName.toLocaleLowerCase()),
        }),
        tabBarOptions: {
            activeTintColor: 'orange',
            inactiveBackgroundColor: 'light-yellow'
        }
    }
);

const rootNav = createStackNavigator({
        BottomTabNav : {screen: RootStack}
    },
    {
        initialRouteName: 'BottomTabNav',
        headerMode: 'none',
        mode: 'modal',
    }
);

export default  createAppContainer(rootNav)


