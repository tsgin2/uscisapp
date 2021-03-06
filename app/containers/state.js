/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { 
  responsiveHeight, 
  responsiveWidth, 
  responsiveFontSize 
} from 'react-native-responsive-dimensions';
import {
  searchAction
} from '../../actions'
import { stateInfo } from '../components/stateInfo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as color from '../components/color';
import * as font from '../components/font';
import { SearchBar } from 'react-native-elements';

class State extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      stateList: stateInfo,
      searchStateList: [],
    }
  }
  componentDidMount() {
    this.setState({searchStateList: this.state.stateList})
  }
  _searchAction(title) {
    if (title !== undefined) {
        //console.log(action.title)
        let loweredTitle = title.toLowerCase()
        //let songTitles = this.state.songList
        // update error ! whenever filter the search, reuse the original list: not updated list.
        let filteredTitles = stateInfo.filter((item) => {
        return item.name.toLowerCase().match(loweredTitle)
        })
          if (!title || title === '') {
              this.setState({searchStateList: this.state.stateList})
          } else if (!Array.isArray(filteredTitles) && !filteredTitles.length) {
            // set no data flag to true so as to render flatlist conditionally
          } else if (Array.isArray(filteredTitles)) {
              this.setState({searchStateList: filteredTitles})
          } else {
            console.log()
          }
      } else {
          this.setState({searchStateList: this.state.stateList })
      }       
  }
  _renderItems(state, index, fontSize, lineHeight) {
    const tab = '     '
    // const fontSize = this.props.settingData.fontSize
    return (
      <View style={styles.cell}>
        <View style={styles.box_one}>
          <View style={styles.img_box}>
            <Image source={state.flag} style={{}}/>
          </View>
          <View style={styles.name_box}>
            <Text style={[styles.name_txt, {fontSize, lineHeight}]}>{state.name}</Text>
          </View>
          <View style={styles.num_box}>
            <Text style={styles.num_text}>{index+1}</Text>
          </View>
        </View>
        <View style={styles.box_two}>
          <View style={styles.city_box}>
            <Text style={[styles.city_txt, {fontSize, lineHeight}]}>City:{tab}{tab}{tab}{state.city}</Text>
          </View>
          <View style={styles.governor_box}>
            <Text style={[styles.governor_txt, {fontSize, lineHeight}]}>Governor:{tab}{state.governor}</Text>
          </View>
        </View>
      </View>
      )
  }
  render() {
    console.log('state.js')
    const fontSize = this.props.settingData.fontSize - 1
    const lineHeight = this.props.settingData.fontSize + 10
    const header = <SearchBar placeholder="search" 
                              //placeholderTextColor="#000000"
                              containerStyle={{backgroundColor: color.bg, borderColor: 'white'}}
                              inputStyle={{backgroundColor: 'white'}}
                              //lightTheme
                              onChangeText={(text) => this._searchAction(text)} round />;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <FlatList data={this.state.searchStateList}
                  ListHeaderComponent={header}
                  renderItem={({item, index}) => this._renderItems(item, index, fontSize, lineHeight)}
        />
      </View>
    );
  }
}

const styles=StyleSheet.create({
  cell: {
    height: responsiveHeight(20),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: color.bg,
  },
  box_one: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 10,
    paddingBottom: 2,
    paddingHorizontal: 10
  },
  box_two: {
    flex: 2,
    paddingTop: 3,
    paddingBottom: 10,
    paddingHorizontal: 10
  },
  img_box: {
    flex: 1,
    //borderRadius: 10,
    //backgroundColor: 'green',
  },
  name_box: {
    flex: 3,
    justifyContent: 'center',
    //backgroundColor: 'yellow'
  },
  name_txt: {
    fontFamily: font.cabin_regular,
    fontSize: 18,
    fontWeight: '900',
    color: color.text
  },
  city_box: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 15,
  },
  city_txt: {
    fontFamily: font.cabin_regular,
    lineHeight: 22,
    fontWeight: '500',
    color: color.text,
    //fontSize: 15,
  },
  governor_box: {
    flex: 1,
    justifyContent: 'center',
    //backgroundColor: 'red'
  },
  governor_txt: {
    fontFamily: font.cabin_regular,
    fontWeight: '500',
    color: color.text,
    //fontSize: 15,
  },
  num_box: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 30,
    height: 30,
    padding: 5,
    backgroundColor: 'rgba(51,51,51,1)'
  },
  num_text: {
    textAlign: 'center',
    fontFamily: font.cabin_regular,
    color: color.white,
  }
})

function mapStateToProps(state) {
  return {
    settingData: state.settingData
  }
}


export default connect(mapStateToProps, null)(State);
