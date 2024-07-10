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
  Title,
  Paragraph,
} from "react-native-paper";
import config from "../../config";

class Autoridades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      decana: null,
      tipo_decana: null,
      vicedecano: null,
      tipo_vicedecano: null,
      mecanica: null,
      tipo_mecanica: null,
      industrial: null,
      tipo_industrial: null,
      automotriz: null,
      tipo_automotriz: null,
      

      url_decana: config.API_URL_API + "/autoridades/1",
      url_vicedecano: config.API_URL_API + "/autoridades/2",
      url_mecanica: config.API_URL_API + "/autoridades/3",
      url_industrial: config.API_URL_API + "/autoridades/4",
      url_automotriz: config.API_URL_API + "/autoridades/5",


      url_tipo_decana: config.API_URL_API + "/tipo_autoridades/1",
      url_tipo_vicedecano: config.API_URL_API + "/tipo_autoridades/2",
      url_tipo_mecanica: config.API_URL_API + "/tipo_autoridades/3",
      url_tipo_industrial: config.API_URL_API + "/tipo_autoridades/4",
      url_tipo_automotriz: config.API_URL_API + "/tipo_autoridades/5",
    };
  }

  componentDidMount = () => {
    Promise.all([
      fetch(this.state.url_decana),
      fetch(this.state.url_vicedecano),
      fetch(this.state.url_mecanica),
      fetch(this.state.url_industrial),
      fetch(this.state.url_automotriz),

      fetch(this.state.url_tipo_decana),
      fetch(this.state.url_tipo_vicedecano),
      fetch(this.state.url_tipo_mecanica),
      fetch(this.state.url_tipo_industrial),
      fetch(this.state.url_tipo_automotriz),
    ])
      .then((values) => {
        return Promise.all(values.map((r) => r.json()));
      })
      .then(
        ([
          dec,
          vice,
          mec,
          ind,
          auto,

          tipo_dec,
          tipo_vice,
          tipo_mec,
          tipo_ind,
          tipo_auto,
        ]) => {
          this.setState({
            decana: dec.datos,
            vicedecano: vice.datos,
            mecanica: mec.datos,
            industrial: ind.datos,
            automotriz: auto.datos,

            tipo_decana: tipo_dec.datos,
            tipo_vicedecano: tipo_vice.datos,
            tipo_mecanica: tipo_mec.datos,
            tipo_industrial: tipo_ind.datos,
            tipo_automotriz: tipo_auto.datos,
            loading: false,
          });
        }
      )
      .catch((error) => {
        console.error(error);
      });
  };

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
              <View style={styles.autoridades}>
                <Text style={styles.titulo}>Autoridades</Text>
              </View>

              <View style={{ alignSelf: "center", paddingTop: 20 }}>
                <Card style={{ height: 270, width: 260, paddingTop: 10 }}>
                  <Card.Cover
                    style={{ height: 190, width: 170, alignSelf: "center" }}
                    source={{
                      uri:
                      config.API_URL_AUT +
                        "/" +
                        this.state.decana.foto,
                    }}
                  />
                  <Card.Content style={{ alignSelf: "center" }}>
                    <Paragraph
                      style={{ fontSize: 16,
                        textAlign: "center", fontFamily: "antic-slab" }}
                    >
                      {this.state.decana.nombre}
                    </Paragraph>
                    <Title style={{ fontSize: 18, alignSelf: "center" }}>
                      {this.state.tipo_decana.descripcion}
                    </Title>
                  </Card.Content>
                </Card>
              </View>

              <View style={{ alignSelf: "center", paddingTop: 30 }}>
                <Card style={{ height: 270, width: 260, paddingTop: 10 }}>
                  <Card.Cover
                    style={{ height: 190, width: 170, alignSelf: "center" }}
                    source={{
                      uri:
                      config.API_URL_AUT +
                        "/" +
                        this.state.vicedecano.foto,
                    }}
                  />
                  <Card.Content style={{ alignSelf: "center" }}>
                    <Paragraph
                      style={{ fontSize: 16, 
                        textAlign: "center", fontFamily: "antic-slab" }}
                    >
                      {this.state.vicedecano.nombre}
                    </Paragraph>
                    <Title style={{ fontSize: 18, alignSelf: "center" }}>
                      {this.state.tipo_vicedecano.descripcion}
                    </Title>
                  </Card.Content>
                </Card>
              </View>

              <View style={{ alignSelf: "center", paddingTop: 30 }}>
                <Card style={{ height: 320, width: 260, paddingTop: 10 }}>
                  <Card.Cover
                    style={{ height: 190, width: 170, alignSelf: "center" }}
                    source={{
                      uri:
                      config.API_URL_AUT +
                        "/" +
                        this.state.mecanica.foto,
                    }}
                  />
                  <Card.Content style={{ alignSelf: "center" }}>
                    <Paragraph
                      style={{
                        fontSize: 16,
                        textAlign: "center",
                        fontFamily: "antic-slab",
                      }}
                    >
                      {this.state.mecanica.nombre}
                    </Paragraph>
                    <Title style={{ fontSize: 18, textAlign: "center" }}>
                      {this.state.tipo_mecanica.descripcion}
                    </Title>
                  </Card.Content>
                </Card>
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
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 0,
    flexDirection: "column",
  },
  text3: {
    fontSize: 18,
    color: "#758eba",
    textAlign: "justify",
    paddingTop: 20,
    paddingLeft: 7,
    paddingRight: 7,
  },
  autoridades: {
    flex: 1,
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 5,
    alignSelf: "center",
  },

  titulo: {
    paddingTop: 15,
    fontWeight: "bold",
    fontSize: 25,
    color: "#344a72",
  },
  text_press: {
    fontSize: 25,
    fontFamily: "antic-slab",
    color: "#4d4d4d",
    textAlign: "center",
    textDecorationLine: "underline",
    paddingTop: 14,
    paddingLeft: 5,
    paddingRight: 25,
  },
});

export default Autoridades;
