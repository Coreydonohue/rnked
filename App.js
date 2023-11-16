import { StatusBar } from "expo-status-bar";
import {Text, View } from "react-native";
import MainContainer from "./src/client/navigation/MainContainer";
import { Provider } from "react-redux";
import store from "./src/client/store";

export default function App() {
  return (
    <Provider store={store}>
      <MainContainer />
      </Provider>
  );
}

