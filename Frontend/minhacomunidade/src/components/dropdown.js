import React, { Component } from "react";
import { View, Picker } from "react-native";

export default ({ lista, descricao, sel, handleClick }) => {
  const _pickerChange = (index) => {
    lista.map((v, i) => {
      if (index === i) {
        handleClick(lista[index].id);
      }
    });
  };
  return (
    <View
      style={{
        borderWidth: 1.4,
        borderColor: "#d3e2e6",
        borderRadius: 20,
        height: 56,
        marginBottom: 16,
        textAlignVertical: "top",
      }}
    >
      <Picker
        selectedValue={sel}
        onValueChange={(itemValor, itemindex) => _pickerChange(itemindex)}
      >
        {lista.map((v) => {
          return (
            <Picker.Item label={String(v[descricao])} value={v.id} key={v.id} />
          );
        })}
      </Picker>
    </View>
  );
};
