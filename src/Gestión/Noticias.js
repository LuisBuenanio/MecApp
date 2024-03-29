import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Button } from "react-native-paper";
import config from "../../config";
import * as MediaLibrary from "expo-media-library";

class Noticias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      noticias: [],
      selectedImage: null,
      isModalVisible: false,
      url_noticias: config.API_URL_API + "/noticias",
    };
  }

  componentDidMount() {
    this.getNoticias();
  }

  getNoticias = () => {
    this.setState({ loading: true });

    fetch(this.state.url_noticias)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          noticias: res.datos,
          loading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  saveImage = async () => {
    if (this.state.selectedImage) {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(
          this.state.selectedImage
        );
        MediaLibrary.createAlbumAsync("MecApp", asset, false);
        alert("Imagen guardada en el dispositivo.");
      } else {
        alert("Permiso denegado para guardar la imagen.");
      }
    }
  };

  render() {
    const { loading, noticias, selectedImage, isModalVisible } = this.state;

    if (!loading) {
      return (
        <View style={styles.container}>
          <ImageBackground
            source={require("../../assets/images/mecanica-transparente.png")}
            style={{ flex: 1, flexDirection: "column" }}
          >
            <ScrollView>
              <View style={styles.politicas_calidad}>
                <Text style={styles.titulo}>Últimas Noticias </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  paddingTop: 50,
                  paddingLeft: 5,
                  paddingBottom: 20,
                }}
              >
                <FlatList
                  data={this.state.noticias}
                  renderItem={({ item }) => (
                    <View style={{}}>
                      {item.portada && (
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({
                              selectedImage: item.portada,
                              isModalVisible: true,
                            })
                          }
                        >
                          <Image
                            source={{ uri: item.portada }}
                            style={{
                              width: 460,
                              height: 300,
                              marginRight: 10,
                              alignSelf: "center",
                              alignContent: "center",
                            }}
                          />
                        </TouchableOpacity>
                      )}

                      {item.imagenes && item.imagenes.length > 0 && (
                        <FlatList
                          horizontal
                          data={item.imagenes}
                          renderItem={({ item: imagen }) => (
                            <TouchableOpacity
                              onPress={() =>
                                this.setState({
                                  selectedImage: imagen,
                                  isModalVisible: true,
                                })
                              }
                            >
                              <Image
                                source={{ uri: imagen }}
                                style={{
                                  width: 100,
                                  height: 100,
                                  marginRight: 10,
                                  alignSelf: "center",
                                  alignContent: "center",
                                }}
                              />
                            </TouchableOpacity>
                          )}
                          keyExtractor={(imagen, index) => index.toString()}
                        />
                      )}

                      <View>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                          {item.titulo}
                        </Text>
                        <Text style={{ fontSize: 14 }}>{item.entradilla}</Text>
                        <Text style={{ fontSize: 14 }}>{item.contenido}</Text>
                      </View>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                ></FlatList>
              </View>
              <Modal
                animationType="slide"
                transparent={false}
                visible={isModalVisible}
              >
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <View style={{ flex: 1 }}>
                    <Button
                      mode="outlined"
                      onPress={() =>
                        this.setState({
                          isModalVisible: false,
                          selectedImage: null,
                        })
                      }
                    >
                      Cerrar
                    </Button>
                    <Image
                      source={{ uri: selectedImage }}
                      style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "contain",
                      }}
                    />
                  </View>
                </View>
              </Modal>
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
          <View style={styles.container}>
            <Text>Cargando noticias...!</Text>
          </View>
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
  text: {
    fontSize: 17,
    fontFamily: "antic-slab",
    color: "#4d4d4d",
    textAlign: "justify",
  },
  text_press: {
    fontSize: 17,
    fontFamily: "antic-slab",
    color: "#4d4d4d",
    textAlign: "center",
    textDecorationLine: "underline",
  },

  titulo: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: "bold",
    fontSize: 30,
    color: "#344a72",
    textAlign: "center",
  },
  text_mis_vis: {
    fontSize: 17,
    fontFamily: "antic-slab",
    color: "#4d4d4d",
    textAlign: "justify",
    paddingTop: 14,
    paddingLeft: 5,
    paddingRight: 25,
  },
  subtitulo_mis_vis: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#4d4d4d",
    textAlign: "center",
    paddingTop: 14,
    paddingLeft: 5,
    paddingRight: 25,
  },
});

export default Noticias;
