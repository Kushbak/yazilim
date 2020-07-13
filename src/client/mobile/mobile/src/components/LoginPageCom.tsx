// pages/registration/RegistrationPage

import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, TextInput, Image, ToastAndroid, TouchableOpacity} from 'react-native';
import {Button, Text, Content, Container, View, Form, Input, Toast} from 'native-base'
import {PageProps} from '../types';
import {setUser} from '../actions/userAction';
import {trans, setupLocalization, getLocale} from '../helper';
import {API_URL,  COLORS} from '../constants';
import axios from 'axios';
import Loader from './Loader';
import {NavigationActions} from "react-navigation";

export interface Props extends PageProps {
    setUser: (user: object) => void;
    // userResetAction: () => void,
    user?: any,
    // lan: string
}

interface State {
    username: string;
    password: string;
    numberValid: boolean;
    loading: boolean;
    colorKg: boolean;
    colorRu: boolean;
    colorEn: boolean;
    colorTr: boolean;
}

class LoginPageCom extends React.Component<Props, State> {
    private phone: any;

    constructor(props: Props) {
        super(props);
        this.state = {
            username: '',
            password: '',   
            numberValid: false,
            loading: false,
            colorKg: true,
            colorRu: false,
            colorEn: false,
            colorTr: false
        };
    }

    componentDidMount(): void {
        const lan = getLocale();
        if(lan === 'ru'){
            this.setState({colorRu:true, colorEn:false, colorKg:false, colorTr: false})
        }
        else if(lan === 'kg'){
            this.setState({colorRu:false, colorEn:false, colorKg:true, colorTr: false})
        }
        else if(lan === 'tr'){
            this.setState({colorRu:false, colorEn:false, colorKg:false, colorTr: true})
        }
        else{
            this.setState({colorEn:true, colorKg:false,colorRu:false, colorTr: false});
        }
        // @ts-ignore
        console.ignoredYellowBox = true;
    }

    setupLocalize = (lan:string) => {
        if(lan === 'ru'){
            this.setState({colorRu:true, colorEn:false, colorKg:false, colorTr: false})
        }
        else if(lan === 'kg'){
            this.setState({colorRu:false, colorEn:false, colorKg:true, colorTr: false})
        }
        else if(lan === 'tr'){
            this.setState({colorRu:false, colorEn:false, colorKg:false, colorTr: true})
        }
        else{
            this.setState({colorEn:true, colorKg:false,colorRu:false, colorTr: false});
            // this.setState({colorEn:COLORS.b})
        }
        setupLocalization(lan)

    };

    showToast = () => {
        ToastAndroid.showWithGravity(
            "Неправильный логин или пароль",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
      };
    

    async login(username: string, password: string) {
        this.setState({loading: true});
        try {
            const response = await axios.get(`${API_URL}users`,{params: {'username':username}});
            if (response.data.length) {
                if(response.data[0].password == password)
                {
                    const user = await axios.get(`${API_URL}users/${response.data[0].id}`)
                    if(user.data){
                        this.props.setUser(user.data)
                    }       
                }
                
            
                
                // this.props.navigation.navigate({routeName: 'Home'})
            }
            else{
                this.showToast()
            }
            this.setState({loading: false});
        } catch (error) {
            this.setState({loading: false});
            console.log(error)
        }
    }

    render() {
        return (
            <Container style={{}}>
                {this.state.loading && <Loader/>}
                <View style={styles.login}>
                    <View style={styles.loginTop}>
                        <Image
                            source={require('../assets/images/logo.png')}
                            style={styles.logo}
                        />
                        <Text style={styles.logoText}>Обеспечь себя и своих</Text>
                    </View>
                    <View style={styles.loginForm}>
                        <Text style={{textAlign: 'center', fontSize: 18}}>{trans('login_app')}</Text>
                        <Form>
                            <TextInput
                                style={styles.loginInput}
                                placeholder={'Псевдоним'}
                                value={this.state.username}
                                textContentType={'nickname'}
                                onChangeText={(newUsername)=>this.setState({username:newUsername})}
                            />
                            <TextInput
                                style={styles.loginInput}
                                placeholder={'Пароль'}
                                value={this.state.password}
                                textContentType={'password'}
                                onChangeText={(newPassword)=>this.setState({password:newPassword})}
                            />
                            <Button
                                style={{marginTop:25, backgroundColor:COLORS.B, borderRadius:15}}
                                block
                                primary
                                // disabled={!this.state.numberValid}
                                onPress={()=>this.login(this.state.username,this.state.password)}
                            >
                                <Text>{trans('enter')}</Text>
                            </Button>
                            <Text onPress={()=>this.props.navigation.navigate('RegistrationPage')} style={{textAlign:'center', marginTop:40, color:COLORS.B}}>Регистрация</Text>
                        </Form>

                    </View>
                    <View style={{flexDirection:'row', justifyContent: 'center', marginBottom:30, backgroundColor:'#ecf0f5'}}>
                        <TouchableOpacity
                            style={{marginHorizontal:8}}
                            onPress={()=>{this.setupLocalize('kg')}}>
                            <Text style={this.state.colorKg ? {color: COLORS.B}:{color: '#222'}}> КЫР </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{marginHorizontal:8}}
                            onPress={()=>this.setupLocalize('ru')}>
                            <Text style={this.state.colorRu ? {color: COLORS.B}:{color: '#222'}}> РУС </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{marginHorizontal:8}}
                            onPress={()=>this.setupLocalize('tr')}>
                            <Text style={this.state.colorTr ? {color: COLORS.B}:{color: '#222'}}> TUR </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{marginHorizontal:8}}
                            onPress={()=>this.setupLocalize('en')}>
                            <Text style={this.state.colorEn ? {color: COLORS.B}:{color: '#222'}}> ENG </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
        );
    }
}

// styles
const styles = StyleSheet.create({
    login: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#ecf0f5'
    },
    loginTop: {
        padding: 2,
        flex:1,
        alignItems: 'center',
        backgroundColor: '#ecf0f5',
    },
    logo: {
        width: 80,
        height: 81,
        marginBottom: 10,
    },
    logoText: {
        color: COLORS.b,
        fontSize: 20,
        textAlign: 'center'
    },
    loginInput: {
        borderWidth:1,
        borderRadius:15,
        margin:4,
        textAlign: 'center',
        fontSize:20
    },
    loginForm: {
        backgroundColor: '#ecf0f5',
        flex: 3,
        padding: 10,
        width:'100%',
        justifyContent: 'center'
    }
});

const mapStateToProps = (state: any): any => ({
    user: state.userReducer.user,
    lan: state.Settings.lan
});
const mapDispatchToProps = (dispatch:any) => ({
    setUser: (user:object) => dispatch(setUser(user))
});
export default connect(mapStateToProps,mapDispatchToProps)(LoginPageCom);


