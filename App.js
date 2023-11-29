// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainContainer from "./src/client/navigation/MainContainer";
import { Provider } from "react-redux";
import store from "./src/client/store";



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <Stack.Navigator> */}
          {/* <Stack.Screen options={{ headerShown: false}} name="Main" component={MainContainer} /> */}
          {/* <Stack.Screen options={{ headerShown: false}} name="Login" component={Login} /> */}
          {/* <Stack.Screen options={{ headerShown: false}} name="Home" component={Home} /> */}
          {/* <Stack.Screen options={{ headerShown: false}} name="Profile" component={UserChannel} /> */}
        {/* </Stack.Navigator> */}
        <MainContainer/> 
      </NavigationContainer>
    </Provider>
  );
}
