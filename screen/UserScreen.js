import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { SearchBar, Icon, Button } from "@rneui/themed";
import axios from "axios";

import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];

const UserScreen = ({ navigation }) => {
  const [input, setInput] = useState();
  const onSearch = async () => {
    let data = [];
    data.push(
      JSON.stringify({
        query:
          "\n    query languageStats($username: String!) {\n  matchedUser(username: $username) {\n    languageProblemCount {\n      languageName\n      problemsSolved\n    }\n  }\n}\n    ",
        variables: {
          username: input,
        },
        operationName: "languageStats",
      })
    );
    data.push(
      JSON.stringify({
        query:
          "\n    query skillStats($username: String!) {\n  matchedUser(username: $username) {\n    tagProblemCounts {\n      advanced {\n        tagName\n        tagSlug\n        problemsSolved\n      }\n      intermediate {\n        tagName\n        tagSlug\n        problemsSolved\n      }\n      fundamental {\n        tagName\n        tagSlug\n        problemsSolved\n      }\n    }\n  }\n}\n    ",
        variables: {
          username: "saimahidhar",
        },
        operationName: "skillStats",
      })
    );
    data.push(
      JSON.stringify({
        query:
          "\n    query getUserProfile($username: String!) {\n  matchedUser(username: $username) {\n    activeBadge {\n      displayName\n      icon\n    }\n  }\n}\n    ",
        variables: {
          username: "saimahidhar",
        },
        operationName: "getUserProfile",
      })
    );
    let config = [];
    config.push({
      method: "post",
      maxBodyLength: Infinity,
      url: "https://leetcode.com/graphql",
      headers: {
        "Content-Type": "application/json",
        // Cookie:
        //   "csrftoken=8cVhqQVlTYD86J4Y9t7zUwb2qDWwnEbExlEGIRZxEiV3znlikxb1qq0vlM13rMOu",
      },
      data: data[0],
    });
    config.push({
      method: "post",
      maxBodyLength: Infinity,
      url: "https://leetcode.com/graphql",
      headers: {
        "Content-Type": "application/json",
        // Cookie:
        //   "csrftoken=8cVhqQVlTYD86J4Y9t7zUwb2qDWwnEbExlEGIRZxEiV3znlikxb1qq0vlM13rMOu",
      },
      data: data[1],
    });
    config.push({
      method: "post",
      maxBodyLength: Infinity,
      url: "https://leetcode.com/graphql",
      headers: {
        "Content-Type": "application/json",
        // Cookie:
        //   "csrftoken=8cVhqQVlTYD86J4Y9t7zUwb2qDWwnEbExlEGIRZxEiV3znlikxb1qq0vlM13rMOu",
      },
      data: data[2],
    });
    axios
      .request(config[0])
      .then((response) => {
        console.log(response.data, "123");
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .request(config[1])
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .request(config[2])
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Search User",
    });
  }, []);
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <Text>Search User</Text>
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

      <View style={styles.container}>
        <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart>
      </View>
    </ScrollView>
  );
};

export default UserScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
});
