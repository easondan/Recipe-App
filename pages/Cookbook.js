import React, { useState } from "react";
import { View, Modal, StyleSheet } from "react-native";
import ActionButton from "../components/ActionButton";
import CookbookModal from "../components/CookbookModal";

const Cookbook= () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <CookbookModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </Modal>
      <ActionButton onPress={() => setModalVisible(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Cookbook;
