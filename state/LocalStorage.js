import { AsyncStorage } from 'react-native';

const Keys = {
  Realtors: 'Realtors',
};

async function getAllRealtorsAsync() {
  let results = await AsyncStorage.getItem(Keys.Realtors);

  try {
    return JSON.parse(results);
  } catch(e) {
    return null;
  }
}

function saveAllRealtorsAsync(realtors) {

  _removeAllRealtorsAsync();
  return AsyncStorage.setItem(Keys.Realtors, JSON.stringify(realtors));
}

function _removeAllRealtorsAsync() {
  return AsyncStorage.clear();
}

export default {
  getAllRealtorsAsync,
  saveAllRealtorsAsync
};
