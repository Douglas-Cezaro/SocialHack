import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import api from "../../../services/api";
import Dropdow from "../../../components/dropdown";

export default function OrphanageData() {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [contact, setContact] = useState("");
  const [opening_hours, setOpeningHours] = useState("");
  const [images, setImages] = useState([]);
  const [types, setTypes] = useState([]);
  const [type, setType] = useState();
  const [typeID, setTypeID] = useState();

  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params;
  useEffect(() => {
    api.get(`type`).then((response) => {
      setTypes(response.data);
    });
  }, []);

  const selectedType = (type) => {
    setType(type);
    const typeSelID = types.find((typesel) => {
      if (typesel.id == type) {
        return typesel;
      }
    });
    setTypeID(typeSelID);
  };
  const handleCreateOrphanage = async () => {
    const { latitude, longitude } = params.position;

    const data = new FormData();

    data.append("name", name);
    data.append("about", about);
    data.append("instructions", instructions);
    data.append("opening_hours", opening_hours);
    data.append("contact", contact);
    data.append("type", typeID.id);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    images.forEach((image, index) => {
      data.append("images", {
        name: `image_${index}.jpg`,
        type: "image/jpg",
        uri: image,
      });
    });

    await api.post("/establishment/create", data);

    await alert("Cadastro concluído!");
    navigation.navigate("MainTab", {
      screen: "Mapa",
    });
  };

  const handleSelectImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Eita, precisamos de acesso as suas fotos...");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri: image } = result;

    setImages([...images, image]);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={(text) => setAbout(text)}
      />

      <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadedImageContainer}>
        {images.map((image) => {
          return (
            <Image
              source={{ uri: image }}
              style={styles.uploadedImage}
              key={image}
            />
          );
        })}
      </View>

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#4DA384" />
      </TouchableOpacity>

      <Text style={styles.label}>Area de atuação</Text>
      <Dropdow
        descricao="name"
        lista={types}
        sel={type}
        handleClick={selectedType}
      />
      <Text style={styles.title}>Detalhes</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instructions}
        onChangeText={(text) => setInstructions(text)}
      />

      <Text style={styles.label}>Horario de atendimento</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={(text) => setOpeningHours(text)}
      />
      <Text style={styles.label}>Contato</Text>
      <TextInput
        style={styles.input}
        value={contact}
        onChangeText={(text) => setContact(text)}
      />
      <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: "#5c8599",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: "#D3E2E6",
  },

  label: {
    color: "#8fa7b3",
    fontWeight: "bold",
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: "#8fa7b3",
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1.4,
    borderColor: "#d3e2e6",
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: "top",
  },

  imagesInput: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderStyle: "dashed",
    borderColor: "#4DA384",
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: "#4DA384",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#FFF",
  },

  uploadedImageContainer: {
    flexDirection: "row",
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
  },
});
