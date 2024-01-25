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

class Int_Asociacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      presidente: null,
      tipo_presidente: null,
      vicepresidente: null,
      tipo_vicepresidente: null,
      tesorero: null,
      tipo_tesorero: null,
      secretario: null,
      tipo_secretario: null,
      dl_pr_fepoch: null,
      tipo_dl_pr_fepoch: null,
      dl_sup_fepoch: null,
      tipo_dl_sup_fepoch: null, 
      ldp_principal: null,
      tipo_ldp_principal: null,
      ldp_suplente: null,
      tipo_ldp_suplente: null,
      inclusion: null,
      tipo_inclusion: null, 
      

      url_presidente: config.API_URL_API + "/integrantes/1",
      url_vicepresidente: config.API_URL_API + "/integrantes/2",
      url_tesorero: config.API_URL_API + "/integrantes/3",
      url_secretario: config.API_URL_API + "/integrantes/4",
      url_dl_pr_fepoch: config.API_URL_API + "/integrantes/5",
      url_dl_sup_fepoch: config.API_URL_API + "/integrantes/6", 
      url_ldp_principal: config.API_URL_API + "/integrantes/7",
      url_ldp_suplente: config.API_URL_API + "/integrantes/8",
      url_inclusion: config.API_URL_API + "/integrantes/9", 

      url_tipo_presidente: config.API_URL_API + "/tipo_integrantes/1",
      url_tipo_vicepresidente: config.API_URL_API + "/tipo_integrantes/2",
      url_tipo_tesorero: config.API_URL_API + "/tipo_integrantes/3",
      url_tipo_secretario: config.API_URL_API + "/tipo_integrantes/4",
      url_tipo_dl_pr_fepoch: config.API_URL_API + "/tipo_integrantes/5",
      url_tipo_dl_sup_fepoch: config.API_URL_API + "/tipo_integrantes/6", 
      url_tipo_ldp_principal: config.API_URL_API + "/tipo_integrantes/7",
      url_tipo_ldp_suplente: config.API_URL_API + "/tipo_integrantes/8",
      url_tipo_inclusion: config.API_URL_API + "/tipo_integrantes/9",
    };
  }

  componentDidMount = () => {
    Promise.all([
      fetch(this.state.url_presidente),
      fetch(this.state.url_vicepresidente),
      fetch(this.state.url_tesorero),
      fetch(this.state.url_secretario),
      fetch(this.state.url_dl_pr_fepoch),
      fetch(this.state.url_dl_sup_fepoch), 
      fetch(this.state.url_ldp_principal),
      fetch(this.state.url_ldp_suplente),
      fetch(this.state.url_inclusion), 

      fetch(this.state.url_tipo_presidente),
      fetch(this.state.url_tipo_vicepresidente),
      fetch(this.state.url_tipo_tesorero),
      fetch(this.state.url_tipo_secretario),
      fetch(this.state.url_tipo_dl_pr_fepoch),
      fetch(this.state.url_tipo_dl_sup_fepoch), 
      fetch(this.state.url_tipo_ldp_principal),
      fetch(this.state.url_tipo_ldp_suplente),
      fetch(this.state.url_tipo_inclusion),
    ])
      .then((values) => {
        return Promise.all(values.map((r) => r.json()));
      })
      .then(
        ([
          presidente,
          vicepresidente,
          tesorero,
          secretario,
          dl_pr_fepoch,
          dl_sup_fepoch, 
          ldp_principal,
          ldp_suplente,
          inclusion,

          tipo_presidente,
          tipo_vicepresidente,
          tipo_tesorero,
          tipo_secretario,
          tipo_dl_pr_fepoch,
          tipo_dl_sup_fepoch, 
          tipo_ldp_principal,
          tipo_ldp_suplente,
          tipo_inclusion, 
        ]) => {
          this.setState({
            presidente: presidente.datos,
            vicepresidente: vicepresidente.datos,
            tesorero: tesorero.datos,
            secretario: secretario.datos,
            dl_pr_fepoch: dl_pr_fepoch.datos,
            dl_sup_fepoch: dl_sup_fepoch.datos, 
            ldp_principal: ldp_principal.datos,
            ldp_suplente: ldp_suplente.datos,
            inclusion: inclusion.datos, 

            tipo_presidente: tipo_presidente.datos,
            tipo_vicepresidente: tipo_vicepresidente.datos,
            tipo_tesorero: tipo_tesorero.datos,
            tipo_secretario: tipo_secretario.datos,
            tipo_dl_pr_fepoch: tipo_dl_pr_fepoch.datos,
            tipo_dl_sup_fepoch: tipo_dl_sup_fepoch.datos,
            tipo_ldp_principal: tipo_ldp_principal.datos,
            tipo_ldp_suplente: tipo_ldp_suplente.datos,
            tipo_inclusion: tipo_inclusion.datos, 
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
                <Text style={styles.titulo}>Integrantes Asociación Escuela de Mecánica</Text>
              </View>

              <View style={{ alignSelf: "center", paddingTop: 20 }}>
                <Card style={{ height: 270, width: 260, paddingTop: 10 }}>
                  <Card.Cover
                    style={{ height: 190, width: 170, alignSelf: "center" }}
                    source={{
                      uri:
                      config.API_URL_INT_ASOC +
                        "/" +
                        this.state.presidente.foto,
                    }}
                  />
                  <Card.Content style={{ alignSelf: "center" }}>
                    <Paragraph
                      style={{ fontSize: 16,
                        textAlign: "center", fontFamily: "antic-slab" }}
                    >
                      {this.state.presidente.nombre}
                    </Paragraph>
                    <Title style={{ fontSize: 18, alignSelf: "center" }}>
                      {this.state.tipo_presidente.descripcion}
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
                      config.API_URL_INT_ASOC +
                        "/" +
                        this.state.vicepresidente.foto,
                    }}
                  />
                  <Card.Content style={{ alignSelf: "center" }}>
                    <Paragraph
                      style={{ fontSize: 16, 
                        textAlign: "center", fontFamily: "antic-slab" }}
                    >
                      {this.state.vicepresidente.nombre}
                    </Paragraph>
                    <Title style={{ fontSize: 18, alignSelf: "center" }}>
                      {this.state.tipo_vicepresidente.descripcion}
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
                      config.API_URL_INT_ASOC +
                        "/" +
                        this.state.tesorero.foto,
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
                      {this.state.tesorero.nombre}
                    </Paragraph>
                    <Title style={{ fontSize: 18, textAlign: "center" }}>
                      {this.state.tipo_tesorero.descripcion}
                    </Title>
                  </Card.Content>
                </Card>
              </View>

              <View style={{ alignSelf: "center", paddingTop: 30 }}>
                <Card style={{ height: 310, width: 260, paddingTop: 10 }}>
                  <Card.Cover
                    style={{ height: 170, width: 140, alignSelf: "center" }}
                    source={{
                      uri:
                      config.API_URL_INT_ASOC +
                        "/" +
                        this.state.secretario.foto,
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
                      {this.state.secretario.nombre}
                    </Paragraph>
                    <Title style={{ fontSize: 18, textAlign: "center" }}>
                      {this.state.tipo_secretario.descripcion}
                    </Title>
                  </Card.Content>
                </Card>
              </View>

              <View style={{ alignSelf: "center", paddingTop: 30 }}>
                <Card style={{ height: 310, width: 260, paddingTop: 10 }}>
                  <Card.Cover
                    style={{ height: 190, width: 170, alignSelf: "center" }}
                    source={{
                      uri:
                      config.API_URL_INT_ASOC +
                        "/" +
                        this.state.dl_pr_fepoch.foto,
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
                      {this.state.dl_pr_fepoch.nombre}
                    </Paragraph>
                    <Title style={{ fontSize: 18, textAlign: "center" }}>
                      {this.state.tipo_dl_pr_fepoch.descripcion}
                    </Title>
                  </Card.Content>
                </Card>
              </View>   
              <View style={{ alignSelf: "center", paddingTop: 30 }}>
                <Card style={{ height: 310, width: 260, paddingTop: 10 }}>
                  <Card.Cover
                    style={{ height: 190, width: 170, alignSelf: "center" }}
                    source={{
                      uri:
                      config.API_URL_INT_ASOC +
                        "/" +
                        this.state.dl_sup_fepoch.foto,
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
                      {this.state.dl_sup_fepoch.nombre}
                    </Paragraph>
                    <Title style={{ fontSize: 18, textAlign: "center" }}>
                      {this.state.tipo_dl_sup_fepoch.descripcion}
                    </Title>
                  </Card.Content>
                </Card>
              </View>  

              <View style={{ alignSelf: "center", paddingTop: 30 }}>
                <Card style={{ height: 310, width: 260, paddingTop: 10 }}>
                  <Card.Cover
                    style={{ height: 190, width: 170, alignSelf: "center" }}
                    source={{
                      uri:
                      config.API_URL_INT_ASOC +
                        "/" +
                        this.state.ldp_principal.foto,
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
                      {this.state.ldp_principal.nombre}
                    </Paragraph>
                    <Title style={{ fontSize: 18, textAlign: "center" }}>
                      {this.state.tipo_ldp_principal.descripcion}
                    </Title>
                  </Card.Content>
                </Card>
              </View> 
                  
              <View style={{ alignSelf: "center", paddingTop: 30 }}>
                <Card style={{ height: 310, width: 260, paddingTop: 10 }}>
                  <Card.Cover
                    style={{ height: 190, width: 170, alignSelf: "center" }}
                    source={{
                      uri:
                      config.API_URL_INT_ASOC +
                        "/" +
                        this.state.ldp_suplente.foto,
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
                      {this.state.ldp_suplente.nombre}
                    </Paragraph>
                    <Title style={{ fontSize: 18, textAlign: "center" }}>
                      {this.state.tipo_ldp_suplente.descripcion}
                    </Title>
                  </Card.Content>
                </Card>
              </View> 

              <View style={{ alignSelf: "center", paddingTop: 30, paddingBottom:30, }}>
                <Card style={{ height: 330, width: 260, paddingTop: 10 }}>
                  <Card.Cover
                    style={{ height: 190, width: 170, alignSelf: "center" }}
                    source={{
                      uri:
                      config.API_URL_INT_ASOC +
                        "/" +
                        this.state.inclusion.foto,
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
                      {this.state.inclusion.nombre}
                    </Paragraph>
                    <Title style={{ fontSize: 18, textAlign: "center" }}>
                      {this.state.tipo_inclusion.descripcion}
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
    paddingRight: 5,
    fontWeight: "bold",
    fontSize: 25,
    color: "#344a72",
    textAlign: "center",
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

export default Int_Asociacion;
