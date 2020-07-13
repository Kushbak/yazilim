// pages/registration/RegistrationPage

import React from 'react';
import {connect} from 'react-redux';
import {Button, Text, Content, Container, Form, Item, Label, Input, Icon, Switch, Picker} from 'native-base'
import {PageProps, IUser} from '../../types';
import {setUser} from '../../actions/userAction';
import axios from "axios";
import {API_URL, COLORS} from "../../constants";
import {Alert, StyleSheet, View, ToastAndroid} from "react-native";
//@ts-ignore
import PhoneInput from 'react-native-phone-input'
import Loader from "../../components/Loader";
import {getLocale, trans} from "../../helper/localize";


export interface Props extends PageProps {
    setUser: (user: any) => void;
    categoryList: any[];
    setCategoryList: (categoryList: any) => void;
}

interface State {
    username: string;
    name: string;
    email: string;
    password: string;
    passwordRepeat: string;
    phone: string;
    faculty?: any;
    loading: boolean;
    agreement: boolean;
    numberValid: boolean;
    passwordValid: boolean;
    facultyName: string;
    secret: boolean;
}

class RegistrationPage extends React.Component<Props, State> {

    private phone: any;

    constructor(props: Props) {
        super(props);
        let locale: string = getLocale().charAt(0).toUpperCase()+getLocale().slice(1);
        this.state = {
            // @ts-ignore
            username: '',
            name: '',
            email: '',
            password: '',
            passwordRepeat: '',
            phone: '+996',
            faculty: null,             
            loading: false,
            agreement: false,
            numberValid: false,
            passwordValid: false,
            facultyName: 'facultyName'+ locale,
            secret: true,
        };
    }

    componentDidMount(): void {
        // @ts-ignore
        console.ignoredYellowBox = true;
    }

    onSelectCountry() {
        this.setState({phone: this.phone.getValue()});
    }

    setPhoneNumber = (newUserTelNum: string) => {
        this.setState({phone: newUserTelNum});
        //@ts-ignore
        if (this.phone.isValidNumber()) {
            this.setState({numberValid: true});
        } else {
            this.setState({numberValid: false})
        }
    };

    showToast = () => {
        ToastAndroid.showWithGravity(
            "Пользователь с таким никнейном уже существует",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
      };

    passwordValid = () => {
        if(this.state.password === this.state.passwordRepeat){
            return true
        }
        else{
            return false
        }
    }

    isValid = () => {
        return this.state.numberValid && this.state.name && this.state.username && this.state.agreement 
            && this.state.email && this.state.password && this.passwordValid
        ;
    };


    saveAndNav = async () => {
        this.setState({loading: true});
        const user = {
            'username': this.state.username,
            'password': this.state.password,
            'name': this.state.name,
            'email': this.state.email,
            'phone': this.state.phone,
            'faculty': this.state.faculty
        }
        console.warn(user.faculty)
        try {
            const response = await axios.get(`${API_URL}users`,
                 { params: {'username': this.state.username}}
            );
            console.log('params'+ response)
            if(response.data.length){
                this.showToast()
            }
            else{
                const newUser = await axios.post(`${API_URL}users`,
                    {
                        'username': user.username,
                        'password': user.password,
                        'name': user.name,
                        'email': user.email,
                        'phone': user.phone,
                        'faculty': `/api/faculties/${user.faculty}`,
                        'images': []
                    }
                )
                
                    if(newUser.status <= 400){
                        console.log(newUser.status)
                        console.log(newUser.data)
                        this.props.setUser(newUser.data)
                    }
                
            }
        } catch (error) {
            Alert.alert(JSON.stringify(error.message));
            this.setState({loading: false});
        }
    };


    render() {
        return (
            <Container>
                {this.state.loading && <Loader/>}
                <Content padder>
                    <Form>
                        <Item floatingLabel>
                            <Label>{trans('name')}</Label>
                            <Input
                                onChangeText={name => this.setState({name:name})}
                                value={this.state.name}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>{trans('username')}</Label>
                            <Input
                                onChangeText={username => this.setState({username})}
                                value={this.state.username}
                                autoCapitalize="none"
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>{trans('email')}</Label>
                            <Input
                                onChangeText={email => this.setState({email})}
                                value={this.state.email}
                                textContentType="emailAddress"
                            />
                        </Item>
                        <Text style={{marginTop:20, marginLeft:20}} note>{trans('phone')} </Text>
                            <PhoneInput
                                ref={(ref: any) => {
                                    //@ts-ignore
                                    this.phone = ref;
                                }}
                                autoFormat
                                initialCountry={'kg'}
                                value={this.state.phone}
                                confirmText={"Выбрать"}
                                cancelText={"Отмена"}
                                onChangePhoneNumber={(newPhoneNumber: string) => this.setPhoneNumber(newPhoneNumber)}
                                style={styles.phoneInput}
                                flagStyle={{height: 28, width: 40, backgroundColor: 'green', marginLeft: 3}}
                                textProps={{placeholder: trans('phone')}}
                                onSelectCountry={() => this.onSelectCountry()}
                            />
                        <Text style={{marginTop:20, marginLeft:10}} note>Факультет</Text>
                        <Picker
                            placeholder='Факультет'
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            // note
                            mode={"dropdown"}
                            selectedValue={this.state.faculty}
                            onValueChange={(item)=> this.setState({faculty:item})}
                        >
                            <Picker.Item label={'Нет'} value={null}/>
                            {this.props.categoryList.map(
                                (item, index) => {
                                    return (<Picker.Item label={item[this.state.facultyName]} value={item.id} key={item.id}/>)
                                }
                            )}
                            
                        </Picker>
                        
                            <Item floatingLabel>
                                <Label>{trans('password')}</Label>
                                <View style={{flexDirection:'row'}}></View>
                                <Input
                                    onChangeText={(password) => this.setState({password})}
                                    value={this.state.password}
                                    secureTextEntry={this.state.secret}
                                />
                            
                                <Icon
                                    onPress={()=>this.setState({secret:!this.state.secret})}
                                    name="eye"
                                    style={{fontSize:18}}
                                />
                            </Item>
                            
                        <Item floatingLabel>
                            <Label>{trans('password_repeat')}</Label>
                            <Input
                                onChangeText={(passwordRepeat) => this.setState({passwordRepeat})}
                                value={this.state.passwordRepeat}
                                secureTextEntry={this.state.secret}
                                returnKeyType={"done"}
                            />
                        </Item>
                        <Item style={{flexDirection:'column'}}>
                            <Text style={{fontSize:12,marginTop:20, marginHorizontal:3}}>
                                {trans('terms_first')}{
                                    <Text
                                        onPress={()=>{}}
                                        style={{fontSize:12, color:COLORS.B, textDecorationLine:'underline' }}>
                                        {trans('terms_second_url')}
                                    </Text>
                                } {
                                    <Text style={{fontSize:12}}>
                                         {trans('terms_third')}
                                    </Text>
                                }
                            </Text>
                            <Switch
                                style={{marginRight:'87%', marginTop:3}}
                                value={this.state.agreement}
                                onValueChange={()=>{this.setState({agreement: !this.state.agreement})}}
                            />
                        </Item>
                        <Button
                            block
                            disabled={!this.isValid()}
                            onPress={this.saveAndNav}
                            style={{marginTop: 25}}
                        >
                            <Text>{trans('registration')}</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    phoneInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 3,
        height: 50,
        fontSize: 16,
        marginTop: 5
    }
})

const mapStateToProps = (state: any): any => ({
    categoryList: state.categoryReducer.categoryList,
    
});

const mapDispatchToProps = (dispatch:any) => ({
    setUser: (user:object) => dispatch(setUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);