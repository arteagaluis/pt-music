import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { Repro } from '../components/Repro';
import { getData } from '../function/storage';

export const DetailsScreen = ({ route }) => {
  const { name, artist, img } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: img }} style={styles.img} />
      <View style={styles.containerText}>
        <Text style={styles.nameArtist}>{artist.name}</Text>
        <Text style={styles.titleSong}>{name}</Text>
      </View>

      <Repro />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 40,
  },
  img: {
    marginTop: 50,
    marginBottom: 30,
    width: 300,
    height: 300,
    margin: 'auto',
  },
  containerText: {
    alignItems: 'center',
  },

  titleSong: {
    fontWeight: '300',
    fontSize: 15,
  },
  nameArtist: {
    fontWeight: '800',
    fontSize: 30,
    marginBottom: 5,
  },
});
