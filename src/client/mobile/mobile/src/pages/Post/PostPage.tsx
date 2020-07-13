/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
// pages/DummyPage

import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Image, Alert, FlatList} from 'react-native';
import ImagePicker from 'react-native-image-picker'

import Picker from 'react-native-picker';
import {View, Button, Text, Item, Label, Input, 
    Form, Container, Textarea
} from 'native-base';
import {PageProps} from '../../types';
import * as actions from '../../actions/dummyAction';
import {getLocale, trans, setupLocalization} from '../../helper';
import {store, AppState} from '../../store';
import LoginPageCom from '../../components/LoginPageCom';
import Loader from '../../components/Loader';
import { COLORS, API_URL } from '../../constants';
import axios from 'axios';

export interface Props extends PageProps {
    user: any;
    categoryList: any[];
    departmentList: any[];
    setCategoryList: (categoryList: any) => void;
}

interface State {
    images: any;
    title: string;
    description: string;
    cost: string;
    faculty: any;
    loading: boolean;
    facultyName: string;
    valid: boolean;
}

class PostPage extends React.Component<Props, State> {
    static navigationOptions = () => {
        return {
            title: 'Публикация нового поста',
        };
    };

    constructor(props: Props) {
        super(props);
        let locale: string = getLocale().charAt(0).toUpperCase()+getLocale().slice(1);
        this.state = {
            images: null,
            title: '',
            description: '',
            cost: '',
            faculty: null,
            loading: false,
            facultyName: 'facultyName'+ locale,
            valid: false
        };
    }

    handleChoosePhoto = () => {
        const options = {
            noData: true
        }
        ImagePicker.launchImageLibrary(options, response => {
            console.log("response ", response );
            if(response.uri){
                this.setState({images:response})
            }
        })
    }

    

    isValid = () => {
        return this.state.title && this.state.description;
    };

    saveAndNav = async () => {
        this.setState({loading: true});
        var formData = new FormData();
        formData.append('file', {
            name: this.state.images.fileName,
            uri: this.state.images.uri,
            type: this.state.images.type
        })
        
        try{
            const response = await axios.post(`${API_URL}images`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if(response.data){
                const date = new Date();
                const post = {
                    'title': this.state.title,
                    'description': this.state.description,
                    'publishedAt': date.toISOString(),
                    'author': `/api/users/${this.props.user.id}`,
                    'department': this.state.faculty != null ? `/api/faculties/${this.state.faculty}` : null,
                    'cost': parseInt(this.state.cost) > 0 ? parseInt(this.state.cost) : 0,
                    'rating' : 0,
                    'images' : [`/api/images/${response.data.id}`]
                }
                console.log(post)
                try {
                    const newPost = await axios.post(`${API_URL}posters`,
                    {
                    'title': post.title,
                    'description': post.description,
                    'publishedAt': post.publishedAt,
                    'author': `/api/users/${this.props.user.id}`,
                    'department': post.department,
                    'cost': post.cost,
                    'rating' : 0,
                    'images' : [post.images]
                    }
                    )
                    if(newPost.data){
                        this.setState({loading:false})
                        this.props.navigation.navigate('ProfilePage')
                    }
                    else{
                        this.setState({loading:false})
                        Alert.alert('Что то пошло не так');
                    }
                    
                } catch (error) {
                    Alert.alert(JSON.stringify(error.message));
                    this.setState({loading: false});
                }
            }
        }
        catch(error){
            Alert.alert(JSON.stringify(error.message));
            console.log(error)
            this.setState({loading: false});
        }


        
    };

    render() {
        return (
            this.props.user ? 
            <Container  style={styles.root}>
            <View style={{backgroundColor:'white',padding:10, margin:20}}>
                {this.state.loading && <Loader/>}
                <View>
                    <Form >
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            <Button
                                style={{borderRadius:15, borderWidth: 1,backgroundColor: 'white'}}
                                onPress={this.handleChoosePhoto}
                            >
                                <Text style={{fontSize:10, color:'black'}}>Выбрать файл</Text>
                            </Button>
                            <Text style={{margin:10, textAlign:'center'}} note>{this.state.images ? this.state.images.fileName : 'Файл не выбран'}</Text>
                        </View>

                        <Item floatingLabel>
                            <Label>{trans('title')} *</Label>
                            <Input
                                style={{marginBottom:10}}
                                onChangeText={title => this.setState({title})}
                                value={this.state.title}
                            />
                        </Item>
                        {/* <Item floatingLabel> */}
                            {/* <Label>{trans('description')}</Label> */}
                            <Textarea
                                rowSpan={8}
                                placeholder={trans('description')+" *"}
                                bordered
                                underline={false}
                                onChangeText={description => this.setState({description})}
                                value={this.state.description}
                                autoCapitalize="none"
                            />
                        {/* </Item> */}
                        <Item floatingLabel>
                            <Label>{trans('cost')}</Label>
                            <Input
                                onChangeText={cost => this.setState({cost})}
                                value={this.state.cost}
                                textContentType="telephoneNumber"
                            />
                        </Item>
                        <Text style={{marginTop:25, marginLeft:10}} note>Факультет</Text>
                        {
                        Picker.init({
                            pickerData: this.props.departmentList,
                            selectedValue: [59],
                            onPickerConfirm: (data:any) => {
                                console.log(data);
                            },
                            onPickerCancel: (data:any) => {
                                console.log(data);
                            },
                            onPickerSelect: (data:any) => {
                                console.log(data);
                            }
                        })}
                        {Picker.show()
                        }
                        
                        
                        
                        
                        
                        
                        {/* <Picker
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
                                    // return (<Picker.Item label={item[this.state.facultyName]} value={item.id} key={item.id} />)
                                    return (
                                        <FlatList
                                            data={this.props.categoryList}
                                            renderItem={(item)=><Text>{item.item[this.state.facultyName]}</Text>}
                                        />
                                    )
                                }
                            )}
                            
                        </Picker> */}
                        
                        <Button
                            block
                            disabled={!this.isValid()}
                            onPress={this.saveAndNav}
                            style={[styles.button,{backgroundColor: this.isValid() ? COLORS.b : 'silver'}]}
                        >
                            <Text>{trans('publish')}</Text>
                        </Button>
                    </Form>
                </View>
            </View>
            </Container> :
            //@ts-ignore
            <LoginPageCom
                navigation={this.props.navigation}
            />
        );
    }
}

// styles
const styles = StyleSheet.create({
    root: {
        backgroundColor: 'silver',
        justifyContent:'center',
        
    },
    buttons: {
        flexDirection: 'row',
        minHeight: 70,
        alignItems: 'stretch',
        alignSelf: 'center',
    },
    button: {
        marginTop: 25,   
        borderRadius:15},
    greeting: {
        color: '#999',
        fontWeight: 'bold',
    },
});

const mapStateToProps = (state: AppState) => ({
    user: state.userReducer.user,
    categoryList: state.categoryReducer.categoryList,
    departmentList: state.categoryReducer.departmentList,
});
export default connect(
    mapStateToProps,
    actions,
)(PostPage);
