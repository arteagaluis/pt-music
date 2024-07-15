import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import iconPlay from '../assets/icon-play.png';
import iconPause from '../assets/icon-pause.png';
import iconFav from '../assets/icon-fav.png';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { getData, removeData, storeData } from '../function/storage';

export function InfoCard(props) {
  const navigation = useNavigation();
  const [playSong, setPlaySong] = useState(false);
  const [idRank, setIdRank] = useState(null);
  const [favorite, setFavorite] = useState([]);

  const { nav, tracks, useFav } = props;

  const handlePress = (item) => {
    const data = tracks.find((da) => {
      return da['@attr'].rank === item;
    });

    const { name, artist, image } = data;
    const img = image[2]['#text'];
    navigation.navigate(nav, { name, artist, img });
    setPlaySong(false);
  };

  const handleSong = (item) => {
    const data = tracks.find((da) => {
      return da['@attr'].rank === item;
    });

    setIdRank(data['@attr'].rank);

    if (!playSong) {
      setPlaySong(true);
    } else {
      setPlaySong(false);
    }
  };

  const saveFav = async (item) => {
    const data = tracks.find((da) => {
      return da['@attr'].rank === item;
    });

    setFavorite([...favorite, data]);
  };

  useEffect(() => {
    const saveData = async () => {
      try {
        await storeData('items', favorite);
      } catch (error) {
        console.error(error);
      }
    };
    if (useFav) {
      saveData();
    }
  }, [favorite]);

  return (
    <>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item['@attr'].rank}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              style={styles.container}
              onPress={() => handlePress(item['@attr'].rank)}
            >
              <Image
                source={{ uri: item.image[2]['#text'] }}
                style={styles.img}
              />
              <View style={styles.infoSong}>
                <Text style={styles.top}>{`TOP ${
                  Number(item['@attr'].rank) + 1
                }`}</Text>
                <Text style={styles.titleSong}>{item.name}</Text>
                <Text style={styles.nameArtist}>{item.artist.name}</Text>
              </View>
              <View style={styles.containerIcon}>
                {useFav && (
                  <TouchableOpacity onPress={() => saveFav(item['@attr'].rank)}>
                    <Image source={iconFav} style={styles.imgIconFav} />
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={useFav ? '' : styles.play}
                  onPress={() => handleSong(item['@attr'].rank)}
                >
                  {playSong && idRank === item['@attr'].rank ? (
                    <Image source={iconPause} style={styles.imgIconPause} />
                  ) : (
                    <Image source={iconPlay} style={styles.imgIconPlay} />
                  )}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    width: 350,
    height: 'auto',
    borderWidth: 0,
    flexDirection: 'row',
    backgroundColor: '#152031',
    borderRadius: 10,
    padding: 5,
    marginTop: 20,
    marginBottom: 10,
  },

  img: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },

  infoSong: {
    flex: 5,
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'flex-end',
    gap: 10,
  },
  top: {
    color: '#fff',
    fontWeight: '300',
  },
  titleSong: {
    color: '#fff',
    fontWeight: '300',
    fontSize: 12,
  },
  nameArtist: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 12,
  },

  containerIcon: {
    gap: 45,
  },

  play: { marginTop: 50 },

  imgIconPlay: {
    width: 30,
    height: 30,
  },
  imgIconPause: {
    width: 30,
    height: 30,
  },
  imgIconFav: {
    width: 24,
    height: 24,
  },
});
