# react-native-store
React Native store

# Benefits
- Stores data in FileSystem, no more stuck promises in development
- API similar to asyncStorage, currently subset of the API supported.

# Installation process

## Need to install react-native-fs
`npm i react-native-fs react-native-store`

`react-native link react-native-fs`


# Usage
```javascript
import Store from "./Store";

const Storage = new Store('default', false);



await Storage.setItem('unique_key', JSObject);


...
const JSObject = await Storage.getItem('unique_key');
```

# Why is this needed, where will this go.
Well the need of the package comes from the current state of async-storage, which sometimes break in performance, there are no known fixes for the same, hence I wrote a simple fs based key store system.
This can be also be used to store encrypted contents as well provide a development fallback over async-storage.
