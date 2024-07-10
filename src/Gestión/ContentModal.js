import React from "react";
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";

const ContentModal = ({ isVisible, onClose, contentText }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={isVisible}
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.contentModalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        <ScrollView>
          <Text style={styles.fullText}>{contentText}</Text>
        </ScrollView>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  contentModalContent: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: "black",
  },
  fullText: {
    fontSize: 16,
    color: "black",
    textAlign: "justify",
    margin: 20,
    backgroundColor: "#f8e4e4",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
});

export default ContentModal;
