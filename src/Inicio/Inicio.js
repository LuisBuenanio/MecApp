import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";

import { SliderBox } from "react-native-image-slider-box";
import * as Animatable from "react-native-animatable";
import config from "../../config";

class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      sliders: [],
      url_sliders: config.API_URL_API + "/sliders",
    };
  }

  componentDidMount() {
    this.getSliders();
  }

  getSliders = () => {
    this.setState({ loading: true });

    fetch(this.state.url_sliders)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          sliders: res.datos,
          loading: false,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false });
      });
  };

  renderHeader = () => (
    <View>
      <View style={styles.header}>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <Animatable.Image
            animation="zoomIn"
            delay={200}
            duration={3000}
            source={{ uri: config.url_logos + "/logo-espoch.png" }}
            style={styles.logo}
          />
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Animatable.Image
            animation="zoomIn"
            delay={200}
            duration={3000}
            source={{ uri: config.url_logos + "/logo-mecanica-color.png" }}
            style={styles.logo}
          />
        </View>
      </View>
      <View style={styles.body}>
        <View style={{ position: "relative", alignItems: "center" }}>
          <Animatable.Text
            animation="slideInRight"
            duration={4000}
            style={styles.text3}
          >
            MECÁNICA
          </Animatable.Text>
        </View>
        <SliderBox
          images={this.state.sliders.map((slider) => slider.url)}
          sliderBoxHeight={Dimensions.get("window").height * 0.425}
          autoplay={true}
          autoplayInterval={4000} // Ajusta el intervalo de reproducción automática a 4 segundos
          dotColor="white"
          inactiveDotColor="white"
          circleLoop={true}
          resizeMethod={'resize'}
          resizeMode={'cover'}
          ImageComponentStyle={{
            width: "98%",
            marginTop: Dimensions.get("window").height * 0.02,
          }}
        />
      </View>
    </View>
  );

  render() {
    const { loading } = this.state;
    if (!loading) {
      return (
        <View style={styles.container}>
          <ImageBackground
            source={require("../../assets/images/mecanica-transparente.png")}
            style={{ flex: 1, flexDirection: "column" }}
          >
            <FlatList
              data={[]}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={this.renderHeader}
            />
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <ImageBackground
          source={require("../../assets/images/mecanica-transparente.png")}
          style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#344a72" justifyContent="space-around" />
        </ImageBackground>
      );
    }
  }
}

const styles = StyleSheet.create({
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
