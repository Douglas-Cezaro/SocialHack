import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import MapView, { MapEvent, Marker } from "react-native-maps";
import { HeaderTitle, HeaderArea } from "../styles";
import mapMarkerImg from "../../../../assets/marker.png";

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  function handleNextStep() {
    navigation.navigate("EstablishmentCreate", { position });
  }
  function handlerSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }
  return (
    <View style={styles.container}>
      <HeaderArea>
        <HeaderTitle>Selecione o local no Mapa</HeaderTitle>
      </HeaderArea>
      <MapView
        initialRegion={{
          latitude: -23.6112837,
          longitude: -46.5986632,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handlerSelectMapPosition}
      >
        {position.latitude !== 0 && (
          <Marker
            icon={mapMarkerImg}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          />
        )}
      </MapView>
      {position.latitude !== 0 && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4DA384",
    position: "relative",
  },

  mapStyle: {
    top: 30,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  nextButton: {
    backgroundColor: "#4DA384",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 56,

    position: "absolute",
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#FFF",
  },
});
