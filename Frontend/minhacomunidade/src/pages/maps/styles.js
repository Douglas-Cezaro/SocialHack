import React from "react";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  padding: 30px;
  flex: 1;
  background-color: #4da384;
`;

export const Scroller = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const HeaderArea = styled.View`
  top: 20px;
  height: 50px;
  margin-right: 10px;
  margin-left: 10px;
  align-items: center;
  justify-content: center;
`;
export const HeaderTitle = styled.Text`
  width: 250px;
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
`;
export const SearchButton = styled.TouchableOpacity`
  width: 26px;
  height: 26px;
  color: #7e8389;
`;

export const LocationArea = styled.View`
  background-color: #ffffff;
  height: 60px;
  border-radius: 30px;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 30px;
  margin-left: 10px;
  margin-right: 10px;
`;
export const LocationInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #7e8389;
`;
export const LocationFinder = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  color: #7e8389;
`;
export const LoadingIcon = styled.ActivityIndicator`
  margin-top: 50px;
`;
export const ListArea = styled.View`
  margin-top: 30px;
  margin-bottom: 30px;
`;
