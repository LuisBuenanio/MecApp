import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";

import { SliderBox } from "react-native-image-slider-box";
import * as Animatable from "react-native-animatable";
import config from "../../config";

const images = [
  config.url_slider + "/prueba.jpg",
  config.url_slider + "/lab_mecanica.jpg",
  config.url_slider + "/06.jpg",
  config.url_slider + "/team_mecanica.jpg",
];

class Inicio extends Component {
  state = {
    loading: true,
  };

  render() {
    
    const { loading } = this.state;
    if (loading) {
      return (
        <View style={styles.container}>
          <ImageBackground
            source={require("../../assets/images/mecanica-transparente.png")}            
            style={{ flex: 1, flexDirection: "column" }}
          >
            <ScrollView>
              <View style={styles.header}>
                <View style={{ flex: 1, alignItems: "flex-start" }}>
                  <Animatable.Image
                    animation="zoomIn"
                    delay={200}
                    duration={3000}
                    source={{ uri: config.url_logos + "/logo-espoch.png"}}
                    style={styles.logo}
                  />
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <Animatable.Image
                    animation="zoomIn"
                    delay={200}
                    duration={3000}
                    source={{
                      uri: config.url_logos + "/logo-mecanica-color.png",
                    }}
                    style={styles.logo}
                  />
                </View>
              </View>

              <View style={styles.body}>
                <View style={{ position: "relative", alignItems: "center" }}>
                  <Animatable.Text
                    animation="slideInDown"
                    duration={4000}
                    style={styles.text}
                  >
                    ESCUELA DE
                  </Animatable.Text>
                  <Animatable.Text
                    animation="slideInLeft"
                    duration={4000}
                    style={styles.text2}
                  >
                    INGENIERÍA
                  </Animatable.Text>
                  <Animatable.Text
                    animation="slideInRight"
                    duration={4000}
                    style={styles.text3}
                  >
                    MECÁNICA
                  </Animatable.Text>
                </View>
                <SliderBox
                  images={images}
                  sliderBoxHeight={Dimensions.get("window").height * 0.425}
                  autoplay={true}
                  dotColor="white"
                  inactiveDotColor="white"
                  circleLoop
                  imageLoadingColor="#344a72"
                  ImageComponentStyle={{
                    width: "98%",
                    marginTop: Dimensions.get("window").height * 0.02,
                  }}
                ></SliderBox>

                
              </View>
              
            </ScrollView>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <ImageBackground
          source={require("../../assets/images/mecanica-transparente.png")}
          style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
        >
          <ActivityIndicator
            size="large"
            color="#344a72"
            justifyContent="space-around"
          />
        </ImageBackground>
      );
    }
  }
}

const styles = StyleSheet.create({
  item: {
    borderStyle: "solid",
    borderColor: "white",
    borderBottomWidth: 5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
  },

  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },

  header: {
    flex: 0.3,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  body: {
    flex: 1,
    alignItems: "center",
    marginTop: 5,
    paddingBottom: 5,
  },

  text: {
    fontSize: Dimensions.get("window").height * 0.05,
    fontWeight: "bold",
    color: "#344a72",
    textAlign: "justify",
  },

  text2: {
    fontSize: Dimensions.get("window").height * 0.05,
    fontWeight: "bold",
    color: "#344a72",
    textAlign: "justify",
  },

  text3: {
    fontSize: Dimensions.get("window").height * 0.05,
    fontWeight: "bold",
    color: "#344a72",
    textAlign: "justify",
  },
  logo: {
    width: Dimensions.get("window").height * 0.12,
    height: Dimensions.get("window").height * 0.12,
    resizeMode: "contain",
  },
});

export default Inicio;