import { useContext } from "react";
// import jwtDecode from "jwt-decode";

import AuthContext from "./context";
import authStorage from "../auth/storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  // const logIn = (authToken) => {
  //   const user = jwtDecode(authToken);
  //   setUser(user);
  //   authStorage.storeToken(authToken);
  // };

  const logIn = (data) => {
    setUser(data.user);
    authStorage.storeToken(data.accessToken);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { user, logIn, logOut };
};
