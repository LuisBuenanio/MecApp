import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Button } from "react-native-paper";
import config from "../../config";
import * as MediaLibrary from "expo-media-library";
import ImageModal from "./ImageModal"; // Asegúrate de importar el componente

class Noticias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      noticias: [],
      expandedContentIndex: null,
      selectedImage: null,
      isImageModalVisible: false,
      isContentModalVisible: false,
      contentModalText: "",
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

  render() {
    const {
      loading,
      noticias,
      selectedImage,
      isImageModalVisible,
      isContentModalVisible,
      contentModalText,
    } = this.state;

    if (loading) {
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

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/mecanica-transparente.png")}
          style={{ flex: 1, flexDirection: "column" }}
        >
          <FlatList
            data={noticias}
            ListHeaderComponent={() => (
              <View style={styles.politicas_calidad}>
                <Text style={styles.titulo}>Últimas Noticias</Text>
              </View>
            )}
            renderItem={({ item, index }) => (
              <View style={styles.newsItem}>
                <Text style={styles.newsTitle}>{item.titulo}</Text>

                {item.portada && (
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        selectedImage: item.portada,
                        isImageModalVisible: true,
                      })
                    }
                  >
                    <Image
                      source={{ uri: item.portada }}
                      style={styles.portada}
                    />
                  </TouchableOpacity>
                )}

                <Text style={styles.newsEntradilla}>{item.entradilla}</Text>

                {item.imagenes && item.imagenes.length > 0 && (
                  <FlatList
                    horizontal
                    data={item.imagenes}
                    renderItem={({ item: imagen }) => (
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            selectedImage: imagen,
                            isImageModalVisible: true,
                          })
                        }
                      >
                        <Image
                          source={{ uri: imagen }}
                          style={styles.thumbnail}
                        />
                      </TouchableOpacity>
                    )}
                    keyExtractor={(imagen, index) => index.toString()}
                  />
                )}

                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      isContentModalVisible: true,
                      contentModalText: item.contenido,
                    })
                  }
                >
                  <Text style={styles.readMore}>Leer más</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />

          {/* Modal para la imagen */}
          <ImageModal
            isVisible={isImageModalVisible}
            onClose={() =>
              this.setState({
                isImageModalVisible: false,
                selectedImage: null,
              })
            }
            selectedImage={selectedImage}
          />

          {/* Modal para el contenido */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isContentModalVisible}
            onRequestClose={() =>
              this.setState({
                isContentModalVisible: false,
                contentModalText: "",
              })
            }
          >
            <TouchableWithoutFeedback
              onPress={() =>
                this.setState({
                  isContentModalVisible: false,
                  contentModalText: "",
                })
              }
            >
              <View style={styles.modalOverlay}>
                <TouchableWithoutFeedback>
                  <View style={styles.contentModalContent}>
                    <ScrollView>
                      <Text style={styles.fullText}>{contentModalText}</Text>
                    </ScrollView>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 0,
    flexDirection: "column",
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
  newsContainer: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 5,
    paddingBottom: 20,
  },
  newsItem: {
    marginBottom: 20,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  portada: {
    width: "100%",
    height: 300,
    alignSelf: "center",
  },
  newsEntradilla: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 10,
    alignSelf: "center",
  },
  readMore: {
    fontSize: 14,
    color: "blue",
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  newsContent: {
    fontSize: 14,
    textAlign: "justify",
    color: "black",
    margin: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  contentModalContent: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  fullText: {
    fontSize: 16,
    color: "black",
    textAlign: "justify",
    margin: 20,
    backgroundColor: "#f8e4e4",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
});

export default Noticias;
