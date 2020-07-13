// pages/DummyPage

import React from 'react';
import {connect} from 'react-redux';
import {FlatList, StyleSheet, View, Text, Dimensions,
  Image, TouchableOpacity
} from 'react-native';
import {Content, Container, Header, Item, Icon, Input} from 'native-base'
import {IPoster, PageProps} from '../../types';
import * as actions from '../../actions';
import {trans} from '../../helper';
import axios from 'axios';
import images from '../../assets/images/images';
//@ts-ignore
import Category from 'react-native-category';
import RBSheet from 'react-native-raw-bottom-sheet';
import {API_URL, COLORS} from "../../constants";
import TopPostCom from "../../components/TopPostCom";
import {fetchPosters, setCategoryList, setDepartmentList} from "../../actions";
import {AppState} from "../../store";
import LastPostCom from '../../components/LastPostCom';


export interface Props extends PageProps {
  categoryList: any[];
  departmentList: any[];
  setCategoryList: (categoryList: any) => void;
  setDepartmentList: (departmentList: any) => void;
  posterList: IPoster[];
  fetchPosters: () => void;
}

interface State {
  categoryList: any[];
  categoryHorizontalList: any[];
  num: number;
  posterList: IPoster[]
  facultyName: string;
}

class HomePage extends React.Component<Props, State> {
  static navigationOptions = () => {
    return {
      title: 'Home',
    };
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      categoryList: [] as any,
      categoryHorizontalList: [] as any,
      posterList: [],
      facultyName: 'facultyNameRu',
      num: 0
    };
  }

  async componentDidMount(){
    if(!this.props.categoryList.length){
      this.getCategoryList()
    }
    else{
      this.setState({categoryList:this.props.categoryList});
      const itemWdt = Math.floor((Dimensions.get('window').width-60)/60)
      this.setState({categoryHorizontalList: this.props.categoryList.slice(0,itemWdt-1)})
    }
    if(!this.props.departmentList){
       this.getDepartmentList();
    }
    // if(this.props.posterList.length){
        await this.props.fetchPosters();
    // }
  }

  async getDepartmentList(){
    try{
      const response = await axios.get(`${API_URL}departments`)
      if(response.data){
        this.props.setDepartmentList(response.data);
      }
    }
    catch(error){
      console.log(error)
    }
  }

  async getCategoryList(){
      try{
        const response = await axios.get(`${API_URL}faculties`)
        if(response.data){
          this.setState({categoryList:response.data});
          const itemWdt = Math.floor((Dimensions.get('window').width-60)/60)
          this.setState({categoryHorizontalList: this.state.categoryList.slice(0,itemWdt-1)})
          this.props.setCategoryList(response.data);
        }
      }
      catch(error){
        console.log(error)
      }
  }

  _renderItem=(item:any)=>{
    if(item.item.id < 13)
    return(
        <TouchableOpacity style = {{margin: 5,flexDirection:'row'}}>
          <Image
              //@ts-ignore
              source={images[item.item.id]}
              style={{height:45, width:45, marginHorizontal:10}}
          />
          <Text style={styles.renderItemCategoryText}>{item.item[this.state.facultyName]}</Text>
        </TouchableOpacity>
    )
    else{
      return (
          <View>
          <TouchableOpacity style = {{margin: 5,flexDirection:'row'}}>
            <Image
                //@ts-ignore
                source={images[item.item.id]}
                style={{height:45, width:45, marginHorizontal:10}}
            />
            <Text style={styles.renderItemCategoryText}>{item.item[this.state.facultyName]}</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {{margin: 5,flexDirection:'row'}}>
            <Image
              //@ts-ignore
              source={require('../../assets/images/14.png')}
              style={{height:45, width:45, marginHorizontal:10}}
            />
            <Text style={styles.renderItemCategoryText}>Другое</Text>
          </TouchableOpacity>
      </View>
    )
    }
};
  _renderSeparator = () =>{
    return(
        <View
            style={{
              height:1,
              width:'95%',
              backgroundColor:'#CED0CE',
              marginLeft: 10
            }}
        />
    )
  }
  _render=(item:any)=>{
    return(
        <TouchableOpacity style = {{margin:5, marginTop:21}}>
          <Image
              //@ts-ignore
              source={images[item.item.id]}
              style={{height:55, width:55}}
          />
          <Text style={styles.renderItemCategoryText}></Text>
        </TouchableOpacity>
    )
  }

  render()

  {
    return (
        <Container style={{backgroundColor:'white'}}>
          <Header searchBar rounded
            style={{backgroundColor:COLORS.b}}
            androidStatusBarColor={COLORS.b}
          >
            <Item>
              <Icon name="ios-search" />
              <Input
                  placeholder={trans('search')}
                  onChange={()=>{}}
              />
            </Item>
          </Header>
          <Content style={styles.header}>
            <View style={{flexDirection:'row'}}>
              <View style={styles.category}>
              <Text>{trans('categories')}</Text>
                <TouchableOpacity
                    //@ts-ignore
                    onPress={() => this.RBSheet.open()}
                >
                  <Image
                      source={require('../../assets/images/14.png')}
                      style={{height:55, width:55}}
                  />
                </TouchableOpacity>
              </View>
              {/* not all categories */}
              <FlatList
                  horizontal
                  data = {this.state.categoryHorizontalList}
                  keyExtractor={(item:any)=>item.id.toString()}
                  renderItem={this._render}
              />
              <RBSheet
                  ref={ref => {
                    //@ts-ignore
                    this.RBSheet = ref;
                  }}
                  height={600}
                  duration={350}
                  closeOnDragDown
                  customStyles={{
                    container: {
                      paddingHorizontal:15,
                      borderTopRightRadius:20,
                      borderTopLeftRadius: 20,
                      backgroundColor: COLORS.b,
                      opacity: 0.85
                    },
                    draggableIcon: {
                      marginBottom:15,
                      backgroundColor: 'white'
                    }
                  }}
              >
                <FlatList
                    data = {this.state.categoryList}
                    keyExtractor={(item:any)=>item.id.toString()}
                    renderItem = {this._renderItem}
                    showsVerticalScrollIndicator={true}
                    ItemSeparatorComponent={this._renderSeparator}
                />
              </RBSheet>
            </View>
            <View>
              <TopPostCom
                  navigation={this.props.navigation}
                  // posterList={this.state.posterList}

              />
              {/* <SafeAreaView> */}
              <LastPostCom                  
                  navigation={this.props.navigation}
                  // posterList={this.state.posterList}
                  myPosts={false}
                  title={"Последние посты"}
              />
              {/* </SafeAreaView> */}
            </View>
          </Content>
        </Container>
    );
  }
}

// styles
const styles = StyleSheet.create({
  header:{
    margin: 10,
    flexDirection: 'column'
  },
  category: {
    
  },
  renderItemCategoryText: {
    textAlign:'justify',
    marginTop:12,
    color: 'white'
  }
});

const mapStateToProps = (state: AppState) => ({
  categoryList: state.categoryReducer.categoryList,
  departmentList: state.categoryReducer.departmentList,
  posterList: state.posterReducer.posterList
});

//@ts-ignore
const mapDispatchToProps = dispatch => ({
    fetchPosters: () => dispatch(fetchPosters()),
    setCategoryList: (categoryList: any) => dispatch(setCategoryList(categoryList)),
    setDepartmentList: (departmentList: any) => dispatch(setDepartmentList(departmentList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
