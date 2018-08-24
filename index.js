import Store from './Store.js';

const store = !__DEV__ ?
    require('react-native').AsyncStorage :
    new Store('default');

export default store;