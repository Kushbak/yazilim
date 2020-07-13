import React from 'react';
import {IPoster, PageProps} from '../types';
import {fetchPosters} from '../actions';
import {connect} from 'react-redux';
import {FlatList, Text, View, TouchableOpacity,YellowBox, 
    Image, StyleSheet, SafeAreaView, ActivityIndicator
} from "react-native";
import {AppState} from "../store";
import {Icon, Content, Container} from "native-base";
import images from "../assets/images/images";
import {IMAGES_URL} from "../constants";

interface Props extends PageProps{
    posterList: IPoster[];
    title: string;
    myPosts: boolean;
    user: any
}

interface State{
    lastPostList: IPoster[];
}

class LastPostCom extends React.Component<Props,State>{
    constructor(props: Props) {
        super(props);
        this.state={
            lastPostList: [],
        }
    }

    componentDidMount(){
        YellowBox.ignoreWarnings([
            'VirtualizedLists should never be nested', // TODO: Remove when fixed
          ])
        if(this.props.myPosts){
            //@ts-ignore
            this.setState({lastPostList:this.props.user.posters.sort((a,b)=>Math.abs(new Date(b.publishedAt) as any) - Math.abs(new Date(a.publishedAt) as any))})
        }
        else{
            this.setState({lastPostList:this.props.posterList.sort((a,b)=>Math.abs(new Date(b.publishedAt) as any) - Math.abs(new Date(a.publishedAt) as any))})
        }
    }

    _renderItem=(item:any)=>{
        const post = item.item
        // console.warn(post.images[0].url)
            return(
                <View style={styles.lastPost}>
                    <View style={{alignItems:'center'}}>
                        <TouchableOpacity style = {{}}>
                            {!post.images.length?
                                post.department?
                                <Image
                                    //@ts-ignore
                                    source={images[post.department.faculty.id]}
                                    style={{height:165, width:165}}
                                />
                                :
                                <Image
                                    //@ts-ignore
                                    source={require('../assets/images/logo.png')}
                                    style={{height:165, width:165}}
                                />
                                :
                                <Image
                                    //@ts-ignore
                                    source={{uri:`http://buymanasapi.ru.xsph.ru/${post.images[0].url}`}}
                                    style={{height:165, width:165}}
                            />}
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'column', padding:5}}>
                        <Text style={{}}>{post.title}</Text>
                    </View>
                    <View>
                            {
                                post.cost ? 
                                (<Text style={{marginTop:10}}>{post.cost} сом</Text>):
                                (<Text style={{marginTop:10}}>Договорная</Text>)
                            }
                    </View>
                    <View style={{bottom:0, justifyContent:'space-between', flexDirection:'row'}}>
                        <TouchableOpacity>
                            <Icon
                                type={'SimpleLineIcons'}
                                name={'heart'}
                                style={{color:'red'}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon
                                type={'AntDesign'}
                                name={'mail'}
                                style={{color:'rgb(236, 121, 13)'}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )
    };

    renderHeader = () => {
        return <Text>Hello</Text>;
      };

    renderFooter = () => {
        // if (!this.state.loading) return null;
    
        return (
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 1,
              borderColor: "#CED0CE"
            }}
          >
            <ActivityIndicator animating size="large" />
          </View>
        );
      };

    render(){
        return(
            // <Container>
                <Content padder>
                    <View>
                        <Text>{this.props.title}</Text>
                        <SafeAreaView style={{backgroundColor:'white', flex:1}}>
                            <FlatList
                                ListHeaderComponent={this.renderHeader}
                                ListFooterComponent={this.renderFooter}
                                data={this.state.lastPostList}
                                numColumns={2}
                                renderItem={this._renderItem}
                                keyExtractor={(item:any)=>item.id.toString()}
                                showsVerticalScrollIndicator={true}
                            />
                        </SafeAreaView>
                    </View>
                </Content>
            // </Container>
        )
    }

}
const mapStateToProps = (state: AppState) => ({
    posterList: state.posterReducer.posterList,
    user: state.userReducer.user,
});

//@ts-ignore
const mapDispatchToProps = dispatch => ({
    fetchPosters: () => dispatch(fetchPosters())
});

const styles = StyleSheet.create({
    lastPost: {
        margin: 5,
        flexDirection:'column',
        height:280,
        width: '48%',
        borderWidth:1,
        borderRadius: 10,
        padding:5,
        // textAlign:'auto'
        // alignItems:'center'
        }
})

export default connect(mapStateToProps, mapDispatchToProps)(LastPostCom);

