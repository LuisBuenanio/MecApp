import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Communications from "react-native-communications";
import { Card, Paragraph } from "react-native-paper";
import config from "../../config";

class Docentes extends Component {
  state = {
    loading: true,
    integrantes: [],
    error: false,
    isModalVisible: false,
    selectedDocente: null,
  };

  componentDidMount() {
    this.obtener_docentes();
  }

  obtener_docentes = async () => {
    try {
      const response = await fetch(`${config.API_URL_API}/docentes`, {
        method: "GET",
      });
      const data = await response.json();
      this.setState({
        integrantes: data.datos || [],
        loading: false,
      });
    } catch (error) {
      console.error(error);
      this.setState({ loading: false, error: true });
    }
  };

  openModal = (docente) => {
    this.setState({ isModalVisible: true, selectedDocente: docente });
  };

  closeModal = () => {
    this.setState({ isModalVisible: false, selectedDocente: null });
  };

  renderCard = ({ item, index }) => {
    return (
      <TouchableOpacity key={index} style={styles.cardContainer} onPress={() => this.openModal(item)}>
        <Card style={styles.card}>
          <Card.Cover
            style={styles.cardCover}
            source={{ uri: `${config.API_URL_DOCEN}/${item.foto}` }}
          />
          <Card.Content style={styles.cardContent}>
            <Paragraph style={styles.paragraph}>{item.nombre}</Paragraph>
            <Paragraph style={styles.title2}>{item.email}</Paragraph>
            <Paragraph style={styles.title2}>{item.telefono}</Paragraph>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  render() {
    const { loading, error, integrantes, isModalVisible, selectedDocente } = this.state;

    if (loading) {
      return (
        <ImageBackground
          source={require("../../assets/images/mecanica-transparente.png")}
          style={styles.loadingContainer}
        >
          <ActivityIndicator size="large" color="#344a72" />
        </ImageBackground>
      );
    }

    if (error) {
      return (
        <ImageBackground
          source={require("../../assets/images/mecanica-transparente.png")}
          style={styles.loadingContainer}
        >
          <Text style={styles.errorText}>Error al cargar los datos.</Text>
        </ImageBackground>
      );
    }

    const leftColumn = integrantes.filter((_, index) => index % 2 === 0);
    const rightColumn = integrantes.filter((_, index) => index % 2 !== 0);

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/mecanica-transparente.png")}
          style={styles.backgroundImage}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.autoridades}>
              <Text style={styles.titulo}>Docentes de la Escuela de Mecánica</Text>
            </View>
            <View style={styles.columnsContainer}>
              <View style={styles.column}>{leftColumn.map((item, index) => this.renderCard({ item, index }))}</View>
              <View style={styles.column}>{rightColumn.map((item, index) => this.renderCard({ item, index }))}</View>
            </View>
            <View style={styles.scrollViewFooter}></View>
          </ScrollView>
        </ImageBackground>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={this.closeModal}
        >
          <TouchableWithoutFeedback onPress={this.closeModal}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  {selectedDocente && (
                    <>
                      <Text style={styles.modalTitle}>{selectedDocente.nombre}</Text>
                      <Text style={styles.modalText}>
                        <Text style={styles.boldText}>Título:</Text> {selectedDocente.titulo}
                      </Text>
                      <Text style={styles.modalText}>
                        <Text style={styles.boldText}>Descripción:</Text> {selectedDocente.descripcion}
                      </Text>
                      <TouchableOpacity
                          onPress={() =>
                            Communications.web(
                              config.API_URL_PDF_DOC + "/" + this.state.selectedDocente.hoja_vida
                            )
                          }
                        style={styles.modalText} >
                        <Text style={styles.text_press}>
                          {this.state.selectedDocente.hoja_vida}
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  autoridades: {
    marginTop: 12,
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
  paragraph: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "antic-slab",
    color: 'blue',
  },
  title2: {
    fontSize: 14,
    textAlign: "center",
    marginVertical: 0,
  },
  errorText: {
    fontSize: 20,
    color: "red",
    textAlign: "center",
  },
  scrollViewContent: {
    paddingBottom: 30,
  },
  scrollViewFooter: {
    height: 30,
  },
  backgroundImage: {
    flex: 1,
  },
  columnsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  cardContainer: {
    marginBottom: 20,
    width: '90%', // Set width to a percentage to make it responsive
  },
  card: {
    width: '100%',
  },
  cardCover: {
    height: 190,
    width: '100%',
    alignSelf: "center",
  },
  cardContent: {
    alignSelf: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    color: "black",
    textAlign: "justify",
    marginTop: 10,
    backgroundColor: "#f8e4e4",
    borderRadius: 10,
    padding: 20,
  },
  boldText: {
    fontWeight: "bold",
  },
  text_press: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default Docentes;
