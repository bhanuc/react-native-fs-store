# react-native-fs-store
React Native FS Based store

# Benefits
- Stores data in FileSystem, no more stuck promises in development
- API similar to asyncStorage, drop-in replacement.

# Installation process

## Need to install react-native-fs
`npm i react-native-fs react-native-fs-store`

`react-native link react-native-fs`


# Usage
```javascript
import Store from "react-native-fs-store";

const Storage = new Store('default', false);

await Storage.setItem('unique_key', JSObject);
// You can use almost all methods available in AsyncStorage with same signature.

...
const JSObject = await Storage.getItem('unique_key');
```


# Methods implemented
```
getItem
setItem
removeItem
mergeItem
clear
getAllKeys
multiGet
multiSet
multiRemove
multiMerge
```



# Why is this needed, where will this go.
Well the need of the package comes from the current state of async-storage, which sometimes break in performance, there are no known fixes for the same, hence I wrote a simple fs based key store system.
This can be also be used to store encrypted contents as well provide a development fallback over async-storage.
