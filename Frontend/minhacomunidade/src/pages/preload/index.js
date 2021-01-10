import React, { useEffect } from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Container, Logo, Superior, Inferior, Label } from "./styles";
import Image from "../../../assets/logo.png";
import LabelImage from "../../../assets/label.png";
import SuperiorImage from "../../../assets/superior.png";
import InferiorImage from "../../../assets/inferior.png";
export default () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        routes: [{ name: "MainTab" }],
      });
    }, 500);
  }, []);

  return (
    <Container>
      <Superior source={SuperiorImage} />
      <Logo source={Image} />
      <Label source={LabelImage} />
      <Inferior source={InferiorImage} />
    </Container>
  );
};
