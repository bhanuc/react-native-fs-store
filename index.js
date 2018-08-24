import Store from './Store.js';
import { AsyncStorage } from 'react-native';
let store;
if (__DEV__) {
	store = AsyncStorage;
} else {
	store = new Store('default');
}

export default store;
