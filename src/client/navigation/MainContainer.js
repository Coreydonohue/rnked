
import React from "react";
import { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../server/auth/firebase";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";


const Stack = createStackNavigator();

const MainContainer = () => {

  const [user, setUser] = useState(null);
  // const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Stack.Navigator>
       <Stack.Screen
        name="Main"
        component={user ? AppStack : AuthStack}
        options={{ headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainContainer;
