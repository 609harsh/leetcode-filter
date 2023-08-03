import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const QuestionsDisplay = ({ questions, data, selectedIndex }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        elevation: 10,
      }}
    >
      <View>
        {questions && (
          <>
            <Text
              style={{
                textAlign: "center",
                fontSize: 30,
                fontWeight: 500,
                marginBottom: 10,
                marginTop: 10,
              }}
            >
              Contest Question's
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                padding: 5,
                width: "100%",
              }}
            >
              <Text
                style={{
                  width: 30,
                  fontWeight: 600,
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                ID
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  flex: 1,
                  textAlign: "center",
                }}
              >
                Problem
              </Text>
              <Text style={{ width: 50, fontWeight: 600, fontSize: 20 }}>
                Score
              </Text>
            </View>
          </>
        )}

        {questions &&
          questions.map((ele, idx) => (
            <TouchableOpacity
              key={idx}
              style={{
                flexDirection: "row",
                gap: 10,
                padding: 10,
                width: "100%",
              }}
            >
              <Text style={{ width: 30 }}>{ele.question_id}</Text>
              <Text
                key={idx}
                style={{ fontSize: 15, fontWeight: 500, flex: 1 }}
                onPress={() =>
                  Linking.openURL(
                    `https://leetcode.com/problems/${ele.title_slug}/`
                  )
                }
              >
                {ele.title}
              </Text>

              <Text style={{ width: 30 }}>{ele.credit}</Text>
            </TouchableOpacity>
          ))}
        {questions && (
          <TouchableOpacity style={{ marginTop: 20 }}>
            <Button
              title="Go To Rank Filter"
              buttonStyle={{
                backgroundColor: "rgba(199, 43, 98, 1)",
                borderColor: "transparent",
                borderWidth: 0,
                width: "80%",
                alignSelf: "center",
              }}
              onPress={() =>
                navigation.navigate("Rank", {
                  title: data.contest.title_slug,
                  selectedIndex,
                })
              }
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default QuestionsDisplay;

const styles = StyleSheet.create({});
