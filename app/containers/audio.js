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
  AppState
} from 'react-native';
import { 
  responsiveHeight, 
  responsiveWidth, 
  responsiveFontSize 
} from 'react-native-responsive-dimensions';
import {
  controlAudio,
  changeAudio,
  loopControl,
  autoControl
} from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux' 
import { Icon } from 'native-base';
import * as color from '../components/color';
import * as font from '../components/font';

class Audio extends Component<{}> {

  _handleAutoControl() {
    console.log('handling')
    this.props.autoControl()
  }
  componentDidMount() {
    this._interval = setInterval(() => this._handleAutoControl(), 5000);
  }

  render() {
  //console.log(this.props.studyData.engData)
  console.disableYellowBox = true;
  const fontSize = this.props.settingData.fontSize
  const lineHeight = this.props.settingData.fontSize + 10
  const marginHorizontal = this.props.layoutData.audioMarginLeft
  const marginLeft = this.props.layoutData.audioMarginLeft
  const iconSize = this.props.layoutData.audioIconSize
  const marginHorizontalOfControlBox = this.props.layoutData.audioMarginLeft - 30

    
    return (
      <View style={{flex: 1, backgroundColor: color.bg}}>
        <View style={[styles.num_box, {marginLeft}]}>
          <View style={styles.num_style}>
            <Text style={styles.num_text}>{this.props.audioData.index}/100</Text>
          </View>
        </View>
        <View style={[styles.txt_box, {marginHorizontal}]}>
          <View style={styles.card_innerbox}>
            <Text style={[styles.card_txt, {fontSize, lineHeight}]}>{this.props.studyData.engData[this.props.audioData.index - 1].quesEng}</Text>
          </View>
          <Text style={styles.dash_line}> . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .   </Text>
          <View style={styles.card_innerbox}>
             <Text style={[styles.card_txt, {fontSize, lineHeight}]}>{this.props.studyData.engData[this.props.audioData.index - 1].ansEng}</Text>
          </View>
        </View>
        <View style={[styles.control_box, {marginHorizontal: marginHorizontalOfControlBox}]}>
          <View style={styles.auto_box}>
            <Text style={{fontFamily: font.cabin_bold, color: color.white, fontSize: iconSize - 15}}>AUTO</Text>
          </View>
          <View style={styles.btn_box}>
            <TouchableOpacity style={styles.skip_backward} onPress={() => this.props.changeAudio('PREV')}>
              <Icon name='md-skip-backward' style={{fontSize: iconSize - 10, color: 'white'}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.play_box} onPress={() => this.props.controlAudio()}>
              { this.props.audioData.isPlaying ? <Icon name='md-pause' style={{fontSize: iconSize, color: 'white'}}/> :  <Icon name='md-play' style={{fontSize: iconSize, color: 'white'}}/> }
            </TouchableOpacity>
            <TouchableOpacity style={styles.skip_forward} onPress={() => this.props.changeAudio('NEXT')}>
              <Icon name='md-skip-forward' style={{fontSize: iconSize - 10, color: 'white'}}/>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.repeat_box} onPress={() => this.props.loopControl()}>
            <View>
              {this.props.audioData.loop ? <Icon name='ios-repeat' style={{fontSize: iconSize, color: color.red}}/> : <Icon name='ios-repeat' style={{fontSize: iconSize, color: color.white}}/> } 
            </View>
          </TouchableOpacity>
        </View>
        <View style={{height: responsiveHeight(10)}}/>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  txt_box: {
    flex: 4,
    marginVertical: 20,
    //marginHorizontal: 20,
  },
  num_box: {
    flex: 1,
    marginVertical: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    //backgroundColor: '#000000'
  },
  num_style: {
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
    //width: responsiveWidth(22),
    borderWidth: 1.5,
    borderColor: color.white,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  num_text: {
    fontFamily: font.cabin_semibold,
    color: color.white,
  },
  control_box: {
    flex: 0.6,
    flexDirection: 'row',
    //backgroundColor: '#000000'
  },
  auto_box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#000000'
  },
  btn_box: {
    flex: 3,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: color.white,
    justifyContent: 'center',
    padding: 10,
    //backgroundColor: '#000000'
  },
  repeat_box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  play_box: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skip_forward: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    //backgroundColor: '#000000'
  },
  skip_backward: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  card_innerbox: {
    margin: 3,
  },
  card_txt: {
    fontWeight: '600',
    fontFamily: font.cabin_regular,
    textAlign: 'left',
    lineHeight: 22,
    color: color.white,
  },
  dash_line: {
    alignSelf: 'flex-start',
    color: color.white,
    marginVertical: 5,
  },
})

function mapStateToProps(state) {
  return {
    audioData: state.audioData,
    studyData: state.studyData,
    settingData: state.settingData,
    layoutData: state.layoutData

  }
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    controlAudio,
    changeAudio,
    loopControl,
    autoControl
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Audio);

