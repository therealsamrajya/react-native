import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import bg from "@/assets/images/bg.jpeg"

const app = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={bg}
      resizeMode="cover"
      style={styles.image}>
        
        <Text style={styles.text}>Explore the app now!</Text>
      </ImageBackground>
    </View>
  );
};

export default app;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image:{
    width:"100%",
    height:"100%",
    flex:1,
    resizeMode:"cover",
    justifyContent:"center"
  },
  text: {
    color: "white",
    fontSize: 42,
    textAlign: "center",
  },
});
