/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Navigation from './nav/Navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import * as RNLocalize from "react-native-localize";
import { setupLocalization } from './helper';
import {StatusBar} from "react-native";
import {COLORS} from "./constants";

interface State {
  Settings: any;
}

class App extends React.Component<{}, State> {

  storeUnsubscribe = () => {}

  constructor(props: any) {
    super(props);

    this.state = {
      Settings: {},
    }
  }

  componentDidMount() {
    // on device localization change
    RNLocalize.addEventListener("change", this.updateLocalization);

    // on redux action
    this.storeUnsubscribe = store.subscribe(() => {
      const storeState = store.getState();
      const currSettings = this.state.Settings;
      const newSettings = storeState.Settings;

      if (currSettings != newSettings) {
        this.setState({Settings: newSettings})
        console.log('Settings changed', currSettings, newSettings);
      }

      // on last stored data load
      if ((storeState.lastAction as any).type === 'persist/REHYDRATE') {
        this.updateLocalization();
      }
    });
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener("change", this.updateLocalization);
    this.storeUnsubscribe();
  }

  updateLocalization() {
    setupLocalization(store.getState().Settings.lan);
  }

  render() {
    return (
      <Provider store = { store }>
        <StatusBar backgroundColor={COLORS.b} />
        <PersistGate loading={null} persistor={persistor}>
          <Navigation screenProps={{
            Settings: store.getState().Settings,
          }} />
        </PersistGate>
      </Provider>
    );
  }
};

export default App;
