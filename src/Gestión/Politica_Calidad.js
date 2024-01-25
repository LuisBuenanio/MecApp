import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Dialog, Portal, Card, Title, Button } from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import OcticonsIcon from "react-native-vector-icons/Octicons";
import FoundationIcon from "react-native-vector-icons/Foundation";

class Politica_Calidad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      visible2: false,
      visible3: false,
    };
  }

  _showObjetivos = () => this.setState({ visible: true });
  _hideObjetivos = () => this.setState({ visible: false });
  _showPrincipios = () => this.setState({ visible2: true });
  _hidePrincipios = () => this.setState({ visible2: false });
  _showFines = () => this.setState({ visible3: true });
  _hideFines = () => this.setState({ visible3: false });

  objetivos() {
    return (
      <ScrollView>
        <View>
          <Text style={styles.text}>
            • Lograr una administración moderna y eficiente en el ámbito
            académico, administrativo y de desarrollo institucional.
          </Text>
          <Text style={styles.text}>
            • Establecer en la ESPOCH una organización sistémica, flexible,
            adaptativa y dinámica para responder con oportunidad y eficiencia a
            las expectativas de nuestra sociedad. Desarrollar una cultura
            organizacional integradora y solidaria para facilitar el desarrollo
            individual y colectivo de los politécnicos.
          </Text>
          <Text style={styles.text}>
            • Fortalecer el modelo educativo mediante la consolidación de las
            unidades académicas, procurando una mejor articulación entre las
            funciones universitarias.
          </Text>
          <Text style={styles.text}>
            • Dinamizar la administración institucional mediante la
            desconcentración de funciones y responsabilidades, procurando la
            optimización de los recursos en el marco de la Ley y del Estatuto
            Politécnico. Impulsar la investigación básica y aplicada,
            vinculándola con las otras funciones universitarias y con los
            sectores productivos y sociales.
          </Text>
          <Text style={styles.text}>
            • Promover la generación de bienes y prestación de servicios basados
            en el potencial científico-tecnológico de la ESPOCH.
          </Text>
        </View>
      </ScrollView>
    );
  }

  principios() {
    return (
      <ScrollView>
        <View>
          <Text style={styles.text}>
            • La ESPOCH es una Institución pública que fundamenta su acción en
            los principios de: autonomía, democracia, cogobierno, libertad de
            cátedra e inviolabilidad de sus predios. Estimula el respeto de los
            valores inherentes de la persona, que garantiza la libertad de
            pensamiento, expresión, culto, igualdad, pluralismo, tolerancia,
            espíritu crítico y cumplimiento de las Leyes y normas vigentes.
          </Text>
        </View>
      </ScrollView>
    );
  }

  fines() {
    return (
      <ScrollView>
        <View>
          <Text style={styles.text}>
            • Impartir enseñanza a nivel de pregrado, postgrado y educación
            continua, en ciencia y tecnología, basadas en la investigación y la
            producción de bienes y servicios;
          </Text>
          <Text style={styles.text}>
            • Realizar investigación científica y tecnológica para garantizar la
            generación, asimilación y adaptación de conocimientos que sirvan
            para solucionar los problemas de la sociedad ecuatoriana;
          </Text>
          <Text style={styles.text}>
            • Formar profesionales líderes con sólidos conocimientos
            científicos, tecnológicos, humanísticos; con capacidad de auto
            educarse, de comprender la realidad socioeconómica del país,
            Latinoamérica y el mundo; que cultiven la verdad, la ética, la
            solidaridad; que sean ciudadanos responsables que contribuyan eficaz
            y creativamente al bienestar de la sociedad;
          </Text>
          <Text style={styles.text}>
            • La búsqueda permanente de la excelencia académica a través de la
            práctica de la calidad en todas sus actividades; y,
          </Text>
          <Text style={styles.text}>
            • Fomentar el desarrollo de la cultura nacional y universal para
            fortalecer nuestra identidad nacional y sus valores. Son medios e
            instrumentos para la consecución de sus fines
          </Text>
        </View>
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/mecanica-transparente.png")}
          style={{ flex: 1, flexDirection: "column" }}
        >
          <ScrollView>
            <View style={styles.politicas_calidad}>
              <Text style={styles.titulo}>Políticas de Calidad</Text>
            </View>

            <View
              style={{
                alignSelf: "flex-start",
                paddingTop: 20,
                paddingLeft: 20,
              }}
            >
              <Card
                style={{ height: 140, width: 220 }}
                onPress={() => this._showObjetivos()}
              >
                <Card.Content
                  style={{ height: 100, width: 150, alignSelf: "center" }}
                >
                  <FontAwesome5Icon name="user-check" size={70} />
                </Card.Content>
                <Card.Content style={{ alignSelf: "center" }}>
                  <Title style={{ fontSize: 18, alignSelf: "center" }}>
                    Objetivos Generales
                  </Title>
                </Card.Content>
              </Card>
            </View>

            <View style={{ alignSelf: "center", paddingTop: 20 }}>
              <Card
                style={{ height: 140, width: 220 }}
                onPress={() => this._showPrincipios()}
              >
                <Card.Content
                  style={{ height: 100, width: 140, alignSelf: "center" }}
                >
                  <OcticonsIcon name="checklist" size={80} />
                </Card.Content>
                <Card.Content style={{ alignSelf: "center" }}>
                  <Title style={{ fontSize: 18, alignSelf: "center" }}>
                    Principios
                  </Title>
                </Card.Content>
              </Card>
            </View>

            <View
              style={{
                alignSelf: "flex-end",
                paddingTop: 20,
                paddingRight: 20,
              }}
            >
              <Card
                style={{ height: 140, width: 220 }}
                onPress={() => this._showFines()}
              >
                <Card.Content
                  style={{ height: 100, width: 130, alignSelf: "center" }}
                >
                  <FoundationIcon name="magnifying-glass" size={80} />
                </Card.Content>
                <Card.Content style={{ alignSelf: "center" }}>
                  <Title style={{ fontSize: 18, alignSelf: "center" }}>
                    Fines
                  </Title>
                </Card.Content>
              </Card>
            </View>

            <Portal>
              <Dialog
                visible={this.state.visible}
                onDismiss={this._hideObjetivos}
                style={{ flex: 0.9 }}
              >
                <Dialog.Title style={{ textAlign: "center" }}>
                  Objetivos Generales
                </Dialog.Title>
                <Dialog.ScrollArea>{this.objetivos()}</Dialog.ScrollArea>
                <Dialog.Actions>
                  <Button
                    onPress={this._hideObjetivos}
                    labelStyle={{ color: "#344a72" }}
                  >
                    Cerrar
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>

            <Portal>
              <Dialog
                visible={this.state.visible2}
                onDismiss={this._hidePrincipios}
                style={{ flex: 0.6 }}
              >
                <Dialog.Title style={{ textAlign: "center" }}>
                  Principios
                </Dialog.Title>
                <Dialog.ScrollArea>{this.principios()}</Dialog.ScrollArea>
                <Dialog.Actions>
                  <Button
                    onPress={this._hidePrincipios}
                    labelStyle={{ color: "#344a72" }}
                  >
                    Cerrar
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>

            <Portal>
              <Dialog
                visible={this.state.visible3}
                onDismiss={this._hideFines}
                style={{ flex: 0.9 }}
              >
                <Dialog.Title style={{ textAlign: "center" }}>
                  Fines
                </Dialog.Title>
                <Dialog.ScrollArea>{this.fines()}</Dialog.ScrollArea>
                <Dialog.Actions>
                  <Button
                    onPress={this._hideFines}
                    labelStyle={{ color: "#344a72" }}
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
  politicas_calidad: {
    flex: 1,
    marginTop: 5,
    alignSelf: "center",
  },

  titulo: {
    paddingTop: 20,
    fontWeight: "bold",
    fontSize: 30,
    color: "#344a72",
  },

  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4d4d4d",
    paddingTop: 10,
    paddingLeft: 35,
  },
});

export default Politica_Calidad;