import { Text, View, Image } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Divider, Button } from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import each from "async/each";
import SearchModal from "../components/SearchModal";
import { useSelector } from "react-redux";
import { getSearchVal } from "../redux/SearchSlice";
import CountryFlag from "react-native-country-flag";
const RankScreen = ({
  navigation,
  route: {
    params: { title, selectedIndex },
  },
}) => {
  const [rank, setRank] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState();
  const searchParam = useSelector(getSearchVal);

  useEffect(() => {
    let start = Number(searchParam?.values?.rank?.start);
    let end = Number(searchParam?.values?.rank?.end);
    let user = searchParam?.values?.username;
    let country = searchParam?.values?.country;
    let score = searchParam?.values?.score;
    let check1 = searchParam?.values?.check1;
    let check2 = searchParam?.values?.check2;
    let check3 = searchParam?.values?.check3;
    let check4 = searchParam?.values?.check4;
    let check5 = searchParam?.values?.check5;
    // console.log(rank);

    if (rank.length > 0) {
      let data = [].concat(...rank[1]);
      if (check1 && start && end) {
        data = data.filter((ele) => {
          return ele.rank >= start && ele.rank <= end;
        });
      } else if (check1 && start) {
        data = data.filter((ele) => {
          return ele.rank >= start;
        });
      } else if (check1 && end) {
        data = data.filter((ele) => {
          return ele.rank <= end;
        });
      }
      if (check2 && user) {
        data = data.filter((ele) => {
          return ele.username.includes(user);
        });
      }
      if (check3 && country) {
        data = data.filter((ele) => {
          return ele.country_code === country;
        });
      }
      if (check4 && score) {
        data = data.filter((ele) => {
          return Number(ele.score) === Number(score);
        });
      }
      data.sort((a, b) => Number(a.rank) - Number(b.rank));
      setData(data);
    }
  }, [rank, searchParam]);

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

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `https://leetcode.com/contest/api/ranking/${title}/?pagination=${1}&region=global`
      );
      let user_num = res.data.user_num;
      let pages = Math.ceil(user_num / 25);
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
      each(
        arr,
        async function (file, callback) {
          const res = await axios.get(file);
          if (res.data) {
            result.push(res.data);
            total_rank.push(res.data.total_rank);
            submission.push(res.data.submissions);
            // console.log("All data fetched");
            return callback();
          }
          callback();
        },
        (error) => {
          if (error) {
            alert("Ranking Data Fetched Failed  ");
          }
          final_result.push(result);
          final_result.push(total_rank);
          final_result.push(submission);
          setRank(final_result);
          setLoading(false);
        }
      );
    };
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            flex: 1,
            height: "100%",
          }}
        >
          <Image
            source={require("../assets/File.gif")}
            style={{ height: 150, width: 150 }}
          />
          <Text style={{ fontSize: 20, fontWeight: 500 }}>
            Fetching Files 🗃️
          </Text>
        </View>
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
                width: 40,
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

          {/* <FlashList
            data={rank[1]}
            persistentScrollbar={true}
            contentContainerStyle={{ paddingBottom: 10 }}
            // estimatedItemSize={20000}
            renderItem={({ item }) => ( */}

          <FlashList
            data={data}
            contentContainerStyle={{ paddingBottom: 10 }}
            estimatedItemSize={2000}
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
                      width: 40,
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
                    onPress={() =>
                      navigation.navigate("User", { user: item.username })
                    }
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
                  <View
                    style={{
                      width: 50,
                      fontSize: 18,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Text>
                      {item.country_code ? item.country_code : item.data_region}
                    </Text>
                    <CountryFlag
                      isoCode={
                        item.country_code ? item.country_code : item.data_region
                      }
                      size={10}
                    />
                  </View>
                </View>
                <Divider />
              </View>
            )}
            keyExtractor={(item) => item.rank + "" + item.finish_time}
          />

          {/* )}
            keyExtractor={(item, index) =>
              "" + index + "" + Math.floor(Math.random() * 1000000000)
            }
          /> */}
        </View>
      )}
      <View
        style={{
          flexDirection: "column",
          paddingHorizontal: 10,
          borderTopColor: "black",
          elevation: 2,
          // borderWidth: 1,
          paddingTop: 10,
        }}
      >
        <Text style={{ textAlign: "right", fontWeight: "500" }}>
          {data && `Showing ${data?.length} Results`}
        </Text>
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
            marginVertical: 10,
          }}
          onPress={() => setModalVisible(!modalVisible)}
        />

        {/* <Input
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
        /> */}
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
