import AsyncStorage from "@react-native-async-storage/async-storage";
// import moment from "moment";
import dayjs, { Dayjs } from "dayjs";

const prefix = "cache";
const expiryInMinutes = 5;

const isExpired = (item) => {
  const now = dayjs();
  const storeTime = dayjs(item.timestamp);
  return now.diff(storeTime, "minute") > expiryInMinutes;
};

const store = async (key, value) => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);

    // check item is not available.
    if (!item) return null;
    // else > check item has expired.

    if (isExpired(item)) {
      //remove expired item from the cache.
      //Command Query Separation (CQS)  < breaked here
      await AsyncStorage.removeItem(prefix + key);
      return null;
    }

    //Item no expired
    return item.value;
  } catch (error) {
    console.log(error);
  }
};

export default {
  store,
  get,
};
