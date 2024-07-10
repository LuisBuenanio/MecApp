import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import config from "../../config";

class Int_Asociacion extends Component {
  state = {
    loading: true,
    integrantes: [],
    error: false,
  };

  componentDidMount() {
    this.obtener_integrantes();
  }

  obtener_integrantes = async () => {
    try {
      const response = await fetch(`${config.API_URL_API}/integrantes`, {
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

  renderCard = ({ item, index }) => {
    return (
      <View key={index} style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Cover
            style={styles.cardCover}
            source={{ uri: `${config.API_URL_INT_ASOC}/${item.foto}` }}
          />
          <Card.Content style={styles.cardContent}>
            <Paragraph style={styles.paragraph}>
              {item.nombre}
            </Paragraph>
            <Title style={styles.title1}>
              {item.tipo_integrante.descripcion}
            </Title>
            <Title style={styles.title2}>
              {item.email} 
            </Title>  
            <Title style={styles.title2}>               
              {item.telefono}
            </Title>          
          </Card.Content>
        </Card>
      </View>
    );
  };

  render() {
    const { loading, error, integrantes } = this.state;

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

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/mecanica-transparente.png")}
          style={styles.backgroundImage}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.autoridades}>
              <Text style={styles.titulo}>
                Integrantes de la Asociación Escuela de Mecánica
              </Text>
            </View>
            {integrantes.map((integrante, index) =>
              this.renderCard({ item: integrante, index })
            )}
            <View style={styles.scrollViewFooter}></View>
          </ScrollView>
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
  loadingContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  autoridades: {
    flex: 1,
    flexDirection: "row",
    marginTop: 12,
    marginLeft: 0,
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
  },
  title: {
    fontSize: 18,
    textAlign: "center",
  },
  title1: {
    fontSize: 14,
    textAlign: "center",    
    fontWeight: "bold",
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
    flexDirection: "column",
  },
  cardContainer: {
    alignSelf: "center",
    paddingTop: 20,
  },
  card: {
    height: 350,
    width: 280,
    paddingTop: 10,
  },
  cardCover: {
    height: 190,
    width: 170,
    alignSelf: "center",
  },
  cardContent: {
    alignSelf: "center",
  },
});

export default Int_Asociacion;
