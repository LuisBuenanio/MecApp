import React, { useState } from "react";
import { Text, View, Button } from "react-native";

const App = () => {
  const [text, setText] = useState("INTEGRANTES ASOCIASION");

  return (
    <View>
      <Text>{text}</Text>
      <Button title="Change Text" onPress={() => setText("INTEGRANTES ASOCIACIONAUTORIDADES")} />
    </View>
  );
};

export default App;