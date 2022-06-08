import { Text } from "@rneui/themed";
import { useState } from "react";
import { Formik } from "formik";
import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  Button,
  Image,
} from "react-native";
import Checkbox from "expo-checkbox";
import { COLORS, FONTS, SHADOWS } from "../constants";
import PhoneInput from "react-native-phone-number-input";

const Signup = () => {
  const [isSelected, setSelection] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text h3 style={styles.text}>
          Welcome to {""}
          <Text h3 style={{ color: COLORS.primary }}>
            SAYHEY,
          </Text>
        </Text>
        <Text style={styles.subText}>
          Let us get to know you better!
        </Text>
      </View>
      <View>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            mobileNumber: "",
          }}
          
          onSubmit={(values) => { 
            var InsertAPIURL = "http://192.168.29.159:19000/backend/signup.php";   //API to render signup

            // var headers = {
              
            //   'Accept': 'application/json',
            //   'Content-Type': 'application/json'
              
            // };
            
            var Data ={
              fname :values.firstName,
              lname: values.lastName,
              u_email: values.email,
              u_mno: values.mobileNumber,
              u_pass: values.password
              
            };
            fetch(InsertAPIURL,{
              method:'POST',
              headers: {
              
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                
              },
              body: JSON.stringify(Data) //convert data to JSON
          })
          .then((response)=>response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
          .then((response)=>{
            alert(response[0].Message);       // If data is in JSON => Display alert msg
           
          })
          .catch((error)=>{
              alert("Error Occured" + error);
          })
          
          
        
            
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <View
                style={{
                  marginTop: 25,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextInput
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  value={values.firstName}
                  placeholder="First Name"
                  style={styles.input}
                />
                <TextInput
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                  placeholder="Last Name"
                  style={styles.input}
                />
                <TextInput
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  placeholder="Email"
                  style={styles.input}
                />
                <PhoneInput
                  defaultCode="IN"
                  layout="first"
                  containerStyle={styles.phoneContainer}
                  textContainerStyle={styles.numberInput}
                  onChangeFormattedText={(text) => {
                    values.mobileNumber = text;
                  }}
                />
                <TextInput
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  placeholder="Password"
                  style={styles.input}
                />
                <Text
                  style={{
                    marginLeft: 12,
                    color: "#CDCFD0",
                    alignSelf: "flex-start",
                  }}
                >
                  *minimum 6 characters
                </Text>
              </View>
              <View style={{ margin: 12, padding: 8, flexDirection: "row",alignItems:"center" }}>
                <Checkbox
                  color={"#0A94FF"}
                  value={isSelected}
                  onValueChange={setSelection}
                />
                <Text style={{ marginLeft: 20,letterSpacing:1 }}>
                  By clicking here I agree SAYHEY'S {"\n"}
                  <Text style={{ color: "#0A94FF" }}>
                    Terms Of Service
                  </Text> and{" "}
                  <Text style={{ color: "#0A94FF" }}>Privacy Policy</Text>
                </Text>
              </View>
              <Button color={"#0A94FF"} title="Submit" onPress={handleSubmit} />
            </View>
          )}
        </Formik>
        <Text
          style={{ marginTop: 10, textAlign: "center", fontWeight: "bold" }}
        >
          or
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 15,
          }}
        >
          <Image
            source={require("../assets/Facebook.png")}
            style={styles.logo}
          />
          <Image source={require("../assets/Apple.png")} style={styles.logo} />
          <Image source={require("../assets/Google.png")} style={styles.logo} />
        </View>
        <Text style={{ textAlign: "center", margin: 25 }}>
          Already have an account?{" "}
          <Text style={{ color: "#FF7360" }}>Login</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

// CSS PART
const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    backgroundColor: COLORS.offWhite,
  },

  text: {
    fontWeight: "600",
    textAlign: "center",
    marginTop: 15,
  },
  subText: {
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    height: 56,
    boxShadow: SHADOWS.dark,
    margin: 12,
    padding: 8,
    color: COLORS.lightgray,
    width: "95%",
  },
  phoneContainer: {
    width: "95%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    height: 56,
    boxShadow: SHADOWS.dark,
    margin: 12,
    color: COLORS.lightgray,
  },
  numberInput: {
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    color: COLORS.lightgray,
    boxShadow: SHADOWS.dark,
  },
  button: {
    backgroundColor: "#0A94FF",
    height: 56,
    justifyContent: "center",
    borderRadius: 12,
  },
  logo: {
    width: 30,
    height: 30,
  },
});

export default Signup;
