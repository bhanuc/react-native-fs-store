// __mocks__/react-native-fs.js
'use strict';

const fs = {};

fs.readFile = () => {
    return Promise.resolve('{"testItem" : {"test": "value"}}');
};
fs.writeFile = () => {
    return Promise.resolve('{"test": "value"}');
};
fs.exists = () => {
    return Promise.resolve(true);
};

module.exports = fs;