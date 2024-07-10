import React from "react";
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Button } from "react-native-paper";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from 'expo-file-system';

const ImageModal = ({ isVisible, onClose, selectedImage }) => {
  const saveImage = async () => {
    if (selectedImage) {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        try {
          // Download the image to a local file
          const fileUri = FileSystem.documentDirectory + selectedImage.split('/').pop();
          const downloadResumable = FileSystem.createDownloadResumable(
            selectedImage,
            fileUri
          );
          const { uri } = await downloadResumable.downloadAsync();
          
          // Save the image to the media library
          const asset = await MediaLibrary.createAssetAsync(uri);
          await MediaLibrary.createAlbumAsync("MecApp", asset, false);
          alert("Imagen guardada en el dispositivo.");
        } catch (error) {
          console.error("Error saving image:", error);
          alert("Error al guardar la imagen.");
        }
      } else {
        alert("Permiso denegado para guardar la imagen.");
      }
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.imageModalContent}>
              <Image source={{ uri: selectedImage }} style={styles.fullImage} />
              <Button mode="contained" onPress={saveImage} style={styles.downloadButton}>
                Descargar
              </Button>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  imageModalContent: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  fullImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginVertical: 10,
  },
  downloadButton: {
    marginTop: 10,
  },
});

export default ImageModal;
