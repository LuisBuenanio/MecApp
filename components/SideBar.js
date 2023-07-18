import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

export default function Sidebar(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          flex: 1,
          paddingTop: 10,
          paddingLeft: 5,
          backgroundColor: "#FA370E",
          flexDirection: "row",
        }}
      >
        <Image
          style={{ backgroundColor: "#FA370E", width: 90, height: 90 }}
          source={require("../assets/images/mecanica-blanco-fnd.png")}
        />

        <View
          style={{
            alignSelf: "flex-end",
            paddingLeft: Dimensions.get("window").width * 0.18,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "white",
              textAlign: "right",
            }}
          >
            Mec App
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "#bfbfbf",
              textAlign: "right",
            }}
          >
            v1.0.1
          </Text>
        </View>
      </View>

      <View>
        <DrawerItemList labelStyle={{ padding: 5, fontSize: 16 }} {...props} />
      </View>

      <View
        style={{ flex: 1, paddingTop: Dimensions.get("window").width * 0.98 }}
      >
        <Image
          source={require("../assets/images/logoprincipal.png")}
          style={styles.image2}
        ></Image>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },

  image2: {
    width: 200,
    height: 65,
    alignSelf: "center",
  },
});
