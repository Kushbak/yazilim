// Bottom tab icon

import React from 'react';
import { View, Button, Text } from 'native-base'
import { Icon } from "native-base";
import { BottomNavType } from '../types';

interface Props {
  tintColor: any;
  routeName: BottomNavType;
  screenProps: any;
}

const icons = {
  Home: {name: 'home', type: 'AntDesign'},
  Favorite: {name: 'heart', type: 'AntDesign'},
  Post: {name: 'plus', type: 'Entypo'},
  Chat: {name: 'wechat', type: 'AntDesign'},
  Profile: {name: 'user', type: 'AntDesign'}
}

export default class NavBottomTabIcon extends React.Component<Props, {}> {
  render() {

    const { tintColor, routeName, screenProps } = this.props;
    const { Settings } = screenProps;

    let badgeCount = 0;

    return (
      <View style={{ width: 24, height: 25, margin: 2, paddingTop: 3 }}>
        <Icon
          name={icons[routeName].name}
          type={icons[routeName].type as any}
          style={{color: tintColor, fontSize: 25 }}
          />
        {badgeCount > 0 && (
          <View
            style={{
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 7,
              width: 14,
              height: 14,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold', paddingLeft: 1 }}>
              {badgeCount}s
            </Text>
          </View>
        )}
      </View>
    );
  }
}





