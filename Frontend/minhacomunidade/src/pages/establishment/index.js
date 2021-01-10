import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import Swiper from "react-native-swiper";
import { RectButton } from "react-native-gesture-handler";
import {
  FakeSwiper,
  SwipeDot,
  SwipeDotActive,
  SwipeItem,
  SwipeImage,
  TestimonialArea,
  TestimonialItem,
  TestimonialInfo,
  TestimonialName,
  TestimonialBody,
} from "./styles";
import MapView, { Marker } from "react-native-maps";
import { Feather } from "@expo/vector-icons";

import mapMarkerImg from "../../../assets/marker.png";
import NavPrevIcon from "../../../assets/nav_prev.svg";
import NavNextIcon from "../../../assets/nav_next.svg";
import { useRoute } from "@react-navigation/native";
import api from "../../services/api";
import Loading from "../../components/Loading";
import Stars from "../../components/Stars";

export default function EstablishmentDetails() {
  const route = useRoute();
  const params = route.params;
  const [establishment, setEstablishment] = useState();
  const [testimonials, setTestimonials] = useState();
  const [rating, setRating] = useState();
  useEffect(() => {
    api.get(`establishment/${params.id}`).then((response) => {
      setEstablishment(response.data);
    });
    api.get(`rating/${params.id}`).then((response) => {
      setTestimonials(response.data);
    });
    api.get(`establishment/ratings/${params.id}`).then((response) => {
      setRating(response.data);
    });
  }, []);

  if (!establishment && !rating) {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }
  function handlerOpenGoogleMapRoutes() {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${establishment?.latitude},${establishment?.longitude} `
    );
  }

  return (
    <ScrollView style={styles.container}>
      {establishment.images && establishment.images.length > 0 ? (
        <Swiper
          style={{ height: 240 }}
          dot={<SwipeDot />}
          activeDot={<SwipeDotActive />}
          paginationStyle={{ top: null, right: 15, bottom: 10, left: null }}
          autoplay={true}
        >
          {establishment.images.map((item, key) => (
            <SwipeItem key={key}>
              <SwipeImage source={{ uri: item.url }}></SwipeImage>
            </SwipeItem>
          ))}
        </Swiper>
      ) : (
        <FakeSwiper></FakeSwiper>
      )}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{establishment.name}</Text>
        <Stars stars={rating} showNumber={true}></Stars>
        <Text style={styles.description}>{establishment.about}</Text>

        <View style={styles.mapContainer}>
          <MapView
            initialRegion={{
              latitude: establishment.latitude,
              longitude: establishment.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker
              icon={mapMarkerImg}
              coordinate={{
                latitude: establishment.latitude,
                longitude: establishment.longitude,
              }}
            />
          </MapView>

          <TouchableOpacity
            style={styles.routesContainer}
            onPress={handlerOpenGoogleMapRoutes}
          >
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <Text style={styles.title}>Instruções</Text>

        <Text style={styles.description}>{establishment.instructions}</Text>
        <View style={styles.separator} />
        <Text style={styles.title}>Contato</Text>

        <Text style={styles.description}>{establishment.contact}</Text>

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>
              Segunda à Sexta {establishment.opening_hours}
            </Text>
          </View>
          <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
            <Feather name="info" size={40} color="#39CC83" />
            <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>
              Atuação {establishment.type.name}
            </Text>
          </View>
        </View>
        <RectButton style={styles.ratingButton} onPress={() => {}}>
          <Feather name="smile" size={20} color="#fff"></Feather>
          <Text style={styles.ratingButtonText}>Avaliar</Text>
        </RectButton>
      </View>
      {testimonials && testimonials.length > 0 && (
        <TestimonialArea>
          <Swiper
            style={{ height: 110 }}
            showsPagination={false}
            showsButtons={true}
            loop
            autoplay
            prevButton={<NavPrevIcon width="35" height="35" fill="#000000" />}
            nextButton={<NavNextIcon width="35" height="35" fill="#000000" />}
          >
            {testimonials.map((item, key) => (
              <TestimonialItem key={key}>
                <TestimonialInfo>
                  <TestimonialName>{item.user.name}</TestimonialName>
                  <Stars stars={item.value} showNumber={false} />
                </TestimonialInfo>
                <TestimonialBody>{item.opinion}</TestimonialBody>
              </TestimonialItem>
            ))}
          </Swiper>
        </TestimonialArea>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imagesContainer: {
    height: 240,
  },

  image: {
    width: Dimensions.get("window").width,
    height: 240,
    resizeMode: "cover",
  },

  detailsContainer: {
    padding: 24,
  },

  title: {
    color: "#4D6F80",
    fontSize: 30,
  },

  description: {
    color: "#5c8599",
    fontWeight: "bold",
    lineHeight: 24,
    marginTop: 16,
  },

  mapContainer: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1.2,
    borderColor: "#4DA397",
    marginTop: 40,
    backgroundColor: "#92E2C5",
  },

  mapStyle: {
    width: "100%",
    height: 150,
  },

  routesContainer: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  routesText: {
    fontWeight: "bold",
    color: "#146447",
  },

  separator: {
    height: 0.8,
    width: "100%",
    backgroundColor: "#D3E2E6",
    marginVertical: 40,
  },

  scheduleContainer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  scheduleItem: {
    width: "48%",
    padding: 20,
  },

  scheduleItemBlue: {
    backgroundColor: "#E6F7FB",
    borderWidth: 1,
    borderColor: "#B3DAE2",
    borderRadius: 20,
  },

  scheduleItemGreen: {
    backgroundColor: "#EDFFF6",
    borderWidth: 1,
    borderColor: "#A1E9C5",
    borderRadius: 20,
  },

  scheduleItemRed: {
    backgroundColor: "#fdf0f5",
    borderWidth: 1,
    borderColor: "#A1E9C5",
    borderRadius: 20,
  },

  scheduleText: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },

  scheduleTextBlue: {
    color: "#5C8599",
  },

  scheduleTextGreen: {
    color: "#37C77F",
  },
  scheduleTextRed: {
    color: "#ff669d",
  },

  ratingButton: {
    backgroundColor: "#EDC887",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    marginTop: 40,
  },

  ratingButtonText: {
    fontWeight: "bold",
    color: "#FFF",
    fontSize: 16,
    marginLeft: 16,
  },
});
