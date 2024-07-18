import { StyleSheet, Text, View } from 'react-native';
import { getData } from '../function/storage';
import { useEffect, useState } from 'react';
import { InfoCard } from '../components/InfoCard';

export const Perfil = () => {
  const [tracks, setTracks] = useState([]);

  const loadData = async () => {
    const loadedItems = await getData('repro');
    if (loadedItems) {
      setTracks(loadedItems);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <InfoCard nav="Details" tracks={tracks} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#152031',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
