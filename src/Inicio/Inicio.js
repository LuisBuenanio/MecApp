import React, { useState } from "react";
import { Text, View, Button } from "react-native";

const App = () => {
  const [text, setText] = useState("INICIO FINAL");

  return (
    <View>
      <Text>{text}</Text>
      <Button title="Change Text" onPress={() => setText("PAGINA DE FINAL INICIO")} />
    </View>
  );
};

export default App;