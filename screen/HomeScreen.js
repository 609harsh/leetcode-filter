import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckBox, Button, Icon, SearchBar } from "@rneui/themed";
import axios from "axios";

import GlobalRanking from "../components/GlobalRanking";
import QuestionsDisplay from "../components/QuestionsDisplay";

const bgColor = "";

const HomeScreen = ({ navigation }) => {
  const [selectedIndex, setIndex] = useState(0);
  const [input, setInput] = useState();
  const [questions, setQuestions] = useState();
  const [data, setData] = useState();

  const onSearchUser = async () => {
    navigation.navigate("User");
  };

  const onSearch = async () => {
    const url =
      selectedIndex === 1
        ? `https://leetcode.com/contest/api/info/biweekly-contest-${input}`
        : `https://leetcode.com/contest/api/info/weekly-contest-${input}`;
    try {
      const res = await axios.get(url);
      console.log(res.data.questions, "12345");
      setQuestions(res.data.questions);
      setData(res.data);
    } catch (err) {
      console.log(err, 1234);
    }
  };

  return (
    <SafeAreaView style={styles.container} nestedScrollEnabled={true}>
      <ScrollView style={{ width: "100%" }}>
        <View
          style={{
            alignItems: "center",
            // marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 35, fontWeight: 700 }}>
            Select Contest Type
          </Text>
          <View style={styles.checkBoxContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <CheckBox
                checked={selectedIndex === 0}
                onPress={() => setIndex(0)}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                containerStyle={{
                  backgroundColor: "#EEF1FF",
                }}
              />
              <Text style={{ fontSize: 20, fontWeight: 500 }}>Weekly</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <CheckBox
                checked={selectedIndex === 1}
                onPress={() => setIndex(1)}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                containerStyle={{
                  backgroundColor: "#EEF1FF",
                }}
              />
              <Text style={{ fontSize: 20, fontWeight: 500 }}>Bi-Weekly</Text>
            </View>
          </View>
        </View>

        {/* <Input
          placeholder="Enter Contest Number"
          rightIcon={{ type: "ionicons", name: "search", color: "lightgrey" }}
          onChangeText={(text) => setInput(text)}
          onSubmitEditing={onSearch}
        /> */}
        <SearchBar
          platform="default"
          clearIcon={
            <Icon
              name="close"
              type="ionicons"
              color="lightgrey"
              onPress={() => setInput("")}
            />
          }
          containerStyle={{
            backgroundColor: "#EEF1FF",
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
            // width: "60%",
          }}
          inputContainerStyle={{}}
          inputStyle={{}}
          leftIconContainerStyle={{}}
          rightIconContainerStyle={{}}
          loadingProps={{}}
          onChangeText={(text) => setInput(text)}
          placeholder="Enter Contest Number"
          round
          value={input}
          inputMode="numeric"
        />
        <Button
          title="Search"
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
          onPress={onSearch}
        />

        <QuestionsDisplay
          questions={questions}
          data={data}
          selectedIndex={selectedIndex}
        />
        <Button
          title="Search User"
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
          onPress={onSearchUser}
        />
        {/* <SearchUser /> */}

        <GlobalRanking />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF1FF",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  checkBoxContainer: {
    flexDirection: "row",
  },
});

export default HomeScreen;
