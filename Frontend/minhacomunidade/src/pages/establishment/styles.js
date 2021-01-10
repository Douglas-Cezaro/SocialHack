import React from "react";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

export const Scroller = styled.ScrollView`
  flex: 1;
`;

export const SwipeDot = styled.View`
  width: 10px;
  height: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  margin: 3px;
  bottom: 0;
`;

export const SwipeDotActive = styled.View`
  width: 10px;
  height: 10px;
  background-color: #000000;
  border-radius: 5px;
  margin: 3px;
  bottom: 0;
`;

export const SwipeItem = styled.View`
  flex: 1;
  background-color: #4da384;
`;

export const SwipeImage = styled.Image`
  width: 100%;
  height: 240px;
`;

export const FakeSwiper = styled.View`
  height: 200px;
  background-color: #4da384;
`;
export const TestimonialArea = styled.View`
  margin-top: 30px;
  margin-bottom: 50px;
`;

export const TestimonialItem = styled.View`
  background-color: #4da397;
  padding: 15px;
  border-radius: 10px;
  height: 110px;
  justify-content: center;
  margin-left: 50px;
  margin-right: 50px;
`;

export const TestimonialInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const TestimonialName = styled.Text`
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
`;

export const TestimonialBody = styled.Text`
  color: #ffffff;
  font-size: 13px;
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
  top: 10px;
  width: 250px;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
`;
