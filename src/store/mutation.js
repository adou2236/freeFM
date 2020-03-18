import state from "./state";
import store from "./index";
export default {
  changeUserId (userId) {
    state.userId = userId;
    try {
      localStorage.userId = userId
    } catch (e) {}
  },
  changeUserName ( userName) {
    state.userName = userName;
    try {
      localStorage.userName = userName
    } catch (e) {}
  },
  changeTheme(theme){
    const action={
      type: 'change_input_value',
      key: 'theme',
      value: theme,
    };
    store.dispatch(action);
    try{
      localStorage.setItem('theme',theme)
    }catch(e){}

  },
  changeCurrentMusic(currentMusic) {
    const action = {
      type:'change_input_value',
      key:'currentMusic',
      value:currentMusic
    };
    store.dispatch(action);
    try{
      localStorage.setItem('currentMusic',JSON.stringify(currentMusic))
    }catch(e){}

  },
  changeAlbum(albumId) {
    const action = {
      type:'change_input_value',
      key:'albumId',
      value:albumId
    };
    store.dispatch(action);
    try{
      localStorage.setItem('albumId',albumId)
    }catch(e){}

  },
  changePlayingAlbum(playingAlbum){
    const action={
      type:'change_input_value',
      key:'playingAlbum',
      value:playingAlbum
    };
    store.dispatch(action);
    try{
      localStorage.setItem('playingAlbum',JSON.stringify(playingAlbum))
    }catch(e){}
  },
  changeCollection( collection) {
    state.collection = collection;
    try {
      localStorage.collection = collection
    } catch (e) {}
  }
}


// const changeUserId =(state, userId)=>{
//   state.userId = userId;
//   try {
//     localStorage.userId = userId
//   } catch (e) {}
// };
// export default (mutations = changeUserId,action)=>{
//   return mutations;
// }
