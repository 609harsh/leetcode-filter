import { StyleSheet, Text, View, Alert, Modal, Pressable } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Input, Divider, CheckBox, SearchBar, Button } from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import SimpleLottie from "../components/SimpleLottie";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import each from "async/each";
import SearchModal from "../components/SearchModal";
const RankScreen = ({
  navigation,
  route: {
    params: { title, selectedIndex },
  },
}) => {
  const [rank, setRank] = useState([]);
  const [name, setName] = useState();
  const [country, setCountry] = useState();
  const [score, setScore] = useState();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            paddingVertical: 15,
          }}
        >
          <Ionicons
            name="ios-arrow-back"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Text
            style={{
              color: "black",
              fontSize: 20,
              fontWeight: "700",
              textTransform: "capitalize",
            }}
          >
            {title.split("-").join(" ")}
          </Text>
        </View>
      ),
    });
  }, []);

  //Local Storage Logic -----------------**---------------------**------------------------

  // useEffect(() => {
  //   const checkData = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem(title);

  //       if (value === null && rank.length != 0) {
  //         console.log("Data not Found");
  //         try {
  //           const stringValue = JSON.stringify(rank);
  //           await AsyncStorage.setItem(title, stringValue);
  //         } catch (err) {
  //           console.log(err, "Error Writing Value");
  //         }
  //       }
  //     } catch (err) {
  //       console.log(err, "Error Reading data from storage");
  //     }
  //   };
  //   checkData();
  // }, [rank]);

  useEffect(() => {
    const getData = async () => {
      // let i = 0;
      // const url = `https://leetcode.com/contest/api/ranking/${title}/?pagination=${0}&region=global`;
      console.log("Process Started");
      const res = await axios.get(
        `https://leetcode.com/contest/api/ranking/${title}/?pagination=${1}&region=global`
      );
      let user_num = res.data.user_num;
      let pages = Math.ceil(user_num / 25);
      let count_loops = Math.ceil(pages / 100);
      let time = new Date().getTime();
      let result = [];
      let total_rank = [];
      let submission = [];
      let final_result = [];
      let arr = [];
      for (let j = 1; j <= pages; j++) {
        arr.push(
          `https://leetcode.com/contest/api/ranking/${title}/?pagination=${j}&region=global`
        );
      }
      // each(
      //   arr,
      //   async function (file, callback) {
      //     const res = await axios.get(file);
      //     if (res.data) {
      //       result.push(res.data);
      //       total_rank.push(res.data.total_rank);
      //       submission.push(res.data.submissions);
      //       console.log(1);
      //       // console.log("All data fetched");
      //       return callback();
      //     }
      //     console.log(res, "error", "1253");
      //     callback();
      //   },
      //   (error) => {
      //     if (error) {
      //       console.log(error, "123");
      //     }
      //     final_result.push(result);
      //     final_result.push(total_rank);
      //     final_result.push(submission);
      //     console.log(final_result);

      //     //Store Value in local storage
      //     const storeVal = async () => {
      //       try {
      //         const stringValue = JSON.stringify(final_result);
      //         await AsyncStorage.setItem(title, stringValue);
      //         console.log("Data stored Succesfully");
      //       } catch (err) {
      //         console.log(err, "Error Writing Value");
      //       }
      //     };

      //     storeVal();

      //     setRank(final_result);
      //     setLoading(false);
      //   }
      // );
      setLoading(false);
      // for (let i = 0; i < count_loops; i++) {
      //   let arr = [];
      //   console.log("Process Started", "loop", i);
      //   for (let j = i * 100 + 1; j <= Math.min(i * 100 + 100, pages); j++) {
      //     arr.push(
      //       `https://leetcode.com/contest/api/ranking/${title}/?pagination=${j}&region=global`
      //     );
      //   }

      //   each(
      //     arr,
      //     async function (file, callback) {
      //       const res = await axios.get(file);
      //       if (res.data) {
      //         result.push(res.data);
      //         console.log(res.data);
      //         // console.log("All data fetched");
      //         return callback();
      //       }
      //       console.log(res, "error", "1253");
      //       callback();
      //     },
      //     (error) => {
      //       if (error) {
      //         console.log(error, "123");
      //       }
      //       console.log(result);
      //       setRank(result);
      //       setLoading(false);
      //     }
      //   );
      // }

      // console.log(result);
      // console.log("loop finished");
      // console.log(new Date().getTime() - time);
    };
    // getData();

    ///Local Storage Logic-------------------**-------------------**--------------------

    const checkData = async () => {
      try {
        const value = await AsyncStorage.getItem(title);
        if (value) {
          console.log("Data Found");
          console.log(JSON.parse(value));
          setRank(JSON.parse(value));
          setLoading(false);
        } else {
          getData();
        }
      } catch (err) {
        console.log(err, "Error Reading data from storage", "123");
      }
    };

    checkData();
  }, []);
  // console.log(rank);

  return (
    <>
      {loading ? (
        <SimpleLottie />
      ) : (
        <View style={{ flex: 1, backgroundColor: "#EEF1FF" }}>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              padding: 20,
              width: "100%",
              // borderWidth: 1,
              // borderColor: "balck",
            }}
          >
            <Text
              style={{
                width: 30,
                textAlign: "center",
                fontWeight: "700",
                fontSize: 15,
              }}
            >
              Rank
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontWeight: "700",
                fontSize: 15,
              }}
            >
              UserName
            </Text>
            <Text
              style={{
                width: 50,
                textAlign: "center",
                fontWeight: "700",
                fontSize: 15,
              }}
            >
              Score
            </Text>
            <Text
              style={{
                width: 50,
                textAlign: "center",
                fontWeight: "700",
                fontSize: 15,
              }}
            >
              Country
            </Text>
          </View>

          <FlashList
            data={rank[0]}
            persistentScrollbar={true}
            contentContainerStyle={{ paddingBottom: 10 }}
            estimatedItemSize={20000}
            renderItem={({ item }) => (
              <View>
                <FlashList
                  data={item.total_rank}
                  estimatedItemSize={20000}
                  renderItem={({ item }) => (
                    <View>
                      <View
                        // key={item.rank}
                        style={{
                          flexDirection: "row",
                          gap: 5,
                          padding: 20,
                          width: "100%",
                        }}
                      >
                        <Text
                          style={{
                            width: 30,
                            textAlign: "center",
                            fontSize: 18,
                          }}
                        >
                          {item.rank}
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 18,

                            paddingLeft: 18,
                          }}
                        >
                          {item.username}
                        </Text>
                        <Text
                          style={{
                            width: 50,
                            textAlign: "center",
                            fontSize: 18,
                          }}
                        >
                          {item.score}
                        </Text>
                        <Text
                          style={{
                            width: 50,

                            textAlign: "center",
                            fontSize: 18,
                          }}
                        >
                          {item.country_code
                            ? item.country_code
                            : item.data_region}
                        </Text>
                      </View>
                      <Divider />
                    </View>
                  )}
                  keyExtractor={(item) => item.rank + "" + item.finish_time}
                />
              </View>
            )}
            keyExtractor={(item, index) => item.time + "" + index}
          />
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 10,
          borderTopColor: "black",
          elevation: 4,
          // borderWidth: 1,
          paddingTop: 10,
        }}
      >
        <Input
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Search Results"
          rightIcon={
            <MaterialCommunityIcons
              name="filter-menu-outline"
              size={24}
              color="black"
              onPress={() => setModalVisible(!modalVisible)}
            />
          }
        />
        <SearchModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
      </View>
    </>
  );
};

export default RankScreen;

// try {
//   const res = await Promise.all(arr);
//   const data = await Promise.all(res.map((r) => r.json()));
//   console.log(data, "123");
//   // console.log(new Date().getTime() - time);
//   // setRank(data);
//   // setLoading(false);
// } catch (err) {
//   console.log(err);
//   break;
//   // throw Error("Promise failed");
// }

// let arr = [];
// for (let i = 1; i <= 350; i++) {
//   arr.push(
//     fetch(
//       `https://leetcode.com/contest/api/ranking/${title}/?pagination=${i}&region=global`
//     )
//   );
// }
// async.each(arr, fetchData, function (err) {
//   if (err) console.log(err);
//   else {
//     console.log("All data recieved");
//   }
// });
