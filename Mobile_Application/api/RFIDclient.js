import { create } from "apisauce";
import cache from "../utility/cache";
import authStorage from "../auth/storage";
import settings from "../config/settings";

const rfidClient = create({
  baseURL: "http://192.168.4.1",
});

// Add token to headers to each request.
// rfidClient.addAsyncRequestTransform(async (request) => {
//   const authToken = await authStorage.getToken();
//   if (!authToken) return;
//   request.headers["x-auth-token"] = authToken;
// });

const get = rfidClient.get; //reference
rfidClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  return response;
};

export default rfidClient;
