import React, { useEffect, useState } from "react";
import { Platform, View, ActivityIndicator, Text } from 'react-native';
import DrawerNavigator from "./src/DrawerNavigator";
import * as Font from "expo-font";
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as MediaLibrary from "expo-media-library";

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
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }
    requestMediaLibraryPermission();
  }, []);

  const loadFonts = async () => {
    await Font.loadAsync({
      "antic-slab": require("./assets/fonts/AnticSlab-Regular.ttf"),
    });

    setFontsLoaded(true);
  };

  const requestMediaLibraryPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library was denied');
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <DrawerNavigator />;
}
