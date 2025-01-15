import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import { StyleSheet } from "react-native";

import AppText from "../components/AppText";
import ActivityIndicator from "../components/ActivityIndicator";
import ButtonRoundCorner from "../components/ButtonRoundCorner";
import Card from "../components/Card";
import colors from "../config/colors";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import listingsApi from "../api/listings";
import useApi from "../hooks/useApi";

function ListingsScreen({ navigation }) {
  const getListingsApi = useApi(listingsApi.getListings);

  const [listing, setListing] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const getData = async () => {
    //Shoud be update - apply filter and merge new data
    const listData = await getListingsApi.request();
    if (!getListingsApi.error) {
      setListing(listData.data);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ActivityIndicator visible={getListingsApi.loading} />
      <Screen style={styles.screen}>
        {getListingsApi.error && (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AppText>Couldn't retrieve the listings.</AppText>
              <ButtonRoundCorner
                title="Retry"
                onPress={getListingsApi.request}
              />
            </View>
          </>
        )}
        <FlatList
          data={listing}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTile={"$" + item.price}
              imageUrl={item.images[0].url}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
              thumbnailUrl={item.images[0].thumbnailUrl}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            getData();
          }}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
