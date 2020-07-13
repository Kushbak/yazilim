/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
// pages/DummyPage

import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {View, Button, Text} from 'native-base';
import {PageProps} from '../../types';
import * as actions from '../../actions/dummyAction';
import {getLocale, trans, setupLocalization} from '../../helper';
import {store, AppState} from '../../store';
import LoginPageCom from '../../components/LoginPageCom';
import Profile from '../../components/Profile';

export interface Props extends PageProps {
    user: any
}

interface State {}

class ProfilePage extends React.Component<Props, State> {
    static navigationOptions = () => {
        return {
            title: 'Profile',
        };
    };

    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
                ! this.props.user ? 
                (
                    //@ts-ignore
                    <LoginPageCom
                        
                        navigation={this.props.navigation}
                />
                )
                :
                (
                    <Profile
                        navigation={this.props.navigation}
                    />
                )
        );
    }
}

// styles
const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        alignSelf:'center',
        paddingTop: 20
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

const mapStateToProps = (state: AppState): any => ({
    user: state.userReducer.user
});
export default connect(
    mapStateToProps,
    actions,
)(ProfilePage);
