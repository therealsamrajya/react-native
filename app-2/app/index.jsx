import { View, Text,StyleSheet,ImageBackground,Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import icedImg from "@/assets/images/iced-coffee.png"

const app = () => {
  return (
    <View style={styles.container}>
      <ImageBackground 
      source={icedImg}
      resizeMode="cover"
      style={styles.image}>

      <Text style={styles.title}>Coffee Shop</Text>

  <Link href="/menu" style={{marginHorizontal:"auto"}} asChild>
  <Pressable style={styles.button}>
    <Text style={styles.buttonText}>Menu</Text>
  </Pressable >
  </Link>

  <Link href="/contact" style={{marginHorizontal:"auto"}} asChild>
  <Pressable style={styles.button}>
    <Text style={styles.buttonText}>Contact Us</Text>
  </Pressable >
  </Link>
      </ImageBackground>
    </View>
  )
}

export default app


const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column'
  },
  image:{
    width:"100%",
    height:"100%",
    flex:1,
    resizeMode:"cover",
    justifyContent:"center"
  },
  title:{
    backgroundColor:"rgba(0,0,0,0.5)",
    color:"white",
    fontSize:42,
    fontWeight:"bold",
    textAlign:"center",
    marginBottom:120
  },
  link:{
    backgroundColor:"rgba(0,0,0,0.5)",
    color:"white",
    fontSize:42,
    fontWeight:"bold",
    textAlign:"center",
    textDecorationLine:"underline",
    padding:4,

  },
  button:{
    height:60,
    borderRadius:20,
    justifyContent:"center",
    backgroundColor:"rgba(0,0,0,0.75)",
    padding:4,
    marginBottom:50,
    width:150,
  },
  buttonText:{
    color:"white",
    fontSize:16,
    fontWeight:"bold",
    textAlign:"center",
    padding:4,

  }
})