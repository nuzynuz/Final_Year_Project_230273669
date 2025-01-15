import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import dayjs, { Dayjs } from "dayjs";

import ButtonRoundCorner from "../components/ButtonRoundCorner";
import AppText from "../components/AppText";
import colors from "../config/colors";
import { ListItemSeparator } from "../components/list";
import Screen from "../components/Screen";
import advanceApi from "../api/advance";
import useAuth from "../auth/useAuth";
import routes from "../navigation/routes";

function WeightageListScreen({ navigation }) {
  const { user, logOut } = useAuth();

  //Re-render after each deletion
  const [advances, setAdvances] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // let supplierCode = "SUP0005";
  let wData = [];
  const getData = async () => {
    // console.log("USER ID " + JSON.stringify(user));
    wData = await advanceApi.getAdvanceList(user.userId);
    //  console.log(wData.data);
    if (wData.ok) {
      setAdvances(wData.data.data);
      setRefreshing(false);
    } else {
      //  return alert("You're account is not a Farmer's");
    }
  };
  // Call getData() at the begining
  useEffect(() => {
    getData();
  }, []);

  return (
    <Screen>
      {wData.ok === true && (
        <>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AppText>Couldn't retrieve the listings.</AppText>
            <ButtonRoundCorner title="Retry" onPress={getData} />
          </View>
        </>
      )}
      <Text style={styles.title}>Your Advance Requests</Text>
      <Text style={styles.note}>( pull to refresh )</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate(routes.NEWADVANCE)}
      >
        <Text style={styles.btnText}>New Request</Text>
      </TouchableOpacity>
      <View style={styles.headerItem}>
        <View style={styles.itemContent}>
          <Text style={styles.headerText}>Date</Text>
          <Text style={styles.headerText}>Amount</Text>
          <Text style={styles.headerText}>Status</Text>
        </View>
      </View>
      {advances.length == 0 && (
        <>
          <Text style={styles.info}>No weightages so far!</Text>
        </>
      )}

      <FlatList
        data={advances}
        keyExtractor={(weightages) => weightages.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemContent}>
              <Text style={styles.textVal}>
                {dayjs(item.createdAt).format("YYYY/MM/DD")}
              </Text>
              <Text style={styles.textVal}>{item.reqestedAmount}</Text>
              {
                {
                  pending: <Text style={styles.pendingTxt}>{item.status}</Text>,
                  accepted: <Text style={styles.acceptTxt}>{item.status}</Text>,
                  denied: <Text style={styles.deniedTxt}>{item.status}</Text>,
                }[item.status]
              }
            </View>
          </View>
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        // fetch latest list from Server
        onRefresh={() => {
          getData();
        }}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  headerItem: {
    marginTop: 20,
    height: 30,
    backgroundColor: colors.medium,
    borderRadius: 50,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 10,
  },
  item: {
    height: 30,
    backgroundColor: colors.light,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 50,
    padding: 10,
  },
  itemContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textVal: {
    fontSize: 15,
    textAlign: "center",
  },
  pendingTxt: {
    fontSize: 15,
    textAlign: "center",
    color: "#FFAC33",
  },
  acceptTxt: {
    fontSize: 15,
    textAlign: "center",
    color: "#0EBC1E",
  },
  deniedTxt: {
    fontSize: 15,
    textAlign: "center",
    color: colors.primary,
  },
  headerText: {
    fontSize: 15,
    textAlign: "center",
    color: colors.light,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  note: {
    fontSize: 13,
    fontStyle: "italic",
    textAlign: "center",
  },
  info: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    color: colors.primary,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    width: "50%",
    marginVertical: 10,
    marginRight: 20,
    marginTop: 20,
    alignSelf: "flex-end",
  },
  btnText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default WeightageListScreen;
