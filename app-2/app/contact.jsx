import { View, Text,StyleSheet,Appearance,SafeAreaView, Image,Dimensions} from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import teabg from "@/assets/images/teabg.png"
import { Link } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';

export default function contact() {


    const colorScheme = Appearance.getColorScheme()
    const theme = colorScheme === "dark" ? Colors.dark : Colors.light
    const styles = createStyles(colorScheme,theme)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
    <Text style={styles.title}>Contact</Text>
    <Image style={styles.image} source={teabg}/>
    <Text style={[styles.title,styles.secondTitle]}>You can Contact Us through our Socials</Text>

    <View style={styles.socials}>
    <Link href="#" asChild><Entypo style={styles.socialIcon} name="facebook" size={24} /></Link>
    <Link href="#" asChild><Entypo style={styles.socialIcon} name="twitter" size={24} /></Link>
    <Link href="#" asChild><Entypo style={styles.socialIcon} name="instagram" size={24} /></Link>
     
    </View>

    <Text style={[styles.title,styles.secondTitle]}>Bishalnagar, Kathmandu</Text>
    <Text style={[styles.title,styles.secondTitle]}>Phone No : 123456789</Text>

    <View style={styles.footer}>
        <Text style={styles.footerText}>&copy; 2023 Coffee Shop</Text>
      </View>
  
    </View>
    
    </SafeAreaView>
    
  )
}

function createStyles (colorScheme,theme){
  return StyleSheet.create({
    container:{
      backgroundColor:theme.background,
      paddingTop:0,
      
      flex:1,
    },
    content: {
     flex:1,
   
      
    },
    title:{
      color:theme.text,
      fontSize:24,
      fontWeight:"bold",
      textAlign:"center"
    },
    secondTitle:{
      marginTop:20,
      fontSize:20,
    },
    image:{
      width:"60%",
      height:"20%",
      justifyContent:"center",
      alignItems:"center",
      marginHorizontal:"auto",
      resizeMode:"cover",
      marginTop:20,
      borderRadius:20,
    },

    socials:{
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center",
      marginHorizontal:"auto",
      marginTop:20,
      gap:20,
    },
    socialIcon:{
      color:colorScheme === "dark" ? "white" : "black",
      justifyContent:"center",
      alignItems:"center",
      marginHorizontal:"auto",
      marginTop:20,
      flexDirection:"row",
      
    },
    footer: {
      backgroundColor: colorScheme === 'dark' ? 'white' : 'black',
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0, 
      width: '100%',
    },
    footerText: {
      color:colorScheme.text,
      fontSize: 16,
    },
    
  })
}