import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Image,
} from "react-native";

import { SliderBox } from "react-native-image-slider-box";
import * as Animatable from "react-native-animatable";
import config from "../../config";

/* const images = [
  config.url_slider + "/portadad-2.jpg",
  config.url_slider + "/prueba-finalas-dasd-asd.jpg",
]; */


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
    .then(res => {

        this.setState({ 
          sliders: res.datos, 
          loading: false 
        });
      })
    .catch((error) => {
        console.error(error);
        this.setState({ loading: false });
      });  
  };



  render() {
    
    const { loading, sliders } = this.state;
    if (!loading) {
      const images = sliders.map((slider) => slider.url);

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
                  {/* <Animatable.Text
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
                  </Animatable.Text> */}
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
                {/* <FlatList
                        data={this.state.sliders}
                        renderItem={({ item }) => (
                          <View style={{}}>
                                {item.url &&
                                    <Image source={{ uri: item.url }} 
                                    style={{ 
                                      width: 460, 
                                      height: 300, 
                                      marginRight: 10, 
                                      alignSelf: "center", 
                                      alignContent: "center" 
                                    }} />
                                }
                                          
                                <View>                          
                                  <Text style={{fontSize: 18, fontWeight: "bold",}} >{item.name}</Text>  
                                  <Text style={{fontSize: 14}} >{item.name}</Text>
                                  <Text style={{fontSize: 14}} >{item.name}</Text>
                                </View>                     
                            </View>                      
                                        
                        )}
                        keyExtractor={(item, index) => index.toString()}              
                        >  
                </FlatList> */}
                
                
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