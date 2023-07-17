import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screen/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RankScreen from "./screen/RankScreen";
import GlobalScreen from "./screen/GlobalScreen";
import FilterScreen from "./screen/FilterScreen";
import UserScreen from "./screen/UserScreen";
const Stack = createNativeStackNavigator();

import { store } from "./redux/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={HomeScreen}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Rank" component={RankScreen} />
            <Stack.Screen name="Global" component={GlobalScreen} />
            <Stack.Screen
              name="Filter"
              component={FilterScreen}
              options={{ presentation: "card", animation: "slide_from_bottom" }}
            />
            <Stack.Screen
              name="User"
              component={UserScreen}
              options={{ presentation: "card", animation: "slide_from_bottom" }}
            />
            {/* <Stack.Screen name="Profile" component={Profile} /> */}
            {/* <Stack.Screen name="Settings" component={Settings} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
