import client from "./client";
const login = (email, password) => client.post("/auth", { email, password }).catch(e=>console.log(e));

export default {
  login,
};
