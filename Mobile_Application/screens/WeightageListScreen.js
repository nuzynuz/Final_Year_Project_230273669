import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import dayjs, { Dayjs } from "dayjs";

import ButtonRoundCorner from "../components/ButtonRoundCorner";
import AppText from "../components/AppText";
import colors from "../config/colors";
import { ListItemSeparator } from "../components/list";
import Screen from "../components/Screen";
import tagApi from "../api/tag";
import useAuth from "../auth/useAuth";
import authStorage from "../auth/storage";

function WeightageListScreen(props) {
  // const { user, logOut } = useAuth();

  //Re-render after each deletion
  const [weightages, setWeightages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // let supplierCode = "SUP0005";
  let wData = [];
  const getData = async () => {
    const user = await authStorage.getUser();

    // console.log("USER ID " + JSON.stringify(user));
    console.log("Get weitages by user id= " + user.userId);
    wData = await tagApi.getWeightages(user.userId);
    //  console.log(wData.data);
    if (wData.ok) {
      setWeightages(wData.data.data);
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
      <Text style={styles.title}>Your Weitages</Text>
      <Text style={styles.note}>( pull to refresh )</Text>
      <View style={styles.headerItem}>
        <View style={styles.itemContent}>
          <Text style={styles.headerText}>Date</Text>
          <Text style={styles.headerText}>Weight</Text>
          <Text style={styles.headerText}>Revenue</Text>
        </View>
      </View>
      {weightages.length == 0 && (
        <>
          <Text style={styles.info}>No weightages so far!</Text>
        </>
      )}
      <FlatList
        data={weightages}
        keyExtractor={(weightages) => weightages.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemContent}>
              <Text style={styles.textVal}>
                {dayjs(item.farmerRevenue?.date).format("YYYY/MM/DD")}
              </Text>
              <Text style={styles.textVal}>{item.weight}</Text>
              <Text style={styles.textVal}>
                {item.farmerRevenue?.total_Rervenue}
              </Text>
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
});

export default WeightageListScreen;
