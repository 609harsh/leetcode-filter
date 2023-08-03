import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import each from "async/each";
import { FlashList } from "@shopify/flash-list";
import CountryFlag from "react-native-country-flag";
import { Divider, Button } from "@rneui/themed";
const GlobalScreen = () => {
  const [rank, setRank] = useState();
  useEffect(() => {
    const getData = async () => {
      let user_count;
      let user_per_page;

      let data = JSON.stringify({
        operationName: null,
        variables: {},
        query:
          "{\n  globalRanking(page: 1) {\n    totalUsers\n    userPerPage\n    myRank {\n      ranking\n      currentGlobalRanking\n      currentRating\n      dataRegion\n      user {\n        nameColor\n        activeBadge {\n          displayName\n          icon\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    rankingNodes {\n      ranking\n      currentRating\n      currentGlobalRanking\n      dataRegion\n      user {\n        username\n        nameColor\n        activeBadge {\n          displayName\n          icon\n          __typename\n        }\n        profile {\n          userAvatar\n          countryCode\n          countryName\n          realName\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n",
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://leetcode.com/graphql",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const res = await axios.request(config);
      user_count = res?.data?.data?.globalRanking?.totalUsers;
      user_per_page = res?.data?.data?.globalRanking?.userPerPage;
      let pages = parseInt(user_count / user_per_page);
      let arr = [];
      let result = [];
      for (let j = 1; j <= 10; j++) {
        arr.push({
          method: "post",
          maxBodyLength: Infinity,
          url: "https://leetcode.com/graphql",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            operationName: null,
            variables: {},
            query: `{\n  globalRanking(page: ${j}) {\n    totalUsers\n    userPerPage\n    myRank {\n      ranking\n      currentGlobalRanking\n      currentRating\n      dataRegion\n      user {\n        nameColor\n        activeBadge {\n          displayName\n          icon\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    rankingNodes {\n      ranking\n      currentRating\n      currentGlobalRanking\n      dataRegion\n      user {\n        username\n        nameColor\n        activeBadge {\n          displayName\n          icon\n          __typename\n        }\n        profile {\n          userAvatar\n          countryCode\n          countryName\n          realName\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n`,
          }),
        });
      }
      each(
        arr,
        async function (file, callback) {
          const res = await axios.request(file);
          if (res.data) {
            console.log(1);
            result.push(res?.data?.data?.globalRanking?.rankingNodes);
            return callback();
          }
          callback();
        },
        (error) => {
          if (error) {
            alert("Data fetching Failed.\n Please Try again");
          }
          result.sort(
            (a, b) =>
              Number(a[0].currentGlobalRanking) -
              Number(b[0].currentGlobalRanking)
          );
          setRank(result);
        }
      );
    };
    getData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        marginBottom: 5,
        padding: 10,
        elevation: 12,
      }}
    >
      {rank && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            justifyContent: "flex-start",
            // borderBottomWidth: 1,
            // borderBottomColor: "black",
            marginVertical: 20,
            height: 40,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              width: "15%",
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            Rank
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            Username
          </Text>
          <Text
            style={{
              textAlign: "center",
              width: "20%",
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            Rating
          </Text>
          <Text
            style={{
              textAlign: "center",
              width: "20%",
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            Region
          </Text>
        </View>
      )}
      <FlashList
        data={rank}
        estimatedItemSize={20000}
        renderItem={({ item, index }) => (
          <FlashList
            data={item}
            nestedScrollEnabled={true}
            estimatedItemSize={20000}
            renderItem={({ item, index }) => (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    justifyContent: "flex-start",
                    height: 50,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      width: "15%",
                      fontSize: 15,
                    }}
                  >
                    {item.currentGlobalRanking}
                  </Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, color: "#394867" }}>
                      {item.user.username}
                    </Text>
                    <Text style={{ fontSize: 14, color: "#9DB2BF" }}>
                      {item.ranking.split(",").length} contest attended
                    </Text>
                  </View>
                  <Text
                    style={{
                      textAlign: "center",
                      width: "20%",
                      fontSize: 15,
                    }}
                  >
                    {parseInt(item.currentRating)}
                  </Text>
                  <View
                    style={{
                      width: "20%",
                      fontSize: 15,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Text>
                      {item.user.profile.countryCode
                        ? item.user.profile.countryCode
                        : item.dataRegion}
                    </Text>
                    <CountryFlag
                      isoCode={
                        item.user.profile.countryCode
                          ? item.user.profile.countryCode
                          : item.dataRegion
                      }
                      size={10}
                    />
                  </View>
                </View>
                <Divider />
              </>
            )}
            keyExtractor={(item, index) => index + "" + item.currentRating}
          />
        )}
        keyExtractor={(item, index) => index}
      />
      <Button
        title="Search Results"
        icon={{
          name: "search",
          type: "font-awesome",
          size: 15,
          color: "white",
        }}
        iconRight
        iconContainerStyle={{ marginLeft: 10 }}
        titleStyle={{ fontWeight: "500" }}
        buttonStyle={{
          backgroundColor: "rgba(199, 43, 98, 1)",
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 30,
        }}
        containerStyle={{
          width: "100%",
        }}
      />
    </View>
  );
};

export default GlobalScreen;
