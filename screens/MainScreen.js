import React, { useState, useLayoutEffect } from "react";
import { Alert } from "react-native";
import { auth } from "../firebase";
import { ColorPicker } from "react-native-color-picker";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";
import { db } from "../firebase";
// import { LogBox } from "react-native";
// LogBox.ignoreLogs(["Setting a timer"]);
const MainScreen = ({ navigation }) => {
  const [color, setColor] = useState();
  const [height, setHeight] = useState();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: "white",
      headerTitleStyle: {
        marginLeft: 130,
        color: "white",
      },

      headerStyle: { backgroundColor: "#433f9f" },
    });
  }, [navigation]);

  backgroundColors = [
    "red",
    "orange",
    "blue",
    "pink",
    "teal",
    "maroon",
    "purple",
    "silver",
    "gold",
  ];

  const storeData = async () => {
    await db
      .collection("data")
      .add({
        email: auth.currentUser.email,
        color: color,
        size: height,
      })
      .then(() => {
        console.log("Added Successfully");
        Alert.alert("Saved Successfully");
      })
      .catch((error) => alert(error));
  };

  return (
    <View
      style={{
        backgroundColor: "#dddddd",
        flex: 1,
      }}
    >
      <StatusBar style="light" />
      <View>
        <Text
          style={{
            margin: 10,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Color
        </Text>
        <View style={styles.colorContainer}>
          <View style={{ height: 100, width: 70 }}>
            <ColorPicker
              onColorSelected={(color) => setColor(color)}
              style={{ flex: 1 }}
            />
          </View>
          <ScrollView horizontal={true} style={{ marginBottom: 40 }}>
            {backgroundColors.map((color) => {
              return (
                <TouchableOpacity
                  key={color}
                  onPress={() => setColor(color)}
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: color,
                    borderRadius: 20,
                    borderColor: "black",
                    margin: 6,
                  }}
                ></TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.bannerContainer}>
          <View>
            <Text
              style={{
                margin: 10,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Banner Height
            </Text>
          </View>
          <View style={styles.pickerContainer}>
            <Image
              source={{
                uri: "https://static.thenounproject.com/png/844736-200.png",
              }}
              style={{
                width: 40,
                height: 40,
              }}
            />
            <Picker
              style={{
                width: 130,
                marginLeft: 5,
                marginBottom: 6,
              }}
              selectedValue={height}
              onValueChange={(height, itemIndex) => setHeight(height)}
            >
              <Picker.Item label="Small" value="small" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="Large" value="large" />
            </Picker>
          </View>
        </View>
        <View
          style={{
            marginTop: 40,
            width: 300,
            justifyContent: "center",
            marginLeft: 28,
          }}
        >
          <Button onPress={storeData} title="Save" color="#433d9f" />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: "row",
    marginTop: 3,
    marginLeft: 10,
    alignItems: "center",
  },
  colorContainer: {
    flexDirection: "row",
    marginTop: 3,
    marginLeft: 10,
    alignItems: "center",
  },
  con: {
    width: 30,
    height: 30,
  },
  bannerContainer: {
    marginTop: 20,
  },
});
export default MainScreen;
