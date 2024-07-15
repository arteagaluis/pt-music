import { StyleSheet, Text, View } from 'react-native';
import { getData } from '../function/storage';
import { useEffect, useState } from 'react';
import { InfoCard } from '../components/InfoCard';

export const Fav = () => {
  const [tracks, setTracks] = useState('');

  const loadData = async () => {
    const loadItem = await getData('items');
    console.log(loadItem);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>FAVORITE</Text>
      <InfoCard nav="Details" />
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
