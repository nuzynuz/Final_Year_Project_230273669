import React, { useState } from "react";
import {
  StyleSheet,
  Modal,
  Button,
  View,
  TouchableOpacity,
} from "react-native";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  AppForm,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import useLocation from "../hooks/useLocation";
import tag from "../api/tag";
import UploadScreen from "./UploadScreen";
import AppText from "../components/AppText";
import colors from "../config/colors";
// import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

function WeightagesAddScreen(props) {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [modelVisible, setModelVisible] = useState(false);

  const [RFIDTagValue, setRFIDTagValue] = useState("");
  const [RFIDFiedBgCol, setRFIDFiedBgCol] = useState("white");

  const handleSubmit = async (formData, { resetForm }) => {
    setProgress(0);
    // console.log(formData);

    setUploadVisible(true);
    const result = await tag.addWeightage(
      { ...formData, location, RFIDTagValue },
      (progress) => setProgress(progress) //call back function to get progress data from api layer
    ); //...listing, location means -> add new property to listing obj
    //console.log(JSON.stringify(result));

    if (!result.ok) {
      setUploadVisible(false);
      if (result.data.error != null) return alert(result?.data.error);
      return alert("Unknown Error!");
    }

    resetForm();
  };

  const getRFID = async () => {
    const result = await tag.getRFID();
    if (!result.ok) {
      setRFIDTagValue("");
      setRFIDFiedBgCol(colors.danger);
      return alert("Try to read again!");
    }
    setRFIDTagValue(result.data.id.trim());
    setRFIDFiedBgCol(colors.secondary);
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <AppText style={styles.heading}>Uplaod Weightage</AppText>
      <AppForm
        initialValues={{
          tagId: "",
          status: "on-the-way",
          activatedTime: "",
          releaseTime: "",
          teaBucket: {
            weight: 0.0,
            waterWeight: 0.0,
            bagWeight: 0.0,
            netWeight: 0.0,
            qualityGrade: "",
            remarks: "",
            farmerId: "",
          },
        }}
        onSubmit={handleSubmit}
        // validationSchema={validationSchema}
      >
        <FormField
          maxLength={100}
          name="teaBucket.farmerId"
          placeholder="Supplier Id"
        />

        <View style={[styles.tagFormField, { backgroundColor: RFIDFiedBgCol }]}>
          <FormField
            maxLength={50}
            width={300}
            name="tagId"
            value={RFIDTagValue}
            editable={true}
            placeholder="RFID Tag ID"
          />
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

        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="teaBucket.weight"
          placeholder="Tea weightage"
          width={150}
        />

        <FormField
          maxLength={8}
          name="teaBucket.qualityGrade"
          placeholder="Quality Grade"
        />

        <FormField
          keyboardType="numeric"
          maxLength={255}
          multiline
          name="teaBucket.remarks"
          numberOfLines={3}
          placeholder="Remarks"
        />

        <View style={styles.tagFormField}>
          <AppText> Add other Weightages</AppText>
          <TouchableOpacity onPress={() => setModelVisible(true)}>
            <View style={styles.container}>
              <MaterialCommunityIcons
                name="plus-circle"
                color={colors.dark}
                size={40}
              />
            </View>
          </TouchableOpacity>
        </View>

        <Modal visible={modelVisible} animationType="slide">
          <Screen>
            <Button title="Close" onPress={() => setModelVisible(false)} />

            <View style={styles.additional}>
              <FormField
                keyboardType="numeric"
                maxLength={4}
                name="teaBucket.waterWeight"
                placeholder="Water Weight"
              />
              <FormField
                keyboardType="numeric"
                maxLength={4}
                name="teaBucket.bagWeight"
                placeholder="Bag Weight"
              />
            </View>
          </Screen>
        </Modal>

        <SubmitButton title="Upload" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  heading: {
    marginBottom: 10,
    color: colors.secondary,
    fontWeight: "bold",
  },
  additional: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  tagFormField: {
    // backgroundColor: colors.secondary,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default WeightagesAddScreen;
