import React, { useState } from "react";
import { Text, View, Button } from "react-native";

const App = () => {
  const [text, setText] = useState("ASOCIACION");

  return (
    <View>
      <Text>{text}</Text>
      <Button title="Change Text" onPress={() => setText("PAGINA DE ASOCIACION")} />
    </View>
  );
};

export default App;