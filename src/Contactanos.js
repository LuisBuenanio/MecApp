import React, { useState } from "react";
import { Text, View, Button } from "react-native";

const App = () => {
  const [text, setText] = useState("RNUEVO TITULO DE CONTACTANOS!");

  return (
    <View>
      <Text>{text}</Text>
      <Button title="Change Text" onPress={() => setText("CONTACTANAOS!")} />
    </View>
  );
};

export default App;