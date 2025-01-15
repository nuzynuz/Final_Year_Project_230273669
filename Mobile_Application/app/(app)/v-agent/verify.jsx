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

import colors from "../../../config/colors";
import Screen from "../../../components/Screen";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from "../../../components/forms";
import tagApi from "../../../api/tag";

import AppText from "../../../components/AppText";
import ButtonRoundCorner from "../../../components/ButtonRoundCorner";
import { useSession } from "../../../authContext/ctx";

const validationSchema = Yup.object().shape({
  weight: Yup.string().required().min(1).label("Weight"),
});

const reportValidationSchema = Yup.object().shape({
  reportDesc: Yup.string().required().min(4).label("ReportDesc"),
});
const verify = () => {
  const { session } = useSession();
  const user = JSON.parse(session);

  const [RFIDTagValue, setRFIDTagValue] = useState("");
  const [readFailed, setReadFailed] = useState(false);
  const [isFormShow, setIsFormShow] = useState(true);
  const [isBtnsShow, setIsBtnsShow] = useState(false);

  let initialStat = {
    weightShortage: 0.0,
    weightNow: 0.0,
    netWeight: 0.0,
    water: 0.0,
    quality: "-",
    supplierCode: "-",
    colRegion: "-",
  };
  const [stat, setStat] = useState(initialStat);

  const handleSubmit = async ({ rfid, weight }, { resetForm }) => {
    console.log(rfid + " " + weight + " ");
    const result = await tagApi.verifyWeight(RFIDTagValue, weight);

    if (!result.ok) return alert("Try again!");
    stat.weightShortage = result.data.data.weightShortage;
    stat.weightNow = result.data.data.weightNow;
    stat.netWeight = result.data.data.netWeight;
    stat.water = result.data.data.waterWeight;
    stat.quality = result.data.data.qualityGrade;
    stat.supplierCode = result.data.data.supplierCode;
    stat.colRegion = result.data.data.colRegion;
    resetForm();
    console.log(stat);
    setStat({
      weightShortage: result.data.data.weightShortage,
      weightNow: result.data.data.weightNow,
      netWeight: result.data.data.netWeight,
      water: result.data.data.waterWeight,
      quality: result.data.data.qualityGrade,
      supplierCode: result.data.data.supplierCode,
      colRegion: result.data.data.colRegion,
    });
    setIsFormShow(false);
    setIsBtnsShow(true);
  };

  const handleVialationSubmit = async ({ reportDesc }, { resetForm }) => {
    const result = await tagApi.addVialation(reportDesc, user.id);
    if (!result.ok) return alert("Try again!");
    resetForm();
    alert("Done! Report sent.");
    setRFIDTagValue("");
    setIsBtnsShow(false);
    setIsFormShow(true);
  };

  const getRFID = async () => {
    const result = await tagApi.getRFID();
    if (!result.ok) {
      setRFIDTagValue("");
      setReadFailed(true);
    } else {
      setReadFailed(false);
      setRFIDTagValue(result.data.id.trim());
    }
  };

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <MaterialCommunityIcons
          style={styles.logo}
          name="truck-check"
          color={colors.primary}
          size={70}
        />
        <AppText style={styles.heading}>Verify Weightage</AppText>
        {isFormShow === true ? (
          <>
            <AppForm
              initialValues={{ rfid: "", weight: "" }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <ErrorMessage error="Try to read again!" visible={readFailed} />

              <View style={styles.tagFormField}>
                <View style={styles.tagFormInput}>
                  <AppFormField
                    width={300}
                    disabled
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="bookmark-check"
                    keyboardType="default"
                    name="rfid"
                    value={RFIDTagValue}
                    placeholder="Tea bag's Tag"
                    textContentType="none"
                  />
                </View>
                <TouchableOpacity onPress={() => getRFID()}>
                  <View style={styles.container}>
                    <MaterialCommunityIcons
                      name="plus-circle"
                      color={colors.dark}
                      size={40}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="bag-carry-on-check"
                name="weight"
                placeholder="Kg now"
                keyboardType="decimal-pad"
                textContentType="none"
              />
              <SubmitButton title="Proceed Verify" />
            </AppForm>
          </>
        ) : (
          <>
            <View style={styles.infoBoxWrapper}>
              <View
                style={[
                  styles.infoBox,
                  {
                    borderRightColor: "#dddddd",
                    borderRightWidth: 1,
                  },
                ]}
              >
                <Title>{stat.weightShortage}</Title>
                <Caption>Shortage</Caption>
              </View>
              <View style={styles.infoBox}>
                <Title>{stat.weightNow}</Title>
                <Caption>Weight Now</Caption>
              </View>
            </View>
            <View style={styles.infoBoxWrapper}>
              <View
                style={[
                  styles.infoBox,
                  {
                    borderRightColor: "#dddddd",
                    borderRightWidth: 1,
                  },
                ]}
              >
                <Title>{stat.netWeight}</Title>
                <Caption>Net Weight</Caption>
              </View>
              <View style={styles.infoBox}>
                <Title>{stat.water}</Title>
                <Caption>Water</Caption>
              </View>
            </View>
            <View style={styles.infoBoxWrapper}>
              <View
                style={[
                  styles.infoBoxSm,
                  {
                    borderRightColor: "#dddddd",
                    borderRightWidth: 1,
                  },
                ]}
              >
                <Title>{stat.quality}</Title>
                <Caption>Quality</Caption>
              </View>
              <View style={styles.infoBoxLg}>
                <Title>{stat.supplierCode}</Title>
                <Title> {stat.colRegion}</Title>
                <Caption>Supr Code | Region</Caption>
              </View>
            </View>
            {isBtnsShow === true ? (
              <View style={styles.buttonsContainer}>
                <ButtonRoundCorner
                  title="All good"
                  color={"secondary"}
                  onPress={() => setIsFormShow(true)}
                />
                <ButtonRoundCorner
                  title="Report"
                  onPress={() => setIsBtnsShow(false)}
                />
              </View>
            ) : (
              <AppForm
                initialValues={{ email: "", password: "" }}
                onSubmit={handleVialationSubmit}
                validationSchema={reportValidationSchema}
              >
                {/* <ErrorMessage error="Try again!" visible={loginFailed} /> */}
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  multiline={true}
                  icon="flag"
                  name="reportDesc"
                  placeholder="Report text"
                  textContentType="none"
                />
                <SubmitButton title="Report Now" />
                <ButtonRoundCorner
                  title="Cancel"
                  color={"medium"}
                  onPress={() => {
                    setIsBtnsShow(true);
                  }}
                />
              </AppForm>
            )}
          </>
        )}
      </ScrollView>
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

export default verify;
