// __mocks__/react-native-fs.js
'use strict';

const fs = {};
let tmpCache = {};
fs.readFile = (filename) => {
    const file = tmpCache[filename] || '{}';
    return Promise.resolve(file);
};
fs.writeFile = (filename, value) => {
    tmpCache[filename] = value;
    return Promise.resolve();
};
fs.exists = (filename) => {
    return Promise.resolve(true);
};

module.exports = fs;