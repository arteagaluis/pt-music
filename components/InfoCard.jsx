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
import iconFavCheck from '../assets/icon-favcheck.png';
import iconFavPlus from '../assets/icon-favPlus.png';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { storeData } from '../function/storage';

export function InfoCard(props) {
  const { nav, tracks, useFav } = props;
  const navigation = useNavigation();
  const [playSong, setPlaySong] = useState(false);
  const [idRank, setIdRank] = useState(null);
  const [favorite, setFavorite] = useState([]);
  const [iconSave, setIconSave] = useState({});
  const [songs, setSongs] = useState(null);

  const [repro, setRepro] = useState([]);

  const addMoreRepro = (item) => {
    setRepro((prevState) => {
      const updateMostPlayed = [item, ...prevState];
      const id = updateMostPlayed.find((da) => da['@attr'].rank);

      if (updateMostPlayed.length > 10) {
        updateMostPlayed.pop();
      }
      return updateMostPlayed;
    });
  };

  const handlePress = (item) => {
    const data = songs.find((da) => {
      return da['@attr'].rank === item;
    });

    addMoreRepro(data);

    const { name, artist, image } = data;
    const img = image[2]['#text'];
    navigation.navigate(nav, { name, artist, img });
    setPlaySong(false);
  };

  const handleSong = (item) => {
    const data = songs.find((da) => {
      return da['@attr'].rank === item;
    });

    addMoreRepro(data);

    setIdRank(data['@attr'].rank);

    if (!playSong) {
      setPlaySong(true);
    } else {
      setPlaySong(false);
    }
  };

  const saveFav = async (item) => {
    const data = songs.find((da) => da['@attr'].rank === item);

    if (data) {
      const isFavorite = favorite.some((fav) => fav['@attr'].rank === item);

      if (isFavorite) {
        // Eliminar el elemento de favoritos
        const updatedFavorites = favorite.filter(
          (fav) => fav['@attr'].rank !== item
        );

        setFavorite(updatedFavorites);
        setIconSave((prevState) => ({
          ...prevState,
          [item]: false,
        }));
      } else {
        // Agregar el elemento a favoritos
        setFavorite([...favorite, data]);
        setIconSave((prevState) => ({
          ...prevState,
          [item]: true,
        }));
      }

      // Actualizar la propiedad isFavorite en tracks
      const updatedTracks = songs.map((track) =>
        track['@attr'].rank === item
          ? { ...track, isFavorite: !isFavorite }
          : track
      );
      setSongs(updatedTracks);
    }
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

  useEffect(() => {
    const saveRepro = async () => {
      try {
        await storeData('repro', repro);
      } catch (error) {
        console.error(error);
      }
    };
    if (useFav) {
      saveRepro();
    }
  }, [repro]);

  useEffect(() => {
    setSongs(tracks);
  }, [tracks]);

  return (
    <>
      <FlatList
        data={songs}
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
                    {iconSave[item['@attr'].rank] ? (
                      <Image source={iconFavCheck} style={styles.imgIconFav} />
                    ) : (
                      <Image source={iconFavPlus} style={styles.imgIconFav} />
                    )}
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
