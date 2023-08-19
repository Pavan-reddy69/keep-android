import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import img from './assests/keep_2020q4_48dp.png';
function Header() {
  const logo = (
    <Image
      source={img}
      style={styles.logo}
      resizeMode="contain"
    />
  );

  return (
    <View style={styles.header}>
      {logo}
      <Text style={styles.headerText}>Keep</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "left",
    justifyContent: "left",
    width: "100%",
    height:50,
    backgroundColor: "#fff",
  },
  logo: {
    width: 48,
    height: 48,
    
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color:'black',
    marginLeft: 4,
    top:10,
  },
});

export default Header;
