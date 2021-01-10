import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import mapMarker from "../../../assets/marker.png";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import SearchIcon from "../../../assets/search.svg";
import {
  Container,
  LocationInput,
  LocationArea,
  SearchButton,
  HeaderTitle,
  HeaderArea,
} from "./styles";
import api from "../../services/api";

export default function EstablishmentMap() {
  const [establishments, setEstablishment] = useState([]);
  const [location, setLocation] = useState({
    latitude: -23.6112837,
    longitude: -46.5986632,
  });
  const navigation = useNavigation();
  const [visible, setVisible] = useState(true);

  useFocusEffect(() => {
    api.get("establishment").then((response) => {
      setEstablishment(response.data);
    });
  });

  function handlerNavigateToEstablishmentDetails(id: number) {
    navigation.navigate("EstablishmentDetails", { id });
  }

  return (
    <View style={styles.container}>
      <HeaderArea>
        <HeaderTitle>Cidade Nova Heliópolis</HeaderTitle>
      </HeaderArea>
      <LocationArea>
        <LocationInput placeholder="Procurar" placeholderTextColor="#7e8389" />
        <SearchButton onPress={() => navigation.navigate("Search")}>
          <SearchIcon width="26" height="26" fill="#7E8389" />
        </SearchButton>
      </LocationArea>
      {location.longitude !== 0 ? (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: -23.6112837,
            longitude: -46.5986632,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
        >
          {establishments.map((establishment) => {
            return (
              <Marker
                key={establishment.id}
                icon={mapMarker}
                calloutAnchor={{ x: 2.7, y: 0.8 }}
                coordinate={{
                  latitude: establishment.latitude,
                  longitude: establishment.longitude,
                }}
              >
                <Callout
                  tooltip
                  onPress={() =>
                    handlerNavigateToEstablishmentDetails(establishment.id)
                  }
                >
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>{establishment.name}</Text>
                  </View>
                </Callout>
              </Marker>
            );
          })}
        </MapView>
      ) : (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0089a5" />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#4DA384",
  },
  map: {
    top: 15,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255,255, 0.8)",
    borderRadius: 16,
    justifyContent: "center",
  },
  calloutText: {
    color: "#4DA397",
    fontSize: 14,
  },
  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: "#fff",
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },
  footerText: {
    color: "#8fa7b3",
    fontWeight: "bold",
  },
  horizontal: {
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
