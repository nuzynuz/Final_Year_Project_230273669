import Constants from "expo-constants";
const myTestIPs = Object.freeze({
  RFID: "http://192.168.4.101:8088/api",
  MOBILE: "http://172.20.10.2:8088/api"
});
const myCurrentIp = myTestIPs.RFID;


const settings = {
  dev: {
    // apiUrl: "http://192.168.1.101:9001/api",
    // https://done-with-it-selling.azurewebsites.net/api
    apiUrl: myCurrentIp,
  },
  staging: {
    apiUrl: myCurrentIp,
  },
  prod: {
    apiUrl: myCurrentIp,
  },
};

getCurrentSettings = () => {
  //Determinig curent environment and return accordingly.
  if (__DEV__) return settings.dev; // if we run locally this _DEV_ returns true
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
