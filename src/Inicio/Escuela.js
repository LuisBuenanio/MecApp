import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { 
  Dialog, 
  Portal, 
  Card, 
  Title, 
  Button 
} from "react-native-paper";

import Communications from "react-native-communications";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import OcticonsIcon from "react-native-vector-icons/Octicons";
import FoundationIcon from "react-native-vector-icons/Foundation";
import config from "../../config";


class Escuela extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      escuela: null,
      url_escuela: config.API_URL_API + "/escuelas/1",

    
      visible_inf_general_escuela: false,
      visible_mis_vis_escuela: false,
      visible_campo_perfil_escuela: false, 
    };
  }

  _showInf_General_Escuela = () => this.setState({ visible_inf_general_escuela: true });
  _hideInf_General_Escuela = () => this.setState({ visible_inf_general_escuela: false });
  _showMis_Vis_Escuela = () => this.setState({ visible_mis_vis_escuela: true });
  _hideMis_Vis_Escuela = () => this.setState({ visible_mis_vis_escuela: false });
  _showCampo_Perfil_Escuela = () => this.setState({ visible_campo_perfil_escuela: true });
  _hideCampo_Perfil_Escuela = () => this.setState({ visible_campo_perfil_escuela: false });
 
  componentDidMount = () => {
    Promise.all([
      fetch(this.state.url_escuela),
    ])
      .then((values) => {
        return Promise.all(values.map((r) => r.json()));
      })
      .then(([esc]) => {
        this.setState({
          escuela: esc.datos,
          loading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

inf_general_escuela() {
    return (
      <ScrollView>
        <View>
          <Text style={styles.subtitulo}>Modalidad de Estudio</Text>
          <Text style={styles.text}>
            {this.state.escuela.modalidad}
          </Text>
        </View>
        <View>
          <Text style={styles.subtitulo}>Duración de la Carrera</Text>
          <Text style={styles.text}>
            {this.state.escuela.duracion} semestres
          </Text>
        </View>
        <View>
          <Text style={styles.subtitulo}>Título que Otorga</Text>
          <Text style={styles.text}>{this.state.escuela.titulo}</Text>
        </View>
        <View>
          <Text style={styles.subtitulo}>Malla Curricular</Text>
          <TouchableOpacity
            onPress={() =>
              Communications.web(
                urls.API_URL_PDF + "/" + this.state.escuela.malla
              )
            }
          >
            <Text style={styles.text_press}>
              {this.state.escuela.malla}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  mis_vis_escuela() {
    return (
      <ScrollView>
        <View>
          <Text style={styles.subtitulo}>Misión</Text>
          <Text style={styles.text_mis_vis}>
            {this.state.escuela.mision}
          </Text>
        </View>
        <View>
          <Text style={styles.subtitulo}>Visión</Text>
          <Text style={styles.text_mis_vis}>
            {this.state.escuela.vision}
          </Text>
        </View>
      </ScrollView>
    );
  }

  campo_perfil_escuela() {
    return (
      <ScrollView>
        <View>
          <Text style={styles.subtitulo}>Campo Profesional</Text>
          <Text style={styles.text}>
            {this.state.escuela.campo}
          </Text>
        </View>
        <View>
        <Text style={styles.subtitulo}>Perfil Profesional</Text>
          <Text style={styles.text}>
            {this.state.escuela.perfil}
          </Text>
        </View>
      </ScrollView>
    );
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
              <Text style={styles.titulo}>Escuela de Ingeniería Mecánica</Text>
            </View>

            <View
              style={{
                alignSelf: "flex-start",
                paddingTop: 5,
                paddingLeft: 10,
              }}
            >
              <Card
                style={{ height: 150, width: 200 }}
                onPress={() => this._showInf_General_Escuela()}
              >
                <Card.Content
                  style={{ height: 80, width: 130, alignSelf: "center" }}
                >
                  <FontAwesome5Icon name="user-check" size={60} />
                </Card.Content>
                <Card.Content style={{ alignSelf: "center" }}>
                  <Title style={{ fontSize: 18, alignSelf: "center" }}>
                    Información General
                  </Title>
                </Card.Content>
              </Card>
            </View>

            <View style={{ alignSelf: "center", paddingTop: 20 }}>
              <Card
                style={{ height: 150, width: 180, alignSelf: "center" }}
                onPress={() => this._showMis_Vis_Escuela()}
              >
                <Card.Content
                  style={{ height: 80, width: 130, alignSelf: "center" }}
                >
                  <OcticonsIcon name="checklist" size={60} />
                </Card.Content>
                <Card.Content style={{ alignSelf: "center" }}>
                  <Title style={{ fontSize: 18, alignSelf: "center" }}>
                    Misión/Visión
                  </Title>
                </Card.Content>
              </Card>
            </View>

            <View
              style={{
                alignSelf: "flex-end",
                paddingTop: 20,
                paddingRight: 20,              
                paddingBottom: 30,
              }}
            >
              <Card
                style={{ height: 150, width: 150}}
                onPress={() => this._showCampo_Perfil_Escuela()}
              >
                <Card.Content
                  style={{ height: 90, width: 130, alignSelf: "center" }}
                >
                  <FoundationIcon name="magnifying-glass" size={80} />
                </Card.Content>
                <Card.Content style={{ alignSelf: "center",  }}>
                  <Title style={{ fontSize: 18, alignSelf: "center"}}>
                    Campo/Perfil
                  </Title>
                </Card.Content>
              </Card>
            </View>

            <Portal>
              <Dialog
                visible={this.state.visible_inf_general_escuela}
                onDismiss={this._hideInf_General_Escuela}
                style={{ flex: 0.8 }}
              >
                <Dialog.Title style={{ textAlign: "center" }}>
                  Información General
                </Dialog.Title>
                <Dialog.ScrollArea>{this.inf_general_escuela()}</Dialog.ScrollArea>
                <Dialog.Actions>
                  <Button
                    onPress={this._hideInf_General_Escuela}
                    labelStyle={{ color: "#A64231" }}
                  >
                    Cerrar
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>

            <Portal>
              <Dialog
                visible={this.state.visible_mis_vis_escuela}
                onDismiss={this._hideMis_Vis_Escuela}
                style={{ flex: 0.9 }}
              >
                <Dialog.Title style={{ textAlign: "center" }}>
                  Misión/Visión
                </Dialog.Title>
                <Dialog.ScrollArea>{this.mis_vis_escuela()}</Dialog.ScrollArea>
                <Dialog.Actions>
                  <Button
                    onPress={this._hideMis_Vis_Escuela}
                    labelStyle={{ color: "#A64231" }}

                  >
                    Cerrar
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>

            <Portal>
              <Dialog
                visible={this.state.visible_campo_perfil_escuela}
                onDismiss={this._hideCampo_Perfil_Escuela}
                style={{ flex: 0.7 }}
              >
                <Dialog.Title style={{ textAlign: "center",  }}>
                  Campo/Perfil Profesional
                </Dialog.Title>
                <Dialog.ScrollArea>{this.campo_perfil_escuela()}</Dialog.ScrollArea>
                <Dialog.Actions>
                  <Button
                    onPress={this._hideCampo_Perfil_Escuela}
                    labelStyle={{ color: "#A64231" }}
                  >
                    Cerrar
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }else {
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
  text: {
    fontSize: 17,
    fontFamily: "antic-slab",
    color: "#4d4d4d",
    textAlign: "justify",
    paddingTop: 14,
    paddingLeft: 5,
    paddingRight: 25,
  },
  text_press: {
    fontSize: 17,
    fontFamily: "antic-slab",
    color: "#4d4d4d",
    textAlign: "center",
    textDecorationLine: "underline",
    paddingTop: 14,
    paddingLeft: 5,
    paddingRight: 25,
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

  encabezado: {
    flex: 1,
    alignSelf: "center",    
    paddingBottom: 0,
    paddingTop: 1,
  },

  titulo: {
    paddingTop: 20,
    fontWeight: "bold",
    fontSize: 30,
    color: "#344a72",
    textAlign: "center",
  },
  
  subtitulo: {
    paddingTop: 15,
    fontWeight: "bold",
    fontSize: 20,
    color: "#4d4d4d",
  },

  subtitulo2: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4d4d4d",
    paddingTop: 10,
    paddingLeft: 35,
  },
});

export default Escuela;