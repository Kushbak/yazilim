// pages/FavoritePage

import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { View, Button, Text } from 'native-base'
import { PageProps } from '../../types';
import * as actions from '../../actions/dummyAction';
import { getLocale, trans, setupLocalization } from '../../helper';
import { store } from '../../store';
import { changeBottomNavBadgeAction } from '../../actions/settingsAction';

export interface Props extends PageProps {
  count: number,
  changeCountAction: (count: number) => void,
  badgeHome: number,
  badgePersonal: number,
}

interface State {}

class FavoritePage extends React.Component<Props, State> {
  static navigationOptions = () => {
    return{
      title: 'Favorite'
    }
  };

  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  onIncrement = () => {
    this.props.changeCountAction(this.props.count+1)
  }

  onDecrement = () => {
    this.props.changeCountAction(this.props.count-1)
  }

  changeLang = (lan: string) => {
    setupLocalization(lan)
  }

  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.greeting}>
          Count: {this.props.count}
        </Text>

        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button small
              onPress={this.onDecrement}
              danger
            >
              <Text>-</Text>
            </Button>
          </View>

          <View style={styles.button}>
            <Button small
              onPress={this.onIncrement}
              success
            >
              <Text>+</Text>
            </Button>
          </View>
        </View>

        <View style={{paddingTop: 20}}>
          <Text style={styles.greeting}>
            Locale: { getLocale() }
          </Text>
          <Text style={styles.greeting}>
            {trans('hello', {name: 'Sam'})}
          </Text>
          <View style={{flexDirection: 'row', paddingTop: 10}}>
            <Button small onPress={() => this.changeLang('kg')}><Text>kg</Text></Button><Text> </Text>
            <Button small onPress={() => this.changeLang('en')}><Text>en</Text></Button><Text> </Text>
            <Button small onPress={() => this.changeLang('ru')}><Text>ru</Text></Button><Text> </Text>
            <Button small onPress={() => this.changeLang('tr')}><Text>tr</Text></Button><Text> </Text>
          </View>
        </View>
      </View>
    );
  }
}

// styles
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 20,
  },
  buttons: {
    flexDirection: 'row',
    minHeight: 70,
    alignItems: 'stretch',
    alignSelf: 'center',
  },
  button: {
    flex: 1,
    padding: 10,
  },
  greeting: {
    color: '#999',
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state: any): any => ({
  count: state.Dummy.count,
  badgeHome: state.Settings.badgeHome,
  badgePersonal: state.Settings.badgePersonal,
});
export default connect( mapStateToProps, actions )(FavoritePage);



