import { StatusBar, StyleSheet, View } from 'react-native';
import { InfoCard } from '../components/InfoCard';
import { useEffect, useState } from 'react';
import { getTopTracks } from '../services/getTopTracks';

export function Home({ navigation }) {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const getSongs = async () => {
      const data = await getTopTracks();

      setTracks(data);
    };

    getSongs();
  }, []);

  return (
    <View style={styles.container}>
      <InfoCard nav="Details" tracks={tracks} useFav={true} />

      {/* <Button
          title="Go to Pefil"
          onPress={() => navigation.navigate('Perfil')}
        /> */}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#152031',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
