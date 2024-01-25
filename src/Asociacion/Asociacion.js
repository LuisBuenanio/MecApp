import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  Card,
  Chip,
} from "react-native-paper";
import Communications from "react-native-communications";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import config from "../../config";


class Asociacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      facultad: null,
      url_asociacion: config.API_URL_API + "/asociaciones/1",
    };
  }

  async obtener_asociacion() {
    await fetch(this.state.url_asociacion, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          asociacion: res.datos,
          loading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.obtener_asociacion();
  }

  render() {
    const { loading } = this.state;
    if (!loading) {
      return (
        <View style={styles.container}>
          <ImageBackground
            source={require("../../assets/images/mecanica-transparente.png")}
            style={{ flex: 1, flexDirection: "column" }}
          >
            <ScrollView>
            <View style={styles.encabezado}>
                <Text style={styles.titulo}>Asociaciones de Estudiantes</Text>
            </View>
            <View
                style={{
                  alignSelf: "center",
                  paddingTop: 20,
                  paddingBottom: 20,
                }}
              >
                <Card
                  style={{ height: 190, width: 340 }}                  
                >
                  <Card.Cover
                    style={{ height: 180, width: 340, alignSelf: "center" }}
                    source={{
                      uri:
                        config.API_URL_ASO +
                        "/" +
                        this.state.asociacion.logo,
                    }}
                  />
                </Card>
              </View>

              <View style={styles.mision_vision}>
                <Text style={styles.subtitulo}>Misión</Text>
              </View>
              <View>
                <Text style={styles.text3}>
                  {this.state.asociacion.mision}
                </Text>
              </View>

              <View style={styles.mision_vision}>
                <Text style={styles.subtitulo}>Visión</Text>
              </View>

              <View>
                <Text style={styles.text3}>
                  {this.state.asociacion.vision}
                </Text>

              </View>
              <View style={styles.mision_vision}>
                <Text style={styles.subtitulo}>Contactos</Text>
              </View>

              <View>
                <Text style={styles.text4}> Teléfono : 
                <MaterialCommunityIconsIcon
                                name="phone"
                                size={17}
                                color={"black"}
                            />
                            {this.state.asociacion.telefono}
                </Text>
                <Text style={styles.text4}> Email : <MaterialCommunityIconsIcon
                                name="email"
                                size={17}
                                color={"black"}
                            />
                  {this.state.asociacion.email}
                </Text>                
                <Text style={styles.text4}> Facebook:                  
                  <Chip 
                          style = {{ backgroundColor: "#f7faff", marginTop: 8, marginLeft: 0}}
                          textStyle ={{fontSize: 13}}
                          height= {34}
                          width = {100}
                          mode = "outlined"
                          icon= "facebook"
                          selected = {true}
                          selectedColor="#3b5998"
                          onPress={() =>
                            Communications.web(
                              "https://www.facebook.com/CarreraMecanica2021"
                            )} 
                        >
                        Mecánica
                    </Chip>
                </Text>
                
              </View>
              <View style={styles.footer2}>
                                                                             
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
            color="#da0303"
            justifyContent="space-around"
          />
        </ImageBackground>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 0,
    flexDirection: "column",
  },
  encabezado: {
    flex: 1,
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 5,
    alignSelf: "center",
  },

  titulo: {
    paddingTop: 15,
    paddingRight: 5,
    fontWeight: "bold",
    fontSize: 25,
    color: "#344a72",
    textAlign: "center",
  },
  text3: {
    fontSize: 18,
    fontFamily: "antic-slab",
    color: "#4d4d4d",
    textAlign: "center",
    paddingTop: 10,
    paddingLeft: 35,
    paddingRight: 35,
  },
  text4: {
    fontSize: 18,
    fontFamily: "antic-slab",
    color: "#4d4d4d",
    textAlign: "center",
    paddingTop: 10,
    paddingLeft: 35,
    paddingRight: 35,
    fontStyle: "italic",
    paddingBottom: 20,
  },
  mision_vision: {
    flex: 1,
    marginTop: 5,
    alignSelf: "center",
  },

  subtitulo: {
    paddingTop: 10,
    fontWeight: "bold",
    fontSize: 30,
    color: "#344a72",
  },
});

export default Asociacion;
