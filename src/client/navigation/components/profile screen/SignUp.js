import React from "react";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAddUserMutation } from "../../../reducers/api";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  ScrollView,
} from "react-native";
import FormInput from "../inputs/FormInput";
import FormButton from "../inputs/FormButton";
import auth from "../../../../server/auth/firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  const [authStateChanged, setAuthStateChanged] = useState(false);

  const [addUser] = useAddUserMutation();

  // navigate to home if logged in
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const response = await addUser({
        email: email,
        password: password,
      });
      const loginResponse = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const loggedInUser = loginResponse.user;

      console.log("User registered and logged in:", loggedInUser);
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an account</Text>

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormInput
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Sign Up"
        onPress={handleRegister}
      />

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontFamily: "Kufam-SemiBoldItalic",
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "Lato-Regular",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 35,
    justifyContent: "center",
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: "400",
    fontFamily: "Lato-Regular",
    color: "grey",
  },
});

export default SignUp;
