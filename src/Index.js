import React, { useState } from "react";
import { Text, View, Button } from "react-native";

const App = () => {
  const [text, setText] = useState("React Native is a great framework!");

  return (
    <View>
      <Text>{text}</Text>
      <Button title="Change Text" onPress={() => setText("React Native is even better now!")} />
    </View>
  );
};

export default App;