import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

const NewsItem = ({ item, onImagePress, onReadMorePress }) => (
  <View style={styles.newsItem}>
    <Text style={styles.newsTitle}>{item.titulo}</Text>

    {item.portada && (
      <TouchableOpacity onPress={() => onImagePress(item.portada)}>
        <Image source={{ uri: item.portada }} style={styles.portada} />
      </TouchableOpacity>
    )}

    <Text style={styles.newsEntradilla}>{item.entradilla}</Text>

    {item.imagenes && item.imagenes.length > 0 && (
      <FlatList
        horizontal
        data={item.imagenes}
        renderItem={({ item: imagen }) => (
          <TouchableOpacity onPress={() => onImagePress(imagen)}>
            <Image source={{ uri: imagen }} style={styles.thumbnail} />
          </TouchableOpacity>
        )}
        keyExtractor={(imagen, index) => index.toString()}
      />
    )}

    <TouchableOpacity onPress={() => onReadMorePress(item.contenido)}>
      <Text style={styles.readMore}>Leer más</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  newsItem: {
    marginBottom: 20,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  portada: {
    width: "100%",
    height: 300,
    alignSelf: "center",
  },
  newsEntradilla: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 10,
    alignSelf: "center",
  },
  readMore: {
    fontSize: 14,
    color: "blue",
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});

export default NewsItem;
