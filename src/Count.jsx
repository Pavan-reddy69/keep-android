import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Count({ count }) {
  return (
    <View style={styles.count}>
      <Text style={styles.countText}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  count: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  countText: {
    color:'black',
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Count;
