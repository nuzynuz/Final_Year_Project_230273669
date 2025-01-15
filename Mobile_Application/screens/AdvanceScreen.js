import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { Title, Caption } from "react-native-paper";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";
import advanceApi from "../api/advance";
import useAuth from "../auth/useAuth";
import AppText from "../components/AppText";
import ButtonRoundCorner from "../components/ButtonRoundCorner";

const validationSchema = Yup.object().shape({
  amount: Yup.string().required().min(1).label("Amount"),
  comment: Yup.string().required().min(1).label("Comment"),
});

function AdvanceScreen({ navigation }) {
  const { user, logOut } = useAuth();

  const handleSubmit = async ({ amount, comment }, { resetForm }) => {
    const result = await advanceApi.requestAdvance(
      amount,
      comment,
      user.userId
    );
    if (!result.ok) return alert("Error Occured!");
    resetForm();
    alert("Request Sent!");
    navigation.navigate("advanceListScreen");
  };
  return (
    <Screen style={styles.container}>
      <MaterialCommunityIcons
        style={styles.logo}
        name="cards"
        color={colors.primary}
        size={70}
      />
      <AppText style={styles.heading}>Request Advance</AppText>
      <AppForm
        initialValues={{ amount: "", comment: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {/* <ErrorMessage error="Try again!" visible={loginFailed} /> */}
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="cards"
          name="amount"
          placeholder="Amount (Rs.)"
          keyboardType="decimal-pad"
          textContentType="none"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          multiline={true}
          icon="chat-processing-outline"
          name="comment"
          placeholder="Comment"
          textContentType="none"
        />
        <SubmitButton title="Request Now" />
        <ButtonRoundCorner
          title="Cancel"
          color={"medium"}
          onPress={() => navigation.navigate("advanceListScreen")}
        />
      </AppForm>
    </Screen>
  );
}
export default AdvanceScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  tagFormInput: {
    // backgroundColor: colors.secondary,
    flexDirection: "column",
  },
  tagFormField: {
    // backgroundColor: colors.secondary,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
  },
  heading: {
    alignSelf: "center",
    color: colors.primary,
    fontWeight: "bold",
    marginBottom: 30,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  infoBoxLg: {
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  infoBoxSm: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
