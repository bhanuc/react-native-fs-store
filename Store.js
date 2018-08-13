const RNFS = require('react-native-fs');

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
}

export default Store;
