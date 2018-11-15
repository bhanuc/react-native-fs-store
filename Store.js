const RNFS = require('react-native-fs');
const merge = require('lodash.merge');

const errUtil = (error, msg) => {
  error.message = `${msg} ${error.message}`;
  return error;
};

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
      throw errUtil(error, 'error in init');
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
      throw errUtil(error, 'error in getItem');
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
      throw errUtil(error, 'error in setItem');
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
      throw errUtil(error, 'error in removeItem');
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
      throw errUtil(error, 'error in mergeItem');
    }
  }
  async clear() {
    await this.init();
    try {
      return RNFS.writeFile(this.fileName, '{}');
    } catch (error) {
      throw errUtil(error, 'error in clear');      
    }
  }
  async multiGet(keys, cb) {
    await this.init();
    if (!Array.isArray(keys)) {
      throw new Error('input to multiGet is not an array.');
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
      if (cb && typeof cb === 'function') {
        cb(error);
      }
      throw errUtil(error, 'error in multiGet');      
    }
  }
  async getAllKeys(cb) {
    await this.init();
    try {
      const file = await RNFS.readFile(this.fileName);
      const items = JSON.parse(file);
      const output = Object.keys(items);
      if (cb && typeof cb === 'function') {
        return cb(null, output)
      }
      return output;
    } catch (error) {
      if (cb && typeof cb === 'function') {
        cb(error);
      }
      throw errUtil(error, 'error in multiGet');      
    }
  }
  async multiSet(pairs) {
    await this.init();
    if (!Array.isArray(pairs)) {
      throw new Error('input to multiSet is not an array.');
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
      throw errUtil(error, 'error in multiSet');      
    }
  }

  async multiRemove(keys) {
    await this.init();
    if (!Array.isArray(keys)) {
      throw new Error('input to multiRemove is not an array.');
    }
    try {
      const file = await RNFS.readFile(this.fileName);
      const items = JSON.parse(file);
      keys.forEach(key => {
        delete items[key];
      });
      return RNFS.writeFile(this.fileName, JSON.stringify(items));
    } catch (error) {
      throw errUtil(error, 'error in multiRemove');
    }
  }
  async multiMerge(pairs) {
    await this.init();
    if (!Array.isArray(pairs)) {
      throw new Error('input to multiMerge is not an array.');
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
      throw errUtil(error, 'error in multiMerge');      
    }
  }
}

export default Store;