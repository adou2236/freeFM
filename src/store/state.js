let currentMusic = {
  duration:0,
  cover:{
    urls:{
      0:{
       url:""
      }
    }
  },
  audioURL:{
    urls:{
      0:{
        url:""
      }
    }
  }
};
let playingAlbum = {};
let userId = '';
let userName = '未登录';
let albumId = ''
let collection =[];
let theme = 'light'

try {
  if (localStorage.getItem('currentMusic')) {
    currentMusic =JSON.parse(localStorage.getItem('currentMusic'))//存放在localstore的值是字符串类型，必须做一次转换
  }
  if (localStorage.getItem('playingAlbum')) {
    playingAlbum =JSON.parse(localStorage.getItem('playingAlbum'))//存放在localstore的值是字符串类型，必须做一次转换
  }
  if (localStorage.getItem('collection')) {
    collection = localStorage.getItem('collection')
  }
} catch (e) {}

const defaultState = {
  currentMusic:currentMusic,
  userId:userId,
  userName:userName,
  collection:collection,
  albumId:albumId,
  playingAlbum:playingAlbum,
  theme:theme
};


export default (state = defaultState,action)=>{
  if(action.type === 'change_input_value'){
    // why copy old state -> newState ? reducer 可以接收state 不能修改state！！！
    const newState = JSON.parse(JSON.stringify(state)); // 深度拷贝
    newState[action.key] = action.value;
    return newState;
  }
  return state;
}
