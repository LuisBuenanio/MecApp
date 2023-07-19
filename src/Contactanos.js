import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions, ScrollView } from "react-native";
import { Appbar, Provider as PaperProvider } from "react-native-paper";
import Communications from "react-native-communications";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Linking } from "react-native"

class Contactanos extends Component{
  render() {
    return (
        <View style={styles.container}>
            <PaperProvider>
                <Appbar.Header style={{ backgroundColor: "#FA370E" }}>
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content title="Contáctanos" />
                    <Appbar.Action icon="phone" onPress={() => { Linking.openURL(`tel:032998200`) }} />
                </Appbar.Header>
                <ScrollView>
                    <MapView
                        style={{ height: 520, width: Dimensions.get("window").width }}
                        initialRegion={{
                          latitude: -1.65830,
                          longitude: -78.67663,
                          latitudeDelta: 0.00922,
                          longitudeDelta: 0.011,
                        }}
                        provider={PROVIDER_GOOGLE}
                    >
                        <Marker
                            coordinate={{
                            latitude: -1.65830,
                            longitude: -78.67663,
                            }}
                            title="Escuela de Ingeniería Mecánica"
                            description="Mecánica / Espoch"
                        />
                        
                    </MapView>
                    <View style={styles.header}>
                        <Text style={styles.titulo}>
                            ESCUELA SUPERIOR POLITÉCNICA DE CHIMBORAZO
                        </Text>
                    </View>
                    <View style={styles.subtitulo}>
                        <Text style={styles.text}>
                            <MaterialCommunityIconsIcon
                                name="directions"
                                size={17}
                                color={"black"}
                            />
                            Dirección: Panamericana Sur Km 1 1/2, Riobamba – Ecuador{"\n"}
                            <MaterialCommunityIconsIcon
                                name="email"
                                size={17}
                                color={"black"}
                            />
                            Email:{" "}
                            <Text
                                style={styles.text_press}
                                onPress={() =>
                                    Communications.email(
                                    ["", "decanatofade.matricula@espoch.edu.ec"],
                                    null,
                                    null,
                                    "",
                                    ""
                                    )
                                }
                            >
                            mecanica.matricula@espoch.edu.ec
                            </Text>{" "}
                            {"\n"}
                            <MaterialCommunityIconsIcon
                                name="phone"
                                size={17}
                                color={"black"}
                            />
                            Tel: +593(03)2998-200
                            {"\n"}
                            <MaterialCommunityIconsIcon
                                name="phone"
                                size={17}
                                color={"black"}
                            />
                            Ext: 3202
                        </Text>                          
                    </View>
                </ScrollView>
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
      padding: 20,
    },
    text: {
      fontSize: 17,
      fontFamily: "antic-slab",
      color: "#4d4d4d",
      textAlign: "justify",
      paddingLeft: 20,
      paddingRight: 20,
    },
    text_press: {
      fontSize: 17,
      fontFamily: "antic-slab",
      color: "#4d4d4d",
      textAlign: "justify",
      textDecorationLine: "underline",
    },
    titulo: {
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 17,
      color: "#344a72",
    },
    subtitulo: {
      paddingTop: 10,
      paddingBottom: 35,
    },
    body: {
      height: 320,
      width: 260,
      paddingTop: 10,
    },
  });


export default Contactanos;
