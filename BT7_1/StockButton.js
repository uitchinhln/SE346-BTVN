import React, {Component, useState} from 'react';

import {Alert, StyleSheet, Text, TouchableOpacity} from 'react-native';

const StockButton = (props) => {
  const onPress = () => {
    props.onPress(props.name, props.code);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text>{props.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    height: 50,
    width: 100,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
});

export default StockButton;
