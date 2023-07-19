import React, { useState } from "react";
import { Text, View, Button } from "react-native";

const App = () => {
  const [text, setText] = useState("NOTICIAS");

  return (
    <View>
      <Text>{text}</Text>
      <Button title="Change Text" onPress={() => setText("PAGINA DE NOTICIAS")} />
    </View>
  );
};

export default App;