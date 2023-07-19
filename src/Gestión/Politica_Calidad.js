import React, { useState } from "react";
import { Text, View, Button } from "react-native";

const App = () => {
  const [text, setText] = useState("POLITICA DE CALIDAD");

  return (
    <View>
      <Text>{text}</Text>
      <Button title="Change Text" onPress={() => setText("PAGINA DE POLITICA DE CALIDAD")} />
    </View>
  );
};

export default App;