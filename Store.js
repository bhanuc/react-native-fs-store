const RNFS = require('react-native-fs');
const merge = require('lodash.merge');

class Store {
  constructor(name) {
    this.name = name;
    this.initDone = false;
    this.fileName = `${RNFS.DocumentDirectoryPath}/${this.name}.rnjs`;
  }

  async init() {
    if (this.initDone) {
      return;
    }
    try {
      const file = await RNFS.exists(this.fileName);
      if (file) {
        return;
      }
      this.initDone = true;
      return RNFS.writeFile(this.fileName, '{}');
    } catch (error) {
      console.log('error in init', error);
    }
  }

  flushGetRequests(){
    return true;
  }

  async getItem(key) {
    await this.init();
    try {
      const file = await RNFS.readFile(this.fileName);
      const items = JSON.parse(file);
      return items[key];
    } catch (error) {
      console.log('error in getItem', error);
    }
  }
  async setItem(key, value) {
    await this.init();
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
    await this.init();
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
    await this.init();
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
    await this.init();
    try {
      return RNFS.writeFile(this.fileName, '{}');
    } catch (error) {
      console.log('error in clear', error);
    }
  }
  async multiGet(keys, cb) {
    await this.init();
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
    await this.init();
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
    await this.init();
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
    await this.init();
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