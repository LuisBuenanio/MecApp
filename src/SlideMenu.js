import React from "react";
import Index from "./Index";
import Acerca_de from "./Acerca_de";
import Contactanos from "./Contactanos";

export const InicioScreen = ({ navigation }) =>{
  return (
    <Index navigation={navigation} name="Inicio" />
  );
}

export const AcercadeScreen = ({ navigation }) => {
  return (
    <Acerca_de navigation={navigation} name="Acerca_de" />
  );
}
export const ContactanosScreen = ({ navigation }) => {
  return (
    <Contactanos navigation={navigation} name="Contactanos" />
  );
}