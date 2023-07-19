import React, { Component } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import {
  Appbar,
  Provider as PaperProvider,
  Chip,
  Divider,
} from "react-native-paper";
import Communications from "react-native-communications";

class Acerca_de extends Component {
  render() {
    return (
      <View style={styles.container}>
        <PaperProvider>
          <Appbar.Header style={{ backgroundColor: "#FA370E" }}>
            <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
            <Appbar.Content title="Acerca de MecApp" />
          </Appbar.Header>

          <ScrollView>
            <View style={styles.header}>
              <Text style={styles.titulo}>MecApp</Text>
              <Text style={styles.subtitulo}>Versión 1.0.1</Text>
              <Image
                /* source={{ uri: config.API_URL_LOG + "/logo-fade-color.png" }} */

                source={require("../assets/logo-mecanica-color.png")}
                style={styles.logo}
              />
            </View>

            <View>
              <Text style={styles.text}>
                La Escuela de Ingeniería Mecánica es una unidad académica de la
                Escuela Superior Politécnica de Chimborazo; en la actualidad se
                encuentra en la implantación de su modelo de gestión aplicando
                conceptos tecnológicos para el mejor desenvolvimiento de
                actividades académicas.
              </Text>
            </View>
            <View>
              <Text style={styles.text}>
                La aplicación MecApp, cumple el objetivo de acercar a la escuela
                a todas sus partes interesadas y establecer un nexo de
                comunicación alineado a las nuevas herramientas tecnológicas
                para satisfacer todos los requerimientos de información, así
                como comunicar las noticias, actividades desarrolladas, oferta
                académicas, y toda la información que se genera.{" "}
              </Text>
            </View>
            <View>
              <Text style={styles.text}>
                La aplicación MecApp ha sido desarrollado con el fin de mejorar
                el proceso comunicativo entre los miembros de la carrera.
                Aportando a la innovación y los planes de mejora existentes en
                la Escuela de Ingeniería Mecánica de la ESPOCH.{" "}
              </Text>
            </View>
          </ScrollView>
          <Divider />
          <View style={styles.footer1}>
            <Chip
              style={{ backgroundColor: "#f7faff", marginTop: 8 }}
              textStyle={{ fontSize: 13 }}
              height={34}
              width={110}
              mode="outlined"
              icon="facebook"
              selected={true}
              selectedColor="#3b5998"
              onPress={() =>
                Communications.web(
                  "https://www.facebook.com/FacultadMecanicaEspoch"
                )
              }
            >
              F. Mecánica
            </Chip>
            <Chip
              style={{
                backgroundColor: "#FAE8E6",
                marginTop: 8,
                marginLeft: 10,
              }}
              textStyle={{ fontSize: 13 }}
              height={34}
              width={110}
              mode="outlined"
              icon="web"
              selected={true}
              selectedColor="#CA5050"
              onPress={() => Communications.web("http://100.25.182.199")}
            >
              Portal WEB
            </Chip>
            <Chip
              style={{
                backgroundColor: "#e6f8fa",
                marginTop: 8,
                marginLeft: 10,
              }}
              textStyle={{ fontSize: 13 }}
              height={34}
              width={100}
              mode="outlined"
              icon="twitter"
              selected={true}
              selectedColor="#00acee"
              onPress={() =>
                Communications.web("https://twitter.com/facmecaniespoch")
              }
            >
              Mecánica
            </Chip>
          </View>
          <View style={styles.footer2}>
            <Chip
              style={{
                backgroundColor: "#f7faff",
                marginTop: 8,
                marginLeft: 0,
              }}
              textStyle={{ fontSize: 13 }}
              height={34}
              width={100}
              mode="outlined"
              icon="facebook"
              selected={true}
              selectedColor="#3b5998"
              onPress={() =>
                Communications.web(
                  "https://www.facebook.com/CarreraMecanica2021"
                )
              }
            >
              Mecánica
            </Chip>
            <Chip
              style={{
                backgroundColor: "#fff3f8",
                marginTop: 10,
                marginLeft: 40,
              }}
              textStyle={{ fontSize: 13 }}
              height={34}
              width={100}
              mode="outlined"
              icon="instagram"
              selected={true}
              selectedColor="#C13584"
              onPress={() =>
                Communications.web(
                  "http://ec2-100-25-182-199.compute-1.amazonaws.com/"
                )
              }
            >
              Mecánica
            </Chip>
          </View>
          <View>
            <Text style={styles.autor}>@ESPOCH J.L. Buenaño - EIS</Text>
          </View>
        </PaperProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  header: {
    alignItems: "center",
    paddingTop: 20,
  },
  text: {
    fontSize: 18,
    fontFamily: "antic-slab",
    color: "#4d4d4d",
    textAlign: "justify",
    paddingTop: 20,
    paddingLeft: 35,
    paddingRight: 35,
  },
  autor: {
    fontSize: 11,
    fontFamily: "antic-slab",
    color: "#4d4d4d",
    textAlign: "center",
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#4d4d4d",
  },
  subtitulo: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#4d4d4d",
    paddingBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  footer: {
    alignSelf: "center",
  },
  footer1: {
    flexDirection: "row",
    alignSelf: "center",
  },
  footer2: {
    flexDirection: "row",
    alignSelf: "center",
  },
  footer3: {
    alignSelf: "center",
    paddingBottom: 30,
  },

  /*Falta el autor y  el texto /*/
});
export default Acerca_de;
