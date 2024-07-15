import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './app/Home';
import { DetailsScreen } from './app/Detailts';
import { Perfil } from './app/Perfil';
import { Button } from 'react-native';
import { Fav } from './app/Fav';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('Favorite')}
                  title="Favorite"
                />
              ),
              headerLeft: () => (
                <Button
                  onPress={() => navigation.navigate('Perfil')}
                  title="Profile"
                />
              ),
            })}
          />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Perfil" component={Perfil} />
          <Stack.Screen name="Favorite" component={Fav} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
