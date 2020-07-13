import React from 'react';
import {IPoster, PageProps} from '../types';
import {fetchPosters} from '../actions';
import {connect} from 'react-redux';
import {FlatList, Text, View, TouchableOpacity, Image, StyleSheet} from "react-native";
import {AppState} from "../store";
import {Container, Content} from "native-base";
import images from "../assets/images/images";
import {IMAGES_URL} from "../constants";

interface Props extends PageProps{
    posterList: IPoster[];
}

interface State{
    topPostList: IPoster[];
}

class TopPostCom extends React.Component<Props,State>{
    constructor(props: Props) {
        super(props);
        this.state={
            topPostList: undefined,
        }
    }

    componentDidMount(){
        this.setState({topPostList:this.props.posterList.sort((a,b)=>b.rating-a.rating).slice(0,10)})
    }

    _renderItem=(item:any)=>{
        const post = item.item
        // console.warn(post.images[0].url)
            return(
                <TouchableOpacity style = {styles.topPost}>
                    {!post.images.length?
                        post.department?
                            <Image
                                //@ts-ignore
                                source={images[post.department.faculty.id]}
                                style={{height:70, width:70}}
                            />
                            :
                            <Image
                                //@ts-ignore
                                source={require('../assets/images/logo.png')}
                                style={{height:70, width:70}}
                            />
                        :
                        <Image
                            //@ts-ignore
                            source={{uri:`http://buymanasapi.ru.xsph.ru/${post.images[0].url}`}}
                            style={{height:70, width:70}}
                        />}
                        <Text>{post.title}</Text>
                        <Text>{post.cost} сом</Text>
                </TouchableOpacity>
            )
    };

    render(){
        return(
            
                <Content>
                    <View style={{backgroundColor:'white'}}>
                        <Text>ТОП объявления</Text>
                        <FlatList
                            horizontal={true}
                            data={this.state.topPostList}
                            renderItem={this._renderItem}
                            keyExtractor={(item:any)=>item.id.toString()}
                            showsHorizontalScrollIndicator={true}
                        />
                    </View>
                </Content>
            
        )
    }

}
const mapStateToProps = (state: AppState) => ({
    posterList: state.posterReducer.posterList,
});

//@ts-ignore
const mapDispatchToProps = dispatch => ({
    fetchPosters: () => dispatch(fetchPosters())
});

const styles = StyleSheet.create({
    topPost: {
        margin: 5,
        flexDirection:'column',
        height:160,
        width: 100,
        borderWidth:1,
        borderRadius: 10,
        padding:5
        }
})

export default connect(mapStateToProps, mapDispatchToProps)(TopPostCom);

