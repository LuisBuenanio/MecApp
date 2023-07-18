import React, { useEffect, useState } from "react";
import { Platform, View, } from 'react-native';
import DrawerNavigator from "./src/DrawerNavigator";
import * as Font from "expo-font";
import Constants from 'expo-constants';
import * as Location from 'expo-location';


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  
  useEffect(() => {
    if (!fontsLoaded) {
      loadFonts();
    }
    if (Platform.OS === 'android' && !Constants.isDevice) {
      setErrorMsg(
        'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      );
    } else {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }
  });

  const loadFonts = async () => {
    await Font.loadAsync({
      "antic-slab": require("./assets/fonts/AnticSlab-Regular.ttf"),
    });

    setFontsLoaded(true);
  };

  if (!fontsLoaded) {
    return <View></View>;
  }
  
  return <DrawerNavigator></DrawerNavigator>;
  
}

