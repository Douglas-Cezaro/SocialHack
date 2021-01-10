import React from "react";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const Logo = styled.Image`
  width: 200px;
  height: 200px;
`;

export const Label = styled.Image`
  margin-top: 10px;
  width: 100%;
  height: 145px;
`;
export const Superior = styled.Image`
  position: absolute;
  width: 100%;
  height: 210px;
  top: 0px;
`;

export const Inferior = styled.Image`
  position: absolute;
  width: 100%;
  height: 190px;
  bottom: 0;
`;
