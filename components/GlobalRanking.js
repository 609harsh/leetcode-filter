import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { FlashList } from "@shopify/flash-list";
import { Divider, Button } from "@rneui/themed";
import { useFonts } from "expo-font";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
// import url('https://fonts.googleapis.com/css2?family=Inter:wght@100&display=swap');

const GlobalRanking = () => {
  const [global, setGlobal] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {}, []);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          "https://leetcode.com/_next/data/An09Lck2ZmRNnY-kK3JeS/contest.json"
        );
        console.log(res.data);
        setGlobal([
          res?.data?.pageProps?.dehydratedState?.queries[2]?.state?.data
            ?.globalRanking?.rankingNodes,
          res?.data?.pageProps?.dehydratedState?.queries[4]?.state?.data
            ?.topTwoContests,
          res?.data?.pageProps?.dehydratedState?.queries[1]?.state?.data
            ?.pastContests?.data,
        ]);
      } catch (err) {
        alert("Error Fetching results");
      }
    };
    getData();
  }, []);

  return (
    <View style={{}}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: 700,
          marginTop: 10,
          textAlign: "center",
        }}
      >
        Global Ranking Search
      </Text>
      <View
        style={{
          height: 400,
          // borderWidth: 1,
          // borderColor: "black",
          marginBottom: 10,
          padding: 10,
          elevation: 12,
        }}
      >
        {global[0] && (
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
          data={global[0]}
          nestedScrollEnabled={true}
          estimatedItemSize={25}
          renderItem={({ item, index }) => (
            <>
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  justifyContent: "flex-start",
                  height: 30,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ textAlign: "center", width: "15%", fontSize: 15 }}
                >
                  {item.currentGlobalRanking}
                </Text>
                <Text style={{ flex: 1, fontSize: 15 }}>
                  {item.user.username}
                </Text>
                <Text
                  style={{ textAlign: "center", width: "20%", fontSize: 15 }}
                >
                  {parseInt(item.currentRating)}
                </Text>
                <Text
                  style={{ textAlign: "center", width: "20%", fontSize: 15 }}
                >
                  {item.user.profile.countryCode
                    ? item.user.profile.countryCode
                    : item.dataRegion}
                </Text>
              </View>
              <Divider />
            </>
          )}
          keyExtractor={(item, index) => index + "" + item.currentRating}
        />
      </View>
      <Button
        title="Check Global List"
        titleStyle={{ fontWeight: "500" }}
        buttonStyle={{
          backgroundColor: "rgba(199, 43, 98, 1)",
          borderColor: "transparent",
          borderWidth: 0,
        }}
        containerStyle={{
          width: 200,
          height: 45,
          // marginHorizontal: 50,
          marginVertical: 10,
          alignSelf: "center",
        }}
        onPress={() => navigation.navigate("Global")}
      />
    </View>
  );
};

export default GlobalRanking;

const styles = StyleSheet.create({});

// {
//   "operationName": null,
//   "variables": {},
//   "query": "{\n  globalRanking(page: 2) {\n    totalUsers\n    userPerPage\n    rankingNodes {\n      currentRating\n      currentGlobalRanking\n      dataRegion\n      user {\n        username\n               profile {\n          countryCode\n        }\n      }\n    }\n  }\n}\n"
// }

// {
//   "query": "\n    query getUserProfile($username: String!) {\n  matchedUser(username: $username) {\n    activeBadge {\n      displayName\n      icon\n    }\n  }\n}\n    ",
//   "variables": {
//     "username": "harshgupta609"
//   },
//   "operationName": "getUserProfile"
// }

// {
//   "query": "\n    query skillStats($username: String!) {\n  matchedUser(username: $username) {\n    tagProblemCounts {\n      advanced {\n        tagName\n        tagSlug\n        problemsSolved\n      }\n      intermediate {\n        tagName\n        tagSlug\n        problemsSolved\n      }\n      fundamental {\n        tagName\n        tagSlug\n        problemsSolved\n      }\n    }\n  }\n}\n    ",
//   "variables": {
//     "username": "saimahidhar"
//   },
//   "operationName": "skillStats"
// }

// {
//   "query": "\n    query languageStats($username: String!) {\n  matchedUser(username: $username) {\n    languageProblemCount {\n      languageName\n      problemsSolved\n    }\n  }\n}\n    ",
//   "variables": {
//     "username": "saimahidhar"
//   },
//   "operationName": "languageStats"
// }
