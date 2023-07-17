import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { SearchBar, Icon, Button } from "@rneui/themed";
import axios from "axios";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width * 0.9;

const chartConfig = {
  // backgroundColor: "#e26a00",
  backgroundGradientFrom: "rgba(250,255,121,1)",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "rgba(147,255,234,1)",
  backgroundGradientToOpacity: 1,
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0,0,0,1)`,
  labelColor: (opacity = 1) => `rgba(0,0,0, 1)`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

const colors = [
  "rgba(26, 93, 26, 0.5)",
  "rgba(254, 0, 0,0.5)",
  "rgba(29, 93, 155, 0.5)",
  "rgba(0, 0, 0, 0.5)",
];
const UserScreen = ({ navigation }) => {
  const [input, setInput] = useState();
  const [data, setData] = useState([]);
  const [languageProblemCount, setLanguageProblemCount] = useState([]);
  const [tagProblemCount, setTagProblemCount] = useState();
  const [problemsSolved, setProblemsSolved] = useState();

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
          username: input,
        },
        operationName: "skillStats",
      })
    );
    data.push(
      JSON.stringify({
        query:
          "\n    query userProblemsSolved($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    problemsSolvedBeatsStats {\n      difficulty\n      percentage\n    }\n    submitStatsGlobal {\n      acSubmissionNum {\n        difficulty\n        count\n      }\n    }\n  }\n}\n    ",
        variables: {
          username: input,
        },
        operationName: "userProblemsSolved",
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
        setLanguageProblemCount(
          response?.data?.data?.matchedUser?.languageProblemCount
        );
        // responseData.push(response.data);
      })
      .catch((error) => {
        console.log(error, "123");
      });
    axios
      .request(config[1])
      .then((response) => {
        setTagProblemCount(response?.data?.data?.matchedUser?.tagProblemCounts);
        // console.log(response.data);
        // responseData.push(response.data);
      })
      .catch((error) => {
        console.log(error, "456");
      });
    axios
      .request(config[2])
      .then((response) => {
        // setTagProblemCount(
        //   response?.data?.data?.matchedUser?.tagProblemCounts
        // );
        setProblemsSolved(response?.data?.data);
        console.log(response?.data?.data);
        // console.log(response.data);
        // responseData.push(response.data);
      })
      .catch((error) => {
        console.log(error, "456");
      });
  };
  console.log(tagProblemCount);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Search User",
    });
  }, []);
  return (
    <ScrollView style={{ backgroundColor: "#ffffff" }}>
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
          backgroundColor: "#FFFFFF",
          borderBottomColor: "transparent",
          borderTopColor: "transparent",
          // width: "60%",
          marginTop: 10,
        }}
        inputContainerStyle={{}}
        inputStyle={{}}
        leftIconContainerStyle={{}}
        rightIconContainerStyle={{}}
        loadingProps={{}}
        onChangeText={(text) => setInput(text)}
        placeholder="Enter UserName"
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
      {problemsSolved && (
        <ProgressChart
          data={{
            labels: [
              "Hard (" +
                problemsSolved?.matchedUser?.submitStatsGlobal
                  ?.acSubmissionNum[3]?.count +
                ")",
              "Medium (" +
                problemsSolved?.matchedUser?.submitStatsGlobal
                  ?.acSubmissionNum[2]?.count +
                ")",
              "Easy (" +
                problemsSolved?.matchedUser?.submitStatsGlobal
                  ?.acSubmissionNum[1]?.count +
                ")",
              "All (" +
                problemsSolved?.matchedUser?.submitStatsGlobal
                  ?.acSubmissionNum[0]?.count +
                ")",
            ],
            data: [
              problemsSolved?.matchedUser?.submitStatsGlobal?.acSubmissionNum[3]
                ?.count / problemsSolved?.allQuestionsCount[3]?.count,
              problemsSolved?.matchedUser?.submitStatsGlobal?.acSubmissionNum[2]
                ?.count / problemsSolved?.allQuestionsCount[2]?.count,
              problemsSolved?.matchedUser?.submitStatsGlobal?.acSubmissionNum[1]
                ?.count / problemsSolved?.allQuestionsCount[1]?.count,
              problemsSolved?.matchedUser?.submitStatsGlobal?.acSubmissionNum[0]
                ?.count / problemsSolved?.allQuestionsCount[0]?.count,
            ],
          }}
          width={screenWidth}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1, index) => {
              return colors[index];
            },
          }}
          hideLegend={false}
          style={{
            paddingHorizontal: 20,
            marginBottom: 10,
            borderRadius: 15,
          }}
        />
      )}

      {languageProblemCount.length > 0 && (
        <>
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "600",
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            Problems Solved in different Languages
          </Text>
          <BarChart
            data={{
              labels: languageProblemCount.map((ele) => ele?.languageName),
              datasets: [
                {
                  data: languageProblemCount.map((ele) => ele?.problemsSolved),
                },
              ],
            }}
            style={{
              paddingHorizontal: 20,
              marginBottom: 10,
              borderRadius: 15,
            }}
            width={screenWidth}
            height={400}
            yAxisLabel=""
            fromZero={true}
            showValuesOnTopOfBars={true}
            chartConfig={{
              ...chartConfig,
              barPercentage: screenWidth / (languageProblemCount.length * 100),
            }}
            verticalLabelRotation={90}
            horizontalLabelRotation={0}
            // verticalLabelRotation
            withInnerLines={false}
          />
        </>
      )}
      {tagProblemCount && (
        <>
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "600",
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            Advanced Topics
          </Text>
          <BarChart
            data={{
              labels: tagProblemCount?.advanced.map((ele) => ele?.tagName),
              datasets: [
                {
                  data: tagProblemCount?.advanced.map(
                    (ele) => ele?.problemsSolved
                  ),
                },
              ],
            }}
            style={{
              paddingHorizontal: 20,
              marginBottom: 10,
              borderRadius: 15,
            }}
            width={screenWidth}
            height={600}
            yAxisLabel=""
            fromZero={true}
            showValuesOnTopOfBars={true}
            chartConfig={{
              ...chartConfig,
              barPercentage:
                screenWidth / (tagProblemCount?.advanced.length * 100),
            }}
            verticalLabelRotation={90}
            horizontalLabelRotation={0}
            // verticalLabelRotation
            withInnerLines={false}
          />
        </>
      )}

      {tagProblemCount && (
        <>
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "600",
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            Fundamental Topics
          </Text>
          <BarChart
            data={{
              labels: tagProblemCount?.fundamental.map((ele) => ele?.tagName),
              datasets: [
                {
                  data: tagProblemCount?.fundamental.map(
                    (ele) => ele?.problemsSolved
                  ),
                },
              ],
            }}
            style={{
              paddingHorizontal: 20,
              marginBottom: 10,
              borderRadius: 15,
            }}
            width={screenWidth}
            height={400}
            yAxisLabel=""
            fromZero={true}
            showValuesOnTopOfBars={true}
            chartConfig={{
              ...chartConfig,
              barPercentage:
                screenWidth / (tagProblemCount?.fundamental.length * 100),
            }}
            verticalLabelRotation={90}
            horizontalLabelRotation={0}
            // verticalLabelRotation
            withInnerLines={false}
          />
        </>
      )}
      {tagProblemCount && (
        <>
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "600",
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            Intermediate Topics
          </Text>
          <BarChart
            data={{
              labels: tagProblemCount?.intermediate.map((ele) => ele?.tagName),
              datasets: [
                {
                  data: tagProblemCount?.intermediate.map(
                    (ele) => ele?.problemsSolved
                  ),
                },
              ],
            }}
            style={{
              paddingHorizontal: 20,
              marginBottom: 10,
              borderRadius: 15,
            }}
            width={screenWidth}
            height={600}
            fromZero={true}
            showValuesOnTopOfBars={true}
            chartConfig={{
              ...chartConfig,
              barPercentage:
                screenWidth / (tagProblemCount?.intermediate.length * 100),
              // propsForHorizontalLabels:
            }}
            verticalLabelRotation={90}
            horizontalLabelRotation={0}
            radius={64}
            withInnerLines={false}

            // verticalLabelRotation
          />
        </>
      )}
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
