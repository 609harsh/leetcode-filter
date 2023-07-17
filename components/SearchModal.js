import { StyleSheet, Text, View, Alert, Modal, TextInput } from "react-native";
import { CheckBox, SearchBar, Button, Input } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getSearchVal, searchVal } from "../redux/SearchSlice";

const SearchModal = ({ setModalVisible, modalVisible }) => {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [user, setUser] = useState("");
  const [country, setCountry] = useState("");
  const [score, setScore] = useState("");
  const [language, setLanguage] = useState("");
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const values = useSelector(getSearchVal);

  useEffect(() => {
    console.log(values);
    setData(values);
  }, []);

  const search = () => {
    console.log(values);
    dispatch(
      searchVal({
        rank: {
          start,
          end,
        },
        username: user,
        country,
        score,
        lang: language,
      })
    );

    console.log("values dispatched");
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        style={{ backgroundColor: "black" }}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            height: "100%",
            // width: "80%",
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
            // transform: [{ translateX: 35 }, { translateY: 100 }],
          }}
        >
          <View
            style={{
              backgroundColor: "#EEF1FF",
              // width: "90%",
              padding: 15,
            }}
          >
            <View style={{ flexDirection: "row", padding: 10 }}>
              <Text style={{ flex: 1, fontSize: 20, fontWeight: 600 }}>
                Select Filtering Conditions
              </Text>
              <Ionicons
                name="close-sharp"
                size={24}
                color="black"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
            <View>
              <CheckBox
                title="Rank"
                checked={check1}
                onPress={() => setCheck1(!check1)}
              />
              {check1 && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    height: 40,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: 500 }}>Start</Text>
                  <TextInput
                    onChangeText={(text) => setStart(text)}
                    placeholder="Enter Value"
                    inputMode="numeric"
                    defaultValue={data?.values?.rank?.start}
                  />
                  <Text style={{ fontSize: 18, fontWeight: 500 }}>End</Text>
                  <TextInput
                    onChangeText={(text) => setEnd(text)}
                    placeholder="Enter Value"
                    inputMode="numeric"
                    defaultValue={data?.values?.rank?.end}
                  />
                </View>
              )}
            </View>
            <View>
              <CheckBox
                title="UserName"
                checked={check2}
                onPress={() => setCheck2(!check2)}
              />
              {check2 && (
                <View style={{ alignItems: "stretch" }}>
                  <TextInput
                    onChangeText={(text) => setUser(text)}
                    placeholder="Enter UserName"
                    style={{
                      borderWidth: 1,
                      borderColor: "grey",
                      width: "80%",
                      alignSelf: "center",
                      height: 40,
                      padding: 10,
                    }}
                    defaultValue={data?.values?.username}
                  />
                </View>
              )}
            </View>
            <View>
              <CheckBox
                title="Country Code"
                checked={check3}
                onPress={() => setCheck3(!check3)}
              />
              {check3 && (
                <View style={{ alignItems: "stretch" }}>
                  <TextInput
                    onChangeText={(text) => setCountry(text)}
                    placeholder="Ex: US"
                    style={{
                      borderWidth: 1,
                      borderColor: "grey",
                      width: "80%",
                      alignSelf: "center",
                      height: 40,
                      padding: 10,
                    }}
                    defaultValue={data?.values?.country}
                  />
                </View>
              )}
            </View>
            <View>
              <CheckBox
                title="Score"
                checked={check4}
                onPress={() => setCheck4(!check4)}
              />
              {check4 && (
                <View style={{ alignItems: "stretch" }}>
                  <TextInput
                    onChangeText={(text) => setScore(text)}
                    inputMode="numeric"
                    placeholder="Enter Score"
                    style={{
                      borderWidth: 1,
                      borderColor: "grey",
                      width: "80%",
                      alignSelf: "center",
                      height: 40,
                      padding: 10,
                    }}
                    defaultValue={data?.values?.score}
                  />
                </View>
              )}
            </View>
            <View>
              <CheckBox
                title="Language"
                checked={check5}
                onPress={() => setCheck5(!check5)}
              />
              {check5 && (
                <View style={{ alignItems: "stretch" }}>
                  <TextInput
                    onChangeText={(text) => setLanguage(text)}
                    placeholder="Ex: cpp"
                    style={{
                      borderWidth: 1,
                      borderColor: "grey",
                      width: "80%",
                      alignSelf: "center",
                      height: 40,
                      padding: 10,
                    }}
                    defaultValue={data?.values?.lang}
                  />
                </View>
              )}
            </View>
            <Button
              title="Search"
              buttonStyle={{
                backgroundColor: "rgba(78, 116, 289, 1)",
                borderRadius: 3,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
                alignSelf: "center",
              }}
              onPress={() => search()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SearchModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    elevate: 3,
    // borderWidth: 1,
    borderColor: "black",
  },
});
