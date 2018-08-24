const path = require('path');

const store = !__DEV__ ?
    require('react-native').AsyncStorage :
    new require(path.join(__dirname, '/Store.js'))('default');

export default store;