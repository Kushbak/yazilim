// pages/PersonalPage

import React from 'react';
import { connect } from 'react-redux';
import {StyleSheet, Alert, Image, TouchableOpacity} from 'react-native';
import {View, Content, Container, Card, CardItem, Body, Button, Icon, Text} from 'native-base'
import {PageProps} from '../types';
import * as actions from '../actions/index'
import {getLocale, trans} from '../helper';
import {COLORS, API_URL} from "../constants";
import {AppState} from "../store";
import {userResetAction} from "../actions";
import LastPostCom from './LastPostCom';

export interface Props extends PageProps {
  user: any;
  userResetAction: () => void;
}

interface State {
    name: string;
    showComponent: boolean;
}

class Profile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
        name: 'name'+getLocale().charAt(0).toUpperCase()+getLocale().slice(1),
        showComponent: false
    };
  }

    loginReset (){
      this.props.userResetAction();
      this.props.navigation.navigate({ routeName: 'initialRootNav'})
    }

    render() {
    return (
          <Container>
              <Content padder>
                  <Card>
                      <CardItem bordered>
                          <Body>
                              {
                                  this.props.user.images.length ? 
                                  (
                                    <Image
                                        source={{uri:`http://buymanasapi.ru.xsph.ru/${this.props.user.images[0].url}`}}
                                        style={{height: 200, width: '100%', flex: 1, backgroundColor:"grey"}}
                                    />
                                    
                                  )
                                  :
                                  (
                                    <Image
                                        source={require('../assets/images/logo.png')}
                                        style={{height: 200, width: '100%', flex: 1, backgroundColor:"grey"}}
                                    />
                                  )
                              }
                              
                          </Body>
                      </CardItem>
                  </Card>

                  <Card>
                      <CardItem header bordered>
                          <Text style={{color:COLORS.B}}>
                              {trans('title_personal_info')}:
                          </Text>
                      </CardItem>
                      <CardItem bordered>
                          <Body>
                              <Text note>{trans('full_name')}:</Text>
                              {this.props.user ? (
                                  <Text style={{marginLeft:15,color:COLORS.B}}>
                                      {this.props.user.name} {this.props.user.username}
                                  </Text>

                              ):null}
                          </Body>
                      </CardItem>
                  </Card>
                  <View>
                      <LastPostCom
                        //@ts-ignore
                        navigation={this.props.navigation}
                        myPosts={true}
                        title={"Мои посты"}
                      />
                  </View>
                  <Card>
                      <View>
                          <Button
                              onPress={()=>this.loginReset()} style={{backgroundColor:'red'}}>
                              <Text>{trans('reset_login')}</Text>
                          </Button>
                      </View>
                  </Card>
              </Content>
          </Container>
    );
  }
}

// styles
const styles = StyleSheet.create({
    selectCountry: {
        height:45,
        borderWidth:1,
        margin:8,
        borderRadius:5,
        justifyContent:'space-around',
        alignItems:'center',
        flexDirection:'row',
        width:'80%'
    },
});

const mapStateToProps = (state: AppState) => ({
    //@ts-ignore
    user: state.userReducer.user,
    // @ts-ignore,
    userCountry: state.userReducer.userCountry,
});

const mapDispatchToProps = (dispatch:any) => ({
    userResetAction: () => dispatch(userResetAction()),
});

export default connect( mapStateToProps, mapDispatchToProps )(Profile);


