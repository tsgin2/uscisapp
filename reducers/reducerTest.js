import RNFS from 'react-native-fs'
import * as color from '../app/components/color';
import { Alert, AsyncStorage } from 'react-native'
const Realm = require('realm')

const initState = {
	allTestData: [],
	testItems: [],
	currentIndex: 0,
	showResult: false,
	nextBtn: false,
	score: 0,
	showScore: true,
	isSuccess: false,
	isSubmit: false,
	percentage: 0,
	count: 0,
	//isTesting: false,

}
const ansObj = {
  name: 'ansObj',
  properties: {
    answer: 'string',
    correct: 'bool'
  }
}

const test = {
  name: 'test',
  properties: {
    id: 'int',
    ques: 'string',
    ans0: 'ansObj[]',
    ans1: 'ansObj[]',
    ans2: 'ansObj[]',
    ans3: 'ansObj[]'
  }
}
export default function(state = initState, action) {
 	switch(action.type){
 		case 'GET_TEST':
 			return state
 		case 'GET_ALL_TEST_DATA':
	 		const allTestData = action.allTestPayload
 		    return {
 		    	...state,
 		    	allTestData,
 		    }
 			break
 		case 'GET_TEST_DATA':
 			testItems = []
 			condition = true
 			while (condition) {
 				let randomItem = state.allTestData[Math.floor(Math.random()*state.allTestData.length)];
 				if (testItems.length == 20) {
 					condition = false
 				} else if (!testItems.includes(randomItem)) {
 					testItems.push(randomItem)
 				} else { }
 			}
 			return {
 				...state,
 				testItems,
 				count: 0,
 			}
 			break
 		case 'CHECK_ANSWER':
 			console.log('he')
 			let score = state.score
 			if (action.payload) {
 				score++	
 			}
 			return {
 				...state,
 				nextBtn: true,
 				showResult: true,
 				score,
 			}
 		case 'RESET_RESULT':
 		    console.log('reset result')
 			return {
 				...state,
 				showResult: false,
 				nextBtn: false,
 			}
 		case 'INDEX_CHANGED':
 			return {
 				...state,
 				currentIndex: action.payload,
 				showResult: false,
 				nextBtn: false,
 			}
 		case 'HIDE_SCORE':
 		//Alert.alert('Hide Score')
 			return {
 				...state,
 				showScore: false,
 				//isTesting: true,
 			}
 		case 'SHOW_SCORE': {
 			return {
 				...state,
 				showScore: true,
 			}
 		}
 		case 'SUBMIT':
 			let percentage = state.score * 100/20
 			console.log(state.score)
 			console.log(percentage)
 			let isSuccess;
  			if (percentage >= 50) {
 				isSuccess = true
 			}
 			AsyncStorage.setItem('@score', percentage.toString())
 			return {
 				...state,
 				showScore: true,
				currentIndex: 0,
				showResult: false,
				nextBtn: false,
				isSubmit: false,
				score: 0,
 				percentage,
 				isSuccess,

 			}
 		case 'CHANGE_BTN': {
 			return {
 				...state,
 				isSubmit: true
 			}
 		}
 		
 		case 'GET_SCORE': {
 			if (action.payload == null) {
 				//Alert.alert(action.payload)
 				return {
 					...state,
 					percentage: 0,
 				}
 			} else {
 				let isSuccess;
 				if (parseInt(action.payload) >= 50) {
 					isSuccess = true
 				}
				return {
 					...state,
 					percentage: parseInt(action.payload),
 					isSuccess
 				}
 			}
 		}
 		default:
 			return state
 	}
}