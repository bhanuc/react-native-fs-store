const store = !__DEV__ ?
    require('react-native').AsyncStorage :
    new require('./Store')('default');

export default store;