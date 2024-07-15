import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import iconPlay from '../assets/icon-play.png';
import iconPause from '../assets/icon-pause.png';
import { useState } from 'react';

export const Repro = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        {/* <Image source={iconPause} style={styles.imgIconPause} /> */}

        <Image source={iconPlay} style={styles.imgIconPlay} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 50,
    backgroundColor: 'black',
  },

  imgIconPlay: {
    width: 30,
    height: 30,
    color: 'black',
  },
  imgIconPause: {
    width: 30,
    height: 30,
  },
});
