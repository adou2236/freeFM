import 'es6-promise/auto'   //引用依赖
import state from './state'  //引用同目录下的state.js
// import mutations from './mutation'  //引用同目录下的mutations.js
import { createStore } from 'redux';


const store = createStore(state);

export default store;
