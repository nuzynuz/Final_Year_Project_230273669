import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../../../config/colors";
import { useSession } from "../../../../authContext/ctx";
import Screen from "../../../../components/Screen";
import advanceApi from "../../../../api/advance";
import {
  AppForm,
  AppFormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../../../../components/forms";
import { Title, Caption } from "react-native-paper";
import * as Yup from "yup";
import AppText from "../../../../components/AppText";
import ButtonRoundCorner from "../../../../components/ButtonRoundCorner";

const validationSchema = Yup.object().shape({
  amount: Yup.string().required().min(1).label("Amount"),
  comment: Yup.string().required().min(1).label("Comment"),
});

const newAdvance = () => {
  const { session } = useSession();
  const user = JSON.parse(session);

  const handleSubmit = async ({ amount, comment }, { resetForm }) => {
    console.log("===== handleSubmit: ", amount, comment);
    const result = await advanceApi.requestAdvance(amount, comment, user.id);
    if (!result.ok) return alert("Error Occured!");
    resetForm();
    alert("Request Sent!");
    // router.push("/advance-list");
    router.navigate("/farmer/home/new-advance");
    // navigation.navigate("advanceListScreen");
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
          onPress={() => router.navigate("/farmer/home/advance-list")}
        />
      </AppForm>
    </Screen>
  );
};

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

export default newAdvance;
