# react-native-fs-store
React Native FS Based store, alternative to Asyncstorage with fallbacks.

[Releted Article] - (https://bhanu.io/react-native-asyncstorage-filesystem-based-alternative-4316aea3e11b)

# Benefits
- Stores data in FileSystem, no more stuck promises in development
- API same as that to asyncStorage, drop-in replacement.

#Cons
- Slower than AsyncStorage, as each operation is synced to file.
- Not reliable for parallel operations, should use bulk-update. 

# Installation process

## Need to install react-native-fs
`npm i react-native-fs react-native-fs-store`

`react-native link react-native-fs`


# Usage
```javascript
import Store from "react-native-fs-store";

const Storage = new Store('default');

await Storage.setItem('unique_key', JSObject);
// You can use almost all methods available in AsyncStorage with same signature.

...
const JSObject = await Storage.getItem('unique_key');
```

# Drop-In-Usage

Replace-
```javascript
import { AsyncStorage } from "react-native";
```
with
```javascript
import Store from "react-native-fs-store";
const AsyncStorage = new Store('default');
```

# To Change the store to AsyncStorage in production & use the fs fallback in development (0.1.x onwards only)

```
import AsyncStorage from "react-native-fs-store/index";

```


You now use it exactly as you would use AsyncStorage.
```javascript
await AsyncStorage.setItem('unique_key', JSObject);
// You can use all methods available in AsyncStorage with same signature.

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
flushGetRequests *
```



# Why is this needed ?
Well the need of the package comes from the current state of async-storage, which sometimes break in development mode only, there are no known fixes for the same, hence I wrote a simple fs based key store system.
[Relevant Issue link](https://github.com/facebook/react-native/issues/12830) 


# What are the limitations.
Simulatenous Parallel operations are not reliable, you should use multi- methods for the time being.
* Note flushGetRequests is a dummy method which doesn't actually do anything but was added so that the library doesn't break if the method is referenced in development. 

