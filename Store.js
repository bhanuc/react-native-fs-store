const RNFS = require('react-native-fs');
const merge = require('lodash.merge');

class Store {
  constructor(name, cache){
    this.name = name;
    this.cache = cache;
    this.fileName = `${RNFS.DocumentDirectoryPath}/${this.name}.rnjs`;
  }
  async init(){
    try {
      const file = await RNFS.exists(this.fileName);
      if (file) {
        return;
      }
      return RNFS.writeFile(this.fileName, '{}');
    } catch (error) {
      console.log('error in init', error);
    }
  }

  async getItem(key) {
    try {
      const file = await RNFS.readFile(this.fileName);
      const items = JSON.parse(file);
      return items[key];
    } catch (error) {
      console.log('error in getItem', error);
    }
  }
  async setItem(key, value) {
    try {
      const file = await RNFS.readFile(this.fileName);
      const items = JSON.parse(file);
      items[key] = value;
      return RNFS.writeFile(this.fileName, JSON.stringify(items));
    } catch (error) {
      console.log('error in getItem', error);
    }
  }
  async removeItem(key) {
    try {
      const file = await RNFS.readFile(this.fileName);
      const items = JSON.parse(file);
      delete items[key];
      return RNFS.writeFile(this.fileName, JSON.stringify(items));
    } catch (error) {
      console.log('error in removeItem', error);
    }
  }
  async mergeItem(key, value) {
    try {
      const file = await RNFS.readFile(this.fileName);
      const items = JSON.parse(file);
      items[key] = merge(items[key], value);
      return RNFS.writeFile(this.fileName, JSON.stringify(items));
    } catch (error) {
      console.log('error in mergeItem', error);
    }
  }
  async clear() {
    try {
      return RNFS.writeFile(this.fileName, '{}');
    } catch (error) {
      console.log('error in clear', error);
    }
  }
  async multiGet(keys, cb) {
    if (!Array.isArray(keys)) {
      console.log('input to multiGet is not an array.');
      return;
    }
    try {
      const file = await RNFS.readFile(this.fileName);
      const items = JSON.parse(file);
      const output = keys.map(key => [key, items[key]]);
      if (cb && typeof cb === 'function') {
        return cb(null, output)
      }
      return output;
    } catch (error) {
      console.log('error in multiGet', error);
      if (cb && typeof cb === 'function') {
        cb(error);
      }
    }
  }
  async multiSet(pairs) {
    if (!Array.isArray(pairs)) {
      console.log('input to multiGet is not an array.');
      return;
    }
    try {
      const file = await RNFS.readFile(this.fileName);
      const items = JSON.parse(file);
      pairs.forEach(pair => {
        if (Array.isArray(pair) && pair.length > 1) {
            items[pair[0]] = pair[1];
        }
      });
      return RNFS.writeFile(this.fileName, JSON.stringify(items));
    } catch (error) {
      console.log('error in multiSet', error);
    }
  }

  async multiRemove(keys) {
    if (!Array.isArray(keys)) {
      console.log('input to multiGet is not an array.');
      return;
    }
    try {
      const file = await RNFS.readFile(this.fileName);
      const items = JSON.parse(file);
      keys.forEach(key => {
        delete items[key];
      });
      return RNFS.writeFile(this.fileName, JSON.stringify(items));
    } catch (error) {
      console.log('error in multiRemove', error);
    }
  }
  async multiMerge(pairs) {
    if (!Array.isArray(pairs)) {
      console.log('input to multiGet is not an array.');
      return;
    }
    try {
      const file = await RNFS.readFile(this.fileName);
      const items = JSON.parse(file);
      pairs.forEach(pair => {
        if (Array.isArray(pair) && pair.length > 1) {
            items[pair[0]] = merge(items[pair[0]], pair[1]);
        }
      });
      return RNFS.writeFile(this.fileName, JSON.stringify(items));
    } catch (error) {
      console.log('error in multiSet', error);
    }
  }
}

export default Store;
