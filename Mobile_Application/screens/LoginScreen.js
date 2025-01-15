import React, { useEffect, useState } from "react";
import { StyleSheet, Image } from "react-native";
import * as Yup from "yup";
import { Redirect, Stack } from "expo-router";

import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";
import authApi from "../api/auth";
// import useAuth from "../auth/useAuth";
import { useSession } from "../authContext/ctx";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen(props) {
  //Applciaiton can be many context. Here we consume AuthContext.

  const [loginFailed, setLoginFailed] = useState(false);
  const { signIn, session, signOut } = useSession();
 
  // const [user, setUser] = useState();
  /*
  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    // auth.logIn(result.data.accessToken);
    auth.logIn(result.data);
    // const user = await authStorage.getUser();
    // console.log("Current logged in user:");
    // console.log(user);
    // if (user) setUser(user);
  };
*/

  const handleSubmit = async ({ email, password }) => {
    console.log("::::::::: LOGIN START :::::::::::::")
    const result = await authApi.login(email, password);
  //   const result = await authApi.login({
  //     "email": "cagent@domain.com",
  //     "password": "65uBppN"
  // });
  //signOut();
    if (!result.ok)  
    {
     console.log("::::::::::::::::::::: LOGIN fail :::::::::::::")
     console.log(result.data);
      return setLoginFailed(true);
    }

    setLoginFailed(false);
      console.log("::::::::::::::::::::: LOGIN SUCCESS :::::::::::::");
      console.log(result.data);
    // signIn("collecting-agent");
    // signIn(JSON.stringify(result.data));

    // const user = {
    //   name: "Temp",
    //   email: "temp@gmail.com",
    //   // role: "collecting-agent",
    //   // role: "farmer",
    //   role: "verification-agent",
    // };

     signIn(JSON.stringify(result.data.user));
  };

  if (!session)
    return (
      <Screen style={styles.container}>
        {/* <Image style={styles.logo} source={require("@/assets/logo-red.png")} /> */}

        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage
            error="Invalid email or password."
            visible={loginFailed}
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"           
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"      
          />
          <SubmitButton title="Login" />
        </AppForm>
      </Screen>
    );
  if (session) return <Redirect href="/" />;
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
