import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  ScrollView
} from "react-native";
import auth from "../../../../server/auth/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useAddUserMutation } from "../../../reducers/api";
import AntDesign from "react-native-vector-icons/AntDesign";
import FormButton from "../inputs/FormButton";
import FormInput from "../inputs/FormInput";
import SignUp from "./SignUp";

const Login = () => {
  // state management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authStateChanged, setAuthStateChanged] = useState(false);

  const [addUser] = useAddUserMutation();

  // navigate to home if logged in
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthStateChanged(true);

      if (user) {
        navigation.navigate("Profile");
      } else {
        null;
      }
    });

    return unsubscribe;
  }, [navigation]);

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

  // login
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../../assets/rn-social-logo.png")}
        style={styles.logo}
      />
      <Text style={styles.text}> RN Social App </Text>
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
      <FormButton
        buttonTitle="Sign In"
        onPress={handleLogin}
      />
      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: "cover",
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
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "Lato-Regular",
  },
});

export default Login;
